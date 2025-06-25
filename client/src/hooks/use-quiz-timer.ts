import { useState, useEffect, useCallback } from "react";

interface UseQuizTimerProps {
  totalTimeLimit: number; // Total quiz time in seconds
  questionTimeLimit: number; // Current question time limit in seconds
  onTotalTimeUp: () => void;
  onQuestionTimeUp: () => void;
}

export function useQuizTimer({
  totalTimeLimit,
  questionTimeLimit,
  onTotalTimeUp,
  onQuestionTimeUp,
}: UseQuizTimerProps) {
  const [totalTimeLeft, setTotalTimeLeft] = useState(totalTimeLimit);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(questionTimeLimit);
  const [isRunning, setIsRunning] = useState(false);

  // Total timer effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTotalTimeLeft((prev) => {
        if (prev <= 1) {
          onTotalTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onTotalTimeUp]);

  // Question timer effect
  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          onQuestionTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, onQuestionTimeUp]);

  const startQuestionTimer = useCallback((timeLimit: number) => {
    setQuestionTimeLeft(timeLimit);
    setIsRunning(true);
  }, []);

  const stopQuestionTimer = useCallback(() => {
    setIsRunning(false);
  }, []);

  const resetQuestionTimer = useCallback((timeLimit: number) => {
    setQuestionTimeLeft(timeLimit);
  }, []);

  // Start total timer when component mounts
  useEffect(() => {
    setIsRunning(true);
    return () => setIsRunning(false);
  }, []);

  return {
    totalTimeLeft,
    questionTimeLeft,
    startQuestionTimer,
    stopQuestionTimer,
    resetQuestionTimer,
  };
}
