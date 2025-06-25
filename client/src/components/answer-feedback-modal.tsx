import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";

interface AnswerFeedbackModalProps {
  isOpen: boolean;
  data: {
    isCorrect: boolean;
    correctAnswerIndex: number;
    explanation: string;
  };
  onContinue: () => void;
  questionsLeft: number;
  currentScore: number;
}

export function AnswerFeedbackModal({
  isOpen,
  data,
  onContinue,
  questionsLeft,
  currentScore,
}: AnswerFeedbackModalProps) {
  const { isCorrect, correctAnswerIndex, explanation } = data;
  const correctOptionLabel = String.fromCharCode(65 + correctAnswerIndex);

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="max-w-2xl">
        {/* Result Header */}
        <div className="text-center mb-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
            isCorrect ? 'bg-correct' : 'bg-incorrect'
          }`}>
            {isCorrect ? (
              <CheckCircle className="w-8 h-8 text-white" />
            ) : (
              <XCircle className="w-8 h-8 text-white" />
            )}
          </div>
          <h3 className={`text-2xl font-bold mb-2 ${
            isCorrect ? 'text-correct' : 'text-incorrect'
          }`}>
            {isCorrect ? 'Correct!' : 'Incorrect'}
          </h3>
          <p className="text-gray-600">
            {isCorrect ? 'Great job! You got it right.' : "Don't worry, let's review the correct answer."}
          </p>
        </div>

        {/* Explanation */}
        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-3">
            Correct Answer: {correctOptionLabel}
          </h4>
          
          <div className="border-l-4 border-primary pl-4">
            <h5 className="font-medium text-gray-900 mb-2">Explanation:</h5>
            <p className="text-gray-700 text-sm leading-relaxed">
              {explanation}
            </p>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{questionsLeft}</div>
            <div className="text-sm text-gray-600">Questions Left</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">{currentScore}%</div>
            <div className="text-sm text-gray-600">Current Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">Level 7+</div>
            <div className="text-sm text-gray-600">Difficulty</div>
          </div>
        </div>

        <Button 
          onClick={onContinue}
          className="w-full bg-primary text-white hover:bg-blue-700"
        >
          Continue to Next Question
        </Button>
      </DialogContent>
    </Dialog>
  );
}
