import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Question } from "@shared/schema";

interface QuestionCardProps {
  question: Question;
  selectedAnswer: number | null;
  onAnswerSelect: (index: number) => void;
  onSubmit: () => void;
  onSkip: () => void;
  onClear: () => void;
  isSubmitting: boolean;
}

export function QuestionCard({
  question,
  selectedAnswer,
  onAnswerSelect,
  onSubmit,
  onSkip,
  onClear,
  isSubmitting,
}: QuestionCardProps) {
  const options = question.options as string[];

  return (
    <div className="space-y-6">
      {/* Question Card */}
      <Card className="overflow-hidden">
        {/* Question Header */}
        <div className="bg-gradient-to-r from-primary to-blue-600 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-white bg-opacity-20 text-white">
                {question.category}
              </Badge>
              <span className="text-white text-sm opacity-90">
                Difficulty: {question.difficulty}/10
              </span>
            </div>
            <div className="text-white text-sm">
              <span className="capitalize">{question.type}</span>
            </div>
          </div>
        </div>
        
        {/* Question Body */}
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {question.title}
          </h2>
          
          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed mb-4">
              {question.content}
            </p>
            
            {question.codeExample && (
              <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-primary mb-4">
                <p className="text-sm text-gray-600 mb-2">Consider the following code:</p>
                <pre className="bg-gray-800 text-green-400 p-4 rounded text-sm overflow-x-auto">
                  <code>{question.codeExample}</code>
                </pre>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Answer Options */}
      <div className="space-y-3">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const optionLabel = String.fromCharCode(65 + index); // A, B, C, D
          
          return (
            <Card
              key={index}
              className={`cursor-pointer transition-all hover:border-primary ${
                isSelected ? 'ring-2 ring-primary bg-blue-50 border-primary' : 'border-gray-200'
              }`}
              onClick={() => onAnswerSelect(index)}
            >
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 mt-0.5 transition-colors ${
                    isSelected 
                      ? 'bg-primary border-primary text-white' 
                      : 'border-gray-300 text-gray-600 group-hover:border-primary'
                  }`}>
                    <span className="font-medium text-sm">{optionLabel}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900">{option}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <Button 
          variant="ghost" 
          onClick={onSkip}
          className="text-gray-600 hover:text-gray-800"
        >
          Skip Question
        </Button>
        
        <div className="flex space-x-3">
          <Button 
            variant="outline"
            onClick={onClear}
          >
            Clear
          </Button>
          <Button 
            onClick={onSubmit}
            disabled={selectedAnswer === null || isSubmitting}
            className="bg-primary text-white hover:bg-blue-700"
          >
            {isSubmitting ? "Submitting..." : "Submit Answer"}
          </Button>
        </div>
      </div>
    </div>
  );
}
