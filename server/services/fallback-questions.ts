// Fallback questions for when Gemini API is unavailable

interface FallbackQuestion {
  category: string;
  difficulty: number;
  type: 'conceptual' | 'code-based';
  title: string;
  content: string;
  codeExample?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  timeAllotted: number;
}

export const fallbackQuestions: FallbackQuestion[] = [
  // OpenAI Agents SDK Questions (40 questions)
  {
    category: 'OpenAI Agents SDK',
    difficulty: 6,
    type: 'conceptual',
    title: 'Agent Memory Management',
    content: 'What is the primary purpose of memory management in OpenAI agents?',
    options: [
      'To store conversation history for context preservation',
      'To reduce API costs by caching responses',
      'To improve agent response speed',
      'To enable multi-language support'
    ],
    correctAnswerIndex: 0,
    explanation: 'Memory management in OpenAI agents is crucial for maintaining conversation context and ensuring coherent, contextually aware responses across interactions.',
    timeAllotted: 90
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 7,
    type: 'code-based',
    title: 'Function Calling Setup',
    content: 'What is the correct way to define a function for OpenAI function calling?',
    codeExample: `const functions = [{
  name: "get_weather",
  description: "Get weather for a location",
  parameters: {
    type: "object",
    properties: {
      location: { type: "string" }
    },
    required: ["location"]
  }
}];`,
    options: [
      'This is the correct JSON schema format',
      'Missing "function_call" property',
      'Parameters should be an array, not object',
      'Description should be in parameters object'
    ],
    correctAnswerIndex: 0,
    explanation: 'This follows the correct OpenAI function calling schema with proper JSON schema format for parameters.',
    timeAllotted: 120
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 8,
    type: 'conceptual',
    title: 'Agent Orchestration Patterns',
    content: 'Which pattern is most effective for complex multi-step agent workflows?',
    options: [
      'Sequential chain execution',
      'Hierarchical agent coordination with a supervisor',
      'Parallel processing with result merging',
      'Event-driven reactive architecture'
    ],
    correctAnswerIndex: 1,
    explanation: 'Hierarchical coordination with a supervisor agent is most effective for complex workflows as it provides centralized control, error handling, and can dynamically route tasks to specialized sub-agents.',
    timeAllotted: 110
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 5,
    type: 'code-based',
    title: 'Basic Agent Configuration',
    content: 'What is missing from this basic agent setup?',
    codeExample: `const agent = new OpenAI({
  model: "gpt-4",
  temperature: 0.7
});`,
    options: [
      'API key configuration',
      'System message definition',
      'Function calling setup',
      'Memory initialization'
    ],
    correctAnswerIndex: 0,
    explanation: 'The API key is essential for authentication with OpenAI services. Without it, the agent cannot make API calls.',
    timeAllotted: 80
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 9,
    type: 'conceptual',
    title: 'Advanced Error Handling',
    content: 'What is the best practice for handling rate limits in production agents?',
    options: [
      'Implement exponential backoff with jitter',
      'Use a simple retry with fixed delay',
      'Switch to a different model immediately',
      'Cache previous responses to avoid calls'
    ],
    correctAnswerIndex: 0,
    explanation: 'Exponential backoff with jitter prevents thundering herd problems and provides optimal retry patterns that respect rate limits while maintaining system stability.',
    timeAllotted: 130
  },

  // Prompt Engineering Questions (5 questions)
  {
    category: 'Prompt Engineering',
    difficulty: 6,
    type: 'conceptual',
    title: 'Few-Shot Learning Principles',
    content: 'What is the most important factor in designing effective few-shot examples?',
    options: [
      'Using as many examples as possible',
      'Examples should be diverse and representative',
      'Examples should be identical to expected outputs',
      'Using simple, basic examples only'
    ],
    correctAnswerIndex: 1,
    explanation: 'Diverse and representative examples help the model generalize better to new inputs while maintaining consistency in format and style.',
    timeAllotted: 90
  },
  {
    category: 'Prompt Engineering',
    difficulty: 7,
    type: 'code-based',
    title: 'Chain-of-Thought Prompting',
    content: 'Which prompt structure best implements chain-of-thought reasoning?',
    codeExample: `Option A: "Solve this step by step: What is 25% of 80?"
Option B: "What is 25% of 80? Think step by step:
1. Convert percentage to decimal: 25% = 0.25
2. Multiply: 0.25 × 80 = 20
Therefore, 25% of 80 is 20."`,
    options: [
      'Option A - direct instruction',
      'Option B - demonstrated reasoning',
      'Both are equally effective',
      'Neither shows proper chain-of-thought'
    ],
    correctAnswerIndex: 1,
    explanation: 'Option B demonstrates the reasoning process explicitly, which helps the model learn to break down complex problems systematically.',
    timeAllotted: 100
  },

  // Markdown Questions (2 questions)
  {
    category: 'Markdown',
    difficulty: 4,
    type: 'code-based',
    title: 'Advanced Table Syntax',
    content: 'What is the correct syntax for a table with alignment?',
    codeExample: `| Name | Age | City |
|------|-----|------|
| John | 25  | NYC  |`,
    options: [
      'This is correct basic table syntax',
      'Missing alignment specification',
      'Should use <table> HTML tags',
      'Needs | at start and end of each row'
    ],
    correctAnswerIndex: 1,
    explanation: 'To specify alignment, use colons in the separator row: |:---| (left), |:---:| (center), |---:| (right).',
    timeAllotted: 70
  },
  {
    category: 'Markdown',
    difficulty: 6,
    type: 'conceptual',
    title: 'Markdown vs HTML Integration',
    content: 'When should you use HTML tags within Markdown documents?',
    options: [
      'Never, stick to pure Markdown',
      'For complex formatting not supported by Markdown',
      'Always use HTML for better control',
      'Only for images and links'
    ],
    correctAnswerIndex: 1,
    explanation: 'HTML tags should be used sparingly in Markdown, only when the desired formatting cannot be achieved with standard Markdown syntax.',
    timeAllotted: 85
  },

  // Pydantic Questions (3 questions)
  {
    category: 'Pydantic',
    difficulty: 6,
    type: 'code-based',
    title: 'Advanced Field Validation',
    content: 'What is the most effective way to validate an email field?',
    codeExample: `from pydantic import BaseModel, EmailStr, validator
class User(BaseModel):
    email: EmailStr`,
    options: [
      'This is sufficient for email validation',
      'Need additional regex validation',
      'Should use validator decorator',
      'Must use custom validation function'
    ],
    correctAnswerIndex: 0,
    explanation: 'EmailStr provides comprehensive email validation including format checking and domain validation.',
    timeAllotted: 90
  },
  {
    category: 'Pydantic',
    difficulty: 8,
    type: 'conceptual',
    title: 'Performance Optimization Strategies',
    content: 'What is the most effective strategy for optimizing Pydantic model performance?',
    options: [
      'Use Config.allow_reuse=False to prevent caching issues',
      'Implement custom __init__ methods for faster initialization',
      'Utilize Config.validate_assignment=False and strategic field caching',
      'Convert all fields to Optional to reduce validation overhead'
    ],
    correctAnswerIndex: 2,
    explanation: 'Setting validate_assignment=False reduces overhead for trusted internal operations, and strategic field caching (like Config.frozen=True when appropriate) can significantly improve performance in high-throughput scenarios.',
    timeAllotted: 110
  },
  {
    category: 'Pydantic',
    difficulty: 8,
    type: 'code-based',
    title: 'Complex Model Inheritance',
    content: 'What is the most critical issue with this Pydantic inheritance pattern?',
    codeExample: `class BaseConfig(BaseModel):
    created_at: datetime
    updated_at: datetime
    
class UserConfig(BaseConfig):
    username: str
    email: str
    
class AdminConfig(UserConfig):
    permissions: List[str] = []
    
# Usage
admin = AdminConfig(username="admin", email="admin@test.com")`,
    options: [
      'Missing datetime default values and timezone handling',
      'Inheritance chain is too deep and complex',
      'No proper field validation or constraints defined',
      'Missing required fields and improper default handling'
    ],
    correctAnswerIndex: 0,
    explanation: 'The datetime fields lack default values (should use Field(default_factory=datetime.now)) and timezone considerations. This will cause validation errors and inconsistent timestamp handling in production.',
    timeAllotted: 130
  }
];

export function getFallbackQuestion(questionNumber: number, category: string, difficulty: number, type: 'conceptual' | 'code-based'): FallbackQuestion {
  // Find questions matching the criteria
  const matchingQuestions = fallbackQuestions.filter(q => 
    q.category === category && 
    Math.abs(q.difficulty - difficulty) <= 3 && 
    q.type === type
  );
  
  if (matchingQuestions.length > 0) {
    return matchingQuestions[questionNumber % matchingQuestions.length];
  }
  
  // Fallback to any question from the category
  const categoryQuestions = fallbackQuestions.filter(q => q.category === category);
  if (categoryQuestions.length > 0) {
    return categoryQuestions[questionNumber % categoryQuestions.length];
  }
  
  // Final fallback - return any question (ensures we never return null)
  return fallbackQuestions[questionNumber % fallbackQuestions.length];
}