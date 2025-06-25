// Fallback questions for when Gemini API is unavailable
// These are high-quality questions matching the course requirements

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
  // Prompt Engineering Questions (5)
  {
    category: 'Prompt Engineering',
    difficulty: 8,
    type: 'conceptual',
    title: 'Advanced Chain-of-Thought Prompting',
    content: 'Which technique is most effective for preventing hallucinations in multi-step reasoning tasks when using large language models for complex problem solving?',
    options: [
      'Increasing temperature to encourage more creative responses',
      'Using step-by-step reasoning with explicit verification at each stage',
      'Reducing context window to focus on immediate steps',
      'Adding more examples without structured reasoning patterns'
    ],
    correctAnswerIndex: 1,
    explanation: 'Step-by-step reasoning with explicit verification at each stage helps prevent hallucinations by forcing the model to show its work and validate each step, making errors more detectable and correctable.',
    timeAllotted: 120
  },
  {
    category: 'Prompt Engineering',
    difficulty: 9,
    type: 'code-based',
    title: 'Few-Shot Learning Implementation',
    content: 'What is the primary issue with this few-shot prompt design for a code generation task?',
    codeExample: `prompt = """
Generate a function:
Example: def add(a, b): return a + b
Example: def subtract(a, b): return a - b
Task: Create a multiply function
"""`,
    options: [
      'The examples are too simple and not diverse enough',
      'Missing explicit output format specification and task boundaries',
      'The prompt lacks proper delimiters between examples and task',
      'All of the above issues significantly impact performance'
    ],
    correctAnswerIndex: 3,
    explanation: 'This prompt has multiple critical issues: examples lack diversity, no clear output format is specified, and there are no proper delimiters. These issues combined significantly reduce the quality and consistency of generated code.',
    timeAllotted: 150
  },
  {
    category: 'Prompt Engineering',
    difficulty: 7,
    type: 'conceptual',
    title: 'Prompt Injection Prevention',
    content: 'Which strategy is most effective for preventing prompt injection attacks in production AI systems?',
    options: [
      'Input sanitization and validation only',
      'Using multiple model calls with cross-validation',
      'Implementing input/output filtering, structured prompts, and separate instruction channels',
      'Relying solely on model fine-tuning for safety'
    ],
    correctAnswerIndex: 2,
    explanation: 'A comprehensive approach using input/output filtering, structured prompts, and separate instruction channels provides multiple layers of defense against prompt injection attacks, making the system more robust.',
    timeAllotted: 100
  },
  {
    category: 'Prompt Engineering',
    difficulty: 8,
    type: 'code-based',
    title: 'Context Window Management',
    content: 'What is the most critical flaw in this context management approach?',
    codeExample: `def manage_context(messages, max_tokens=4000):
    total_tokens = sum(len(msg.split()) for msg in messages)
    if total_tokens > max_tokens:
        return messages[-5:]  # Keep last 5 messages
    return messages`,
    options: [
      'Token counting is inaccurate - should use proper tokenizer',
      'Arbitrary truncation loses important context and system instructions',
      'No consideration for message importance or semantic relevance',
      'All of the above represent significant issues'
    ],
    correctAnswerIndex: 3,
    explanation: 'This approach has multiple critical flaws: inaccurate token counting, arbitrary truncation that may lose system instructions, and no semantic consideration. Proper context management requires tokenizer accuracy, intelligent truncation, and preservation of critical instructions.',
    timeAllotted: 140
  },
  {
    category: 'Prompt Engineering',
    difficulty: 9,
    type: 'conceptual',
    title: 'Advanced Reasoning Patterns',
    content: 'In complex multi-agent reasoning scenarios, which approach best maintains consistency and prevents contradictory conclusions?',
    options: [
      'Independent reasoning by each agent followed by majority voting',
      'Sequential reasoning with each agent building on previous outputs',
      'Structured debate protocol with explicit evidence tracking and resolution mechanisms',
      'Parallel processing with simple output aggregation'
    ],
    correctAnswerIndex: 2,
    explanation: 'Structured debate protocols with explicit evidence tracking and resolution mechanisms ensure that contradictions are identified and resolved systematically, leading to more consistent and reliable conclusions in multi-agent scenarios.',
    timeAllotted: 130
  },

  // Markdown Questions (2)
  {
    category: 'Markdown',
    difficulty: 6,
    type: 'conceptual',
    title: 'Advanced Markdown Documentation',
    content: 'Which Markdown feature is most crucial for creating professional documentation that supports complex technical projects?',
    options: [
      'Basic text formatting (bold, italic, headers)',
      'Tables with alignment and complex nested content',
      'Proper link management, code blocks with syntax highlighting, and semantic structure',
      'Image embedding and basic lists'
    ],
    correctAnswerIndex: 2,
    explanation: 'Professional technical documentation requires proper link management for navigation, syntax-highlighted code blocks for clarity, and semantic structure for accessibility and maintainability. These features are essential for complex projects.',
    timeAllotted: 80
  },
  {
    category: 'Markdown',
    difficulty: 7,
    type: 'conceptual',
    title: 'Cross-Platform Markdown Compatibility',
    content: 'What is the most important consideration when writing Markdown for cross-platform compatibility in documentation systems?',
    options: [
      'Using only basic CommonMark syntax without extensions',
      'Avoiding all HTML elements and special characters',
      'Standardizing on GitHub Flavored Markdown syntax',
      'Testing rendering across target platforms and using consistent flavors'
    ],
    correctAnswerIndex: 3,
    explanation: 'Testing across target platforms and using consistent Markdown flavors ensures compatibility. Different platforms support different extensions, so validation and standardization are crucial for reliable rendering.',
    timeAllotted: 90
  },

  // Pydantic Questions (3)
  {
    category: 'Pydantic',
    difficulty: 8,
    type: 'code-based',
    title: 'Advanced Pydantic Validation',
    content: 'What is the primary issue with this Pydantic model design for a production API?',
    codeExample: `from pydantic import BaseModel
from typing import List

class UserModel(BaseModel):
    name: str
    age: int
    emails: List[str]
    
    def __init__(self, **data):
        super().__init__(**data)
        self.emails = [email.lower() for email in self.emails]`,
    options: [
      'Missing field validation and constraints',
      'Incorrect use of __init__ for data transformation',
      'No email format validation or proper field configuration',
      'All of the above represent significant design flaws'
    ],
    correctAnswerIndex: 3,
    explanation: 'This model has multiple issues: missing field validation, incorrect __init__ usage (should use validators/field_validator), and no email format validation. Pydantic should handle transformations through proper validator decorators.',
    timeAllotted: 120
  },
  {
    category: 'Pydantic',
    difficulty: 9,
    type: 'conceptual',
    title: 'Pydantic Performance Optimization',
    content: 'Which approach provides the best performance optimization for Pydantic models in high-throughput applications?',
    options: [
      'Using Config.allow_reuse=False to prevent caching issues',
      'Implementing custom __init__ methods for faster initialization',
      'Utilizing Config.validate_assignment=False and strategic field caching',
      'Converting all fields to Optional to reduce validation overhead'
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

export function getFallbackQuestion(questionNumber: number, category: string, difficulty: number, type: 'conceptual' | 'code-based'): FallbackQuestion | null {
  // Find questions matching the criteria
  const matchingQuestions = fallbackQuestions.filter(q => 
    q.category === category && 
    Math.abs(q.difficulty - difficulty) <= 1 && 
    q.type === type
  );
  
  if (matchingQuestions.length === 0) {
    // Fallback to any question from the category
    const categoryQuestions = fallbackQuestions.filter(q => q.category === category);
    if (categoryQuestions.length === 0) {
      return null;
    }
    return categoryQuestions[questionNumber % categoryQuestions.length];
  }
  
  return matchingQuestions[questionNumber % matchingQuestions.length];
}