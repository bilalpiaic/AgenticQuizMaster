import { GoogleGenAI } from "@google/genai";

interface QuestionGenerationRequest {
  category: string;
  questionNumber: number;
  difficulty: number;
  type: 'conceptual' | 'code-based';
}

interface GeneratedQuestion {
  title: string;
  content: string;
  codeExample?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  timeAllotted: number;
}

export class GeminiService {
  private ai: GoogleGenAI;

  constructor(apiKey: string) {
    this.ai = new GoogleGenAI({ apiKey });
  }

  async generateQuestion(request: QuestionGenerationRequest): Promise<GeneratedQuestion> {
    const systemPrompt = this.buildSystemPrompt(request);
    const userPrompt = this.buildUserPrompt(request);

    try {
      const response = await this.ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          systemInstruction: systemPrompt,
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              title: { type: "string" },
              content: { type: "string" },
              codeExample: { type: "string" },
              options: {
                type: "array",
                items: { type: "string" },
                minItems: 4,
                maxItems: 4
              },
              correctAnswerIndex: { type: "number" },
              explanation: { type: "string" },
              timeAllotted: { type: "number" }
            },
            required: ["title", "content", "options", "correctAnswerIndex", "explanation", "timeAllotted"]
          }
        },
        contents: userPrompt,
      });

      const rawJson = response.text;
      if (!rawJson) {
        throw new Error("Empty response from Gemini API");
      }

      const question: GeneratedQuestion = JSON.parse(rawJson);
      return question;
    } catch (error) {
      throw new Error(`Failed to generate question: ${error}`);
    }
  }

  private buildSystemPrompt(request: QuestionGenerationRequest): string {
    return `You are an expert AI assessment generator for an Agentic AI course focusing on OpenAI Agents SDK, Prompt Engineering, Markdown, and Pydantic.

Generate questions with difficulty level 70/100 (advanced level) that test deep understanding and practical application.

Question Requirements:
- Difficulty: ${request.difficulty}/10 (corresponding to 70/100 overall difficulty)
- Type: ${request.type}
- Category: ${request.category}
- Professional and technically accurate
- Test real-world application scenarios
- Include nuanced understanding requirements

Time Allocation Guidelines:
- OpenAI Agents SDK: 120-180 seconds (complex topics)
- Prompt Engineering: 90-150 seconds  
- Pydantic: 90-120 seconds
- Markdown: 60-90 seconds

For code-based questions, include realistic code examples that demonstrate practical usage patterns.
For conceptual questions, focus on architectural decisions, best practices, and advanced concepts.

Always provide 4 options with exactly one correct answer and detailed explanations.`;
  }

  private buildUserPrompt(request: QuestionGenerationRequest): string {
    const categoryContent = this.getCategoryContent(request.category);
    
    return `Generate a ${request.type} question for ${request.category} (Question ${request.questionNumber}/50).

Category Focus: ${categoryContent}

The question should:
1. Test advanced understanding suitable for difficulty level ${request.difficulty}/10
2. Be relevant to real-world Agentic AI development
3. Require critical thinking and detailed knowledge
4. Include practical scenarios or code examples if applicable

Provide exactly 4 answer options and ensure the explanation demonstrates why the correct answer is optimal and why other options are incorrect.`;
  }

  private getCategoryContent(category: string): string {
    switch (category) {
      case 'OpenAI Agents SDK':
        return `Advanced OpenAI Agents SDK concepts including:
- Multi-agent architecture and collaboration patterns
- Context management and state handling
- Error handling and debugging strategies
- Advanced primitives and their implementation
- Production deployment considerations
- Performance optimization and scaling`;

      case 'Prompt Engineering':
        return `Advanced prompt engineering techniques including:
- Complex prompt design patterns
- Chain-of-thought and reasoning strategies
- Few-shot and zero-shot learning optimization
- Prompt injection prevention and security
- Context window management
- Advanced prompt debugging techniques`;

      case 'Pydantic':
        return `Pydantic library advanced usage including:
- Complex data validation scenarios
- Custom validators and field types
- Model inheritance and composition
- Configuration and settings management
- Integration with FastAPI and other frameworks
- Performance optimization techniques`;

      case 'Markdown':
        return `Advanced Markdown usage including:
- Extended syntax and advanced formatting
- Documentation best practices
- Integration with development workflows
- Advanced table and list structures
- Mathematical notation and code highlighting
- Cross-platform compatibility considerations`;

      default:
        return 'General Agentic AI concepts and best practices';
    }
  }
}
