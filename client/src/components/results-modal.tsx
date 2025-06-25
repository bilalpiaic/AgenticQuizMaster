import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle } from "lucide-react";

interface ResultsModalProps {
  isOpen: boolean;
  sessionId: number;
  onRetake: () => void;
}

interface QuizResults {
  session: any;
  categoryBreakdown: Record<string, { correct: number; total: number }>;
  performanceStats: {
    totalTimeSpent: number;
    averageTimePerQuestion: number;
    questionsSkipped: number;
    averageDifficulty: number;
  };
}

export function ResultsModal({ isOpen, sessionId, onRetake }: ResultsModalProps) {
  const { data: results, isLoading } = useQuery<QuizResults>({
    queryKey: ['/api/quiz/session', sessionId, 'results'],
    enabled: isOpen,
  });

  if (isLoading || !results) {
    return (
      <Dialog open={isOpen} onOpenChange={() => {}}>
        <DialogContent className="max-w-2xl">
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-gray-700">Calculating your results...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const { session, categoryBreakdown, performanceStats } = results;
  const finalScore = Math.round((session.correctAnswers / session.totalQuestions) * 100);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Quiz Completed!</h2>
          <p className="text-gray-600">Here's how you performed on the Agentic AI assessment</p>
        </div>

        {/* Final Score */}
        <div className="bg-gradient-to-r from-primary to-blue-600 rounded-xl p-6 text-white text-center mb-6">
          <div className="text-4xl font-bold mb-2">
            {session.correctAnswers}/{session.totalQuestions}
          </div>
          <div className="text-lg opacity-90">Final Score: {finalScore}%</div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Category Breakdown</h4>
            <div className="space-y-2 text-sm">
              {Object.entries(categoryBreakdown).map(([category, stats]) => (
                <div key={category} className="flex justify-between">
                  <span>{category}</span>
                  <span className="font-medium text-primary">
                    {stats.correct}/{stats.total}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-900 mb-3">Performance Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Total Time</span>
                <span className="font-medium">{formatTime(performanceStats.totalTimeSpent)}</span>
              </div>
              <div className="flex justify-between">
                <span>Average per Question</span>
                <span className="font-medium">{formatTime(performanceStats.averageTimePerQuestion)}</span>
              </div>
              <div className="flex justify-between">
                <span>Questions Skipped</span>
                <span className="font-medium">{performanceStats.questionsSkipped}</span>
              </div>
              <div className="flex justify-between">
                <span>Difficulty Rating</span>
                <span className="font-medium text-primary">{performanceStats.averageDifficulty}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => window.location.reload()}
          >
            Review Answers
          </Button>
          <Button
            onClick={onRetake}
            className="flex-1 bg-primary text-white hover:bg-blue-700"
          >
            Retake Quiz
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
