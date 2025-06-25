import { useState } from "react";
import { ApiKeyModal } from "@/components/api-key-modal";
import { QuizInterface } from "@/components/quiz-interface";

export default function Quiz() {
  const [quizSessionId, setQuizSessionId] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      {!quizSessionId ? (
        <ApiKeyModal onSessionCreated={setQuizSessionId} />
      ) : (
        <QuizInterface sessionId={quizSessionId} />
      )}
    </div>
  );
}
