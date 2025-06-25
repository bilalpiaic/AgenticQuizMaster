import { pgTable, text, serial, integer, boolean, timestamp, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const quizSessions = pgTable("quiz_sessions", {
  id: serial("id").primaryKey(),
  apiKey: text("api_key").notNull(),
  currentQuestion: integer("current_question").notNull().default(1),
  totalQuestions: integer("total_questions").notNull().default(50),
  correctAnswers: integer("correct_answers").notNull().default(0),
  timeRemaining: integer("time_remaining").notNull().default(7200), // 120 minutes in seconds
  startedAt: timestamp("started_at").notNull().defaultNow(),
  completedAt: timestamp("completed_at"),
  isCompleted: boolean("is_completed").notNull().default(false),
});

export const questions = pgTable("questions", {
  id: serial("id").primaryKey(),
  sessionId: integer("session_id").notNull(),
  questionNumber: integer("question_number").notNull(),
  category: text("category").notNull(), // 'OpenAI SDK', 'Prompt Engineering', 'Markdown', 'Pydantic'
  difficulty: integer("difficulty").notNull(), // 1-10 scale
  type: text("type").notNull(), // 'conceptual', 'code-based'
  title: text("title").notNull(),
  content: text("content").notNull(),
  codeExample: text("code_example"),
  options: jsonb("options").notNull(), // Array of answer options
  correctAnswerIndex: integer("correct_answer_index").notNull(),
  explanation: text("explanation").notNull(),
  timeAllotted: integer("time_allotted").notNull(), // seconds
  userAnswerIndex: integer("user_answer_index"),
  isCorrect: boolean("is_correct"),
  timeSpent: integer("time_spent"), // seconds
  answeredAt: timestamp("answered_at"),
});

export const insertQuizSessionSchema = createInsertSchema(quizSessions).pick({
  apiKey: true,
});

export const insertQuestionSchema = createInsertSchema(questions).pick({
  sessionId: true,
  questionNumber: true,
  category: true,
  difficulty: true,
  type: true,
  title: true,
  content: true,
  codeExample: true,
  options: true,
  correctAnswerIndex: true,
  explanation: true,
  timeAllotted: true,
});

export const answerQuestionSchema = z.object({
  questionId: z.number(),
  answerIndex: z.number(),
  timeSpent: z.number(),
});

export type InsertQuizSession = z.infer<typeof insertQuizSessionSchema>;
export type QuizSession = typeof quizSessions.$inferSelect;
export type InsertQuestion = z.infer<typeof insertQuestionSchema>;
export type Question = typeof questions.$inferSelect;
export type AnswerQuestion = z.infer<typeof answerQuestionSchema>;
