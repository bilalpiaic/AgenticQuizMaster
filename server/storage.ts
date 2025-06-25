import { quizSessions, questions, type QuizSession, type InsertQuizSession, type Question, type InsertQuestion } from "@shared/schema";

export interface IStorage {
  // Quiz Session methods
  createQuizSession(session: InsertQuizSession): Promise<QuizSession>;
  getQuizSession(id: number): Promise<QuizSession | undefined>;
  updateQuizSession(id: number, updates: Partial<QuizSession>): Promise<QuizSession | undefined>;
  
  // Question methods
  createQuestion(question: InsertQuestion): Promise<Question>;
  getQuestion(id: number): Promise<Question | undefined>;
  getQuestionsBySession(sessionId: number): Promise<Question[]>;
  updateQuestion(id: number, updates: Partial<Question>): Promise<Question | undefined>;
  
  // User methods (keeping existing)
  getUser(id: number): Promise<any | undefined>;
  getUserByUsername(username: string): Promise<any | undefined>;
  createUser(user: any): Promise<any>;
}

export class MemStorage implements IStorage {
  private quizSessions: Map<number, QuizSession>;
  private questions: Map<number, Question>;
  private users: Map<number, any>;
  private currentSessionId: number;
  private currentQuestionId: number;
  private currentUserId: number;

  constructor() {
    this.quizSessions = new Map();
    this.questions = new Map();
    this.users = new Map();
    this.currentSessionId = 1;
    this.currentQuestionId = 1;
    this.currentUserId = 1;
  }

  async createQuizSession(insertSession: InsertQuizSession): Promise<QuizSession> {
    const id = this.currentSessionId++;
    const session: QuizSession = {
      ...insertSession,
      id,
      currentQuestion: 1,
      totalQuestions: 50,
      correctAnswers: 0,
      timeRemaining: 7200,
      startedAt: new Date(),
      completedAt: null,
      isCompleted: false,
    };
    this.quizSessions.set(id, session);
    return session;
  }

  async getQuizSession(id: number): Promise<QuizSession | undefined> {
    return this.quizSessions.get(id);
  }

  async updateQuizSession(id: number, updates: Partial<QuizSession>): Promise<QuizSession | undefined> {
    const session = this.quizSessions.get(id);
    if (!session) return undefined;
    
    const updatedSession = { ...session, ...updates };
    this.quizSessions.set(id, updatedSession);
    return updatedSession;
  }

  async createQuestion(insertQuestion: InsertQuestion): Promise<Question> {
    const id = this.currentQuestionId++;
    const question: Question = {
      ...insertQuestion,
      id,
      codeExample: insertQuestion.codeExample || null,
      userAnswerIndex: null,
      isCorrect: null,
      timeSpent: null,
      answeredAt: null,
    };
    this.questions.set(id, question);
    return question;
  }

  async getQuestion(id: number): Promise<Question | undefined> {
    return this.questions.get(id);
  }

  async getQuestionsBySession(sessionId: number): Promise<Question[]> {
    return Array.from(this.questions.values()).filter(
      (question) => question.sessionId === sessionId
    );
  }

  async updateQuestion(id: number, updates: Partial<Question>): Promise<Question | undefined> {
    const question = this.questions.get(id);
    if (!question) return undefined;
    
    const updatedQuestion = { ...question, ...updates };
    this.questions.set(id, updatedQuestion);
    return updatedQuestion;
  }

  // Keep existing user methods
  async getUser(id: number): Promise<any | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<any | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: any): Promise<any> {
    const id = this.currentUserId++;
    const user: any = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
