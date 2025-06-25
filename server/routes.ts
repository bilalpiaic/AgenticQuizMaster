import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { GeminiService } from "./services/gemini";
import { getFallbackQuestion } from "./services/fallback-questions";
import { insertQuizSessionSchema, answerQuestionSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Create new quiz session
  app.post("/api/quiz/session", async (req, res) => {
    try {
      const data = insertQuizSessionSchema.parse(req.body);
      const session = await storage.createQuizSession(data);
      res.json(session);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  // Get quiz session
  app.get("/api/quiz/session/:id", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const session = await storage.getQuizSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ error: "Quiz session not found" });
      }
      
      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch quiz session" });
    }
  });

  // Generate next question
  app.post("/api/quiz/session/:id/question", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const session = await storage.getQuizSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ error: "Quiz session not found" });
      }

      if (session.isCompleted) {
        return res.status(400).json({ error: "Quiz session is already completed" });
      }

      // Determine question category based on question number
      const questionNumber = session.currentQuestion;
      const { category, difficulty, type } = getQuestionMetadata(questionNumber);
      
      console.log(`Generating question ${questionNumber}: ${category} (${type}, difficulty ${difficulty})`);
      
      // Generate question using Gemini with timeout
      const geminiService = new GeminiService(session.apiKey);
      
      // Add timeout protection
      const questionPromise = geminiService.generateQuestion({
        category,
        questionNumber,
        difficulty,
        type
      });
      
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Question generation timeout')), 30000);
      });
      
      const generatedQuestion = await Promise.race([questionPromise, timeoutPromise]) as any;

      // Store question in database
      const question = await storage.createQuestion({
        sessionId,
        questionNumber,
        category,
        difficulty,
        type,
        title: generatedQuestion.title,
        content: generatedQuestion.content,
        codeExample: generatedQuestion.codeExample || null,
        options: generatedQuestion.options,
        correctAnswerIndex: generatedQuestion.correctAnswerIndex,
        explanation: generatedQuestion.explanation,
        timeAllotted: generatedQuestion.timeAllotted,
      });

      console.log(`Question ${questionNumber} created successfully`);
      res.json(question);
    } catch (error: any) {
      console.error("Question generation failed, using fallback:", error);
      
      try {
        // Always use fallback when API fails
        const fallbackQuestion = getFallbackQuestion(questionNumber, category, difficulty, type);
        
        // Store fallback question in database
        const question = await storage.createQuestion({
          sessionId,
          questionNumber,
          category: fallbackQuestion.category,
          difficulty: fallbackQuestion.difficulty,
          type: fallbackQuestion.type,
          title: fallbackQuestion.title,
          content: fallbackQuestion.content,
          codeExample: fallbackQuestion.codeExample,
          options: fallbackQuestion.options,
          correctAnswerIndex: fallbackQuestion.correctAnswerIndex,
          explanation: fallbackQuestion.explanation,
          timeAllotted: fallbackQuestion.timeAllotted,
        });

        // Update session progress
        await storage.updateQuizSession(sessionId, {
          currentQuestion: questionNumber
        });

        console.log(`Fallback question ${questionNumber} created successfully`);
        return res.json(question);
      } catch (fallbackError: any) {
        console.error("Fallback question creation failed:", fallbackError);
        return res.status(500).json({ 
          error: "Unable to generate question", 
          details: fallbackError.message 
        });
      }
    }
  });

  // Submit answer for a question
  app.post("/api/quiz/answer", async (req, res) => {
    try {
      const data = answerQuestionSchema.parse(req.body);
      const question = await storage.getQuestion(data.questionId);
      
      if (!question) {
        return res.status(404).json({ error: "Question not found" });
      }

      const isCorrect = data.answerIndex === question.correctAnswerIndex;
      
      // Update question with user's answer
      const updatedQuestion = await storage.updateQuestion(data.questionId, {
        userAnswerIndex: data.answerIndex,
        isCorrect,
        timeSpent: data.timeSpent,
        answeredAt: new Date(),
      });

      // Update session progress
      const session = await storage.getQuizSession(question.sessionId);
      if (session) {
        const correctAnswers = isCorrect ? session.correctAnswers + 1 : session.correctAnswers;
        const currentQuestion = session.currentQuestion + 1;
        const isCompleted = currentQuestion > session.totalQuestions;
        
        await storage.updateQuizSession(session.id, {
          correctAnswers,
          currentQuestion: isCompleted ? session.totalQuestions : currentQuestion,
          isCompleted,
          completedAt: isCompleted ? new Date() : null,
        });
      }

      res.json({
        isCorrect,
        correctAnswerIndex: question.correctAnswerIndex,
        explanation: question.explanation,
        question: updatedQuestion
      });
    } catch (error) {
      console.error("Answer submission error:", error);
      res.status(500).json({ error: "Failed to submit answer" });
    }
  });

  // Get quiz results
  app.get("/api/quiz/session/:id/results", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const session = await storage.getQuizSession(sessionId);
      
      if (!session) {
        return res.status(404).json({ error: "Quiz session not found" });
      }

      const questions = await storage.getQuestionsBySession(sessionId);
      
      // Calculate category breakdowns
      const categoryBreakdown = questions.reduce((acc, q) => {
        if (!acc[q.category]) {
          acc[q.category] = { correct: 0, total: 0 };
        }
        acc[q.category].total++;
        if (q.isCorrect) {
          acc[q.category].correct++;
        }
        return acc;
      }, {} as Record<string, { correct: number; total: number }>);

      // Calculate performance stats
      const totalTimeSpent = questions.reduce((sum, q) => sum + (q.timeSpent || 0), 0);
      const averageTimePerQuestion = questions.length > 0 ? totalTimeSpent / questions.length : 0;
      const questionsSkipped = questions.filter(q => q.userAnswerIndex === null).length;
      const averageDifficulty = questions.length > 0 ? 
        questions.reduce((sum, q) => sum + q.difficulty, 0) / questions.length : 0;

      res.json({
        session,
        categoryBreakdown,
        performanceStats: {
          totalTimeSpent,
          averageTimePerQuestion: Math.round(averageTimePerQuestion),
          questionsSkipped,
          averageDifficulty: Math.round(averageDifficulty * 10) / 10
        },
        questions
      });
    } catch (error) {
      console.error("Results fetch error:", error);
      res.status(500).json({ error: "Failed to fetch results" });
    }
  });

  // Update quiz session time
  app.patch("/api/quiz/session/:id/time", async (req, res) => {
    try {
      const sessionId = parseInt(req.params.id);
      const { timeRemaining } = req.body;
      
      const session = await storage.updateQuizSession(sessionId, { timeRemaining });
      
      if (!session) {
        return res.status(404).json({ error: "Quiz session not found" });
      }

      res.json(session);
    } catch (error) {
      res.status(500).json({ error: "Failed to update time" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function getQuestionMetadata(questionNumber: number): {
  category: string;
  difficulty: number;
  type: 'conceptual' | 'code-based';
} {
  // Distribution: 5 Prompt Engineering, 2 Markdown, 3 Pydantic, 40 OpenAI SDK
  if (questionNumber <= 5) {
    return {
      category: 'Prompt Engineering',
      difficulty: Math.floor(Math.random() * 3) + 7, // 7-9 difficulty
      type: questionNumber % 2 === 0 ? 'code-based' : 'conceptual'
    };
  } else if (questionNumber <= 7) {
    return {
      category: 'Markdown',
      difficulty: Math.floor(Math.random() * 2) + 6, // 6-7 difficulty
      type: 'conceptual' as const
    };
  } else if (questionNumber <= 10) {
    return {
      category: 'Pydantic',
      difficulty: Math.floor(Math.random() * 3) + 7, // 7-9 difficulty
      type: questionNumber % 2 === 0 ? 'code-based' : 'conceptual'
    };
  } else {
    return {
      category: 'OpenAI Agents SDK',
      difficulty: Math.floor(Math.random() * 4) + 7, // 7-10 difficulty
      type: questionNumber % 3 === 0 ? 'code-based' : 'conceptual'
    };
  }
}
