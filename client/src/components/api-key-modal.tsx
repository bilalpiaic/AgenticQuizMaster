import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Info } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ApiKeyModalProps {
  onSessionCreated: (sessionId: number) => void;
}

export function ApiKeyModal({ onSessionCreated }: ApiKeyModalProps) {
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const createSessionMutation = useMutation({
    mutationFn: async (apiKey: string) => {
      const response = await apiRequest("POST", "/api/quiz/session", { apiKey });
      return response.json();
    },
    onSuccess: (session) => {
      onSessionCreated(session.id);
      toast({
        title: "Quiz Started",
        description: "Your quiz session has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create quiz session. Please check your API key.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to continue.",
        variant: "destructive",
      });
      return;
    }
    createSessionMutation.mutate(apiKey);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <Card className="max-w-md w-full mx-4 transform transition-all">
        <CardContent className="pt-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Agentic AI Quiz Platform</h2>
            <p className="text-gray-600">Enter your Gemini API key to generate dynamic quiz questions</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="apiKey" className="block text-sm font-medium text-gray-700 mb-2">
                Gemini API Key
              </Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Enter your Gemini API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full"
              />
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Quiz Information:</p>
                  <ul className="text-xs space-y-1">
                    <li>• 50 questions total (120 minutes)</li>
                    <li>• Difficulty Level: 70/100</li>
                    <li>• Topics: OpenAI SDK, Prompt Engineering, Markdown, Pydantic</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <Button 
              type="submit"
              className="w-full bg-primary text-white hover:bg-blue-700"
              disabled={createSessionMutation.isPending}
            >
              {createSessionMutation.isPending ? "Starting Quiz..." : "Start Quiz"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
