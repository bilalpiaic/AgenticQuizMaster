import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QuestionCard } from "./question-card";
import { AnswerFeedbackModal } from "./answer-feedback-modal";
import { ResultsModal } from "./results-modal";
import { LoadingOverlay } from "./loading-overlay";
import { useQuizTimer } from "@/hooks/use-quiz-timer";
import { Progress } from "@/components/ui/progress";
import { Clock, Timer } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Question, QuizSession } from "@shared/schema";

interface QuizInterfaceProps {
  sessionId: number;
}

export function QuizInterface({ sessionId }: QuizInterfaceProps) {
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [showResults, setShowResults] = useState(false);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Fetch quiz session
  const { data: session, isLoading: sessionLoading } = useQuery<QuizSession>({
    queryKey: ['/api/quiz/session', sessionId],
    refetchInterval: 30000, // Refetch every 30 seconds to sync timer
  });

  // Quiz timer hook
  const { totalTimeLeft, questionTimeLeft, startQuestionTimer, stopQuestionTimer } = useQuizTimer({
    totalTimeLimit: session?.timeRemaining || 7200,
    questionTimeLimit: currentQuestion?.timeAllotted || 120,
    onTotalTimeUp: () => handleQuizComplete(),
    onQuestionTimeUp: () => handleQuestionTimeout(),
  });

  // Generate question mutation
  const generateQuestionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", `/api/quiz/session/${sessionId}/question`);
      return response.json();
    },
    onSuccess: (question: Question) => {
      setCurrentQuestion(question);
      setSelectedAnswer(null);
      setQuestionStartTime(Date.now());
      startQuestionTimer(question.timeAllotted);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to generate question. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Submit answer mutation
  const submitAnswerMutation = useMutation({
    mutationFn: async (data: { questionId: number; answerIndex: number; timeSpent: number }) => {
      const response = await apiRequest("POST", "/api/quiz/answer", data);
      return response.json();
    },
    onSuccess: (data) => {
      setFeedbackData(data);
      setShowFeedback(true);
      stopQuestionTimer();
      queryClient.invalidateQueries({ queryKey: ['/api/quiz/session', sessionId] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to submit answer. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Update timer mutation
  const updateTimerMutation = useMutation({
    mutationFn: async (timeRemaining: number) => {
      const response = await apiRequest("PATCH", `/api/quiz/session/${sessionId}/time`, { timeRemaining });
      return response.json();
    },
  });

  // Initialize first question
  useEffect(() => {
    if (session && !sessionLoading && !currentQuestion && !generateQuestionMutation.isPending && !session.isCompleted) {
      console.log('Generating first question for session:', session.id);
      generateQuestionMutation.mutate();
    }
  }, [session, sessionLoading, currentQuestion, generateQuestionMutation.isPending]);

  // Update server timer periodically
  useEffect(() => {
    const interval = setInterval(() => {
      if (totalTimeLeft > 0) {
        updateTimerMutation.mutate(totalTimeLeft);
      }
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, [totalTimeLeft]);

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !currentQuestion) return;

    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    submitAnswerMutation.mutate({
      questionId: currentQuestion.id,
      answerIndex: selectedAnswer,
      timeSpent,
    });
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setFeedbackData(null);
    
    if (session && session.currentQuestion >= session.totalQuestions) {
      handleQuizComplete();
    } else {
      generateQuestionMutation.mutate();
    }
  };

  const handleQuestionTimeout = () => {
    if (currentQuestion) {
      const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
      submitAnswerMutation.mutate({
        questionId: currentQuestion.id,
        answerIndex: -1, // Indicate timeout
        timeSpent,
      });
    }
  };

  const handleQuizComplete = () => {
    setShowResults(true);
  };

  const handleSkipQuestion = () => {
    handleQuestionTimeout();
  };

  const handleClearSelection = () => {
    setSelectedAnswer(null);
  };

  if (!session || sessionLoading) {
    return <LoadingOverlay message="Loading quiz session..." />;
  }

  const progressPercent = (session.currentQuestion / session.totalQuestions) * 100;

  return (
    <>
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold text-gray-900">Agentic AI Assessment</h1>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <span>Question</span>
                <span className="font-medium text-primary">{session.currentQuestion}</span>
                <span>of</span>
                <span className="font-medium">{session.totalQuestions}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-6">
              {/* Question Timer */}
              <div className="flex items-center space-x-2">
                <Timer className="w-5 h-5 text-warning" />
                <span className="font-mono text-lg font-medium text-warning">
                  {Math.floor(questionTimeLeft / 60)}:{(questionTimeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              
              {/* Total Timer */}
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="font-mono text-lg font-medium text-gray-900">
                  {Math.floor(totalTimeLeft / 60)}:{(totalTimeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>
              
              {/* Score */}
              <div className="bg-gray-100 px-3 py-1 rounded-full">
                <span className="text-sm font-medium text-gray-700">Score: </span>
                <span className="font-bold text-primary">{session.correctAnswers}/{session.currentQuestion - 1}</span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <Progress value={progressPercent} className="h-2" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentQuestion ? (
          <QuestionCard
            question={currentQuestion}
            selectedAnswer={selectedAnswer}
            onAnswerSelect={handleAnswerSelect}
            onSubmit={handleSubmitAnswer}
            onSkip={handleSkipQuestion}
            onClear={handleClearSelection}
            isSubmitting={submitAnswerMutation.isPending}
          />
        ) : (
          <LoadingOverlay message="Generating your next question..." />
        )}
      </main>

      {/* Modals */}
      {showFeedback && feedbackData && (
        <AnswerFeedbackModal
          isOpen={showFeedback}
          data={feedbackData}
          onContinue={handleNextQuestion}
          questionsLeft={session.totalQuestions - session.currentQuestion}
          currentScore={Math.round((session.correctAnswers / Math.max(session.currentQuestion - 1, 1)) * 100)}
        />
      )}

      {showResults && (
        <ResultsModal
          isOpen={showResults}
          sessionId={sessionId}
          onRetake={() => window.location.reload()}
        />
      )}

      {generateQuestionMutation.isPending && (
        <LoadingOverlay message="Generating next question..." />
      )}
    </>
  );
}
