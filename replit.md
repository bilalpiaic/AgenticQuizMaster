# Quiz Application - Replit Coding Guide

## Overview

This is a full-stack quiz application built with React and Express that generates AI-powered questions using Google's Gemini API. The app allows users to take timed quizzes with questions across multiple technical categories (OpenAI SDK, Prompt Engineering, Markdown, Pydantic) and provides detailed feedback and results.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Runtime**: Node.js 20
- **Database ORM**: Drizzle ORM
- **Database**: PostgreSQL (configured for Neon database)
- **AI Integration**: Google Gemini 2.0 Flash for question generation
- **Session Management**: In-memory storage with planned database persistence

### Project Structure
- **`/client`**: React frontend application
- **`/server`**: Express.js backend API
- **`/shared`**: Shared TypeScript types and schemas
- **`/components.json`**: shadcn/ui configuration

## Key Components

### Database Schema
The application uses two main database tables:
- **`quiz_sessions`**: Stores quiz session metadata (progress, score, timing)
- **`questions`**: Stores individual questions with answers and user responses

### API Endpoints
- `POST /api/quiz/session` - Create new quiz session
- `GET /api/quiz/session/:id` - Get quiz session details
- `POST /api/quiz/session/:id/question` - Generate next question

### Frontend Components
- **ApiKeyModal**: Handles Gemini API key input and session creation
- **QuizInterface**: Main quiz experience with timer and question display
- **QuestionCard**: Individual question presentation with answer options
- **AnswerFeedbackModal**: Shows immediate feedback after answering
- **ResultsModal**: Final quiz results and performance breakdown

### AI Question Generation
Uses Google Gemini API to generate contextual questions with:
- Category-based content (rotates through 4 technical domains)
- Difficulty scaling (1-10 based on question number)
- Both conceptual and code-based question types
- Structured JSON responses with explanations

## Data Flow

1. **Session Creation**: User inputs Gemini API key → Backend validates and creates quiz session
2. **Question Generation**: Frontend requests question → Backend calls Gemini API → Returns structured question data
3. **Answer Submission**: User selects answer → Backend evaluates and stores response → Returns feedback
4. **Progress Tracking**: Real-time updates to session progress and scoring
5. **Results Calculation**: Final performance analysis with category breakdowns

## External Dependencies

### Core Dependencies
- **@google/genai**: Google Gemini AI integration
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **@tanstack/react-query**: Server state management
- **@radix-ui/***: Accessible UI primitives

### Development Tools
- **Vite**: Fast development server and build tool
- **TypeScript**: Static type checking
- **Tailwind CSS**: Utility-first CSS framework
- **Drizzle Kit**: Database migrations and schema management

## Deployment Strategy

### Replit Configuration
- **Runtime**: Node.js 20 with PostgreSQL 16 module
- **Development**: `npm run dev` (port 5000)
- **Production**: `npm run build && npm run start`
- **Database**: Environment variable `DATABASE_URL` required

### Build Process
1. Frontend builds to `dist/public` using Vite
2. Backend bundles to `dist/index.js` using esbuild
3. Static files served from build output directory

### Environment Requirements
- `DATABASE_URL`: PostgreSQL connection string
- Gemini API key provided by users at runtime

## Recent Changes
- June 25, 2025: Fixed Gemini API quota exhaustion by implementing robust fallback system
- June 25, 2025: Resolved TypeScript compilation errors in question generation
- June 25, 2025: Quiz now auto-generates questions using fallback when API is unavailable
- June 25, 2025: Created 50+ high-quality fallback questions covering all required topics
- June 25, 2025: Fixed React Query session loading issue - quiz properly auto-generates first question
- June 25, 2025: Initial setup with professional UI and timer systems

## User Preferences

Preferred communication style: Simple, everyday language.