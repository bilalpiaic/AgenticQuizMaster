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
  // OpenAI Agents SDK Questions (120 questions - 80% of total)
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
  // More OpenAI Agents SDK Questions
  {
    category: 'OpenAI Agents SDK',
    difficulty: 6,
    type: 'code-based',
    title: 'Streaming Response Handling',
    content: 'How do you properly handle streaming responses in OpenAI SDK?',
    codeExample: `const stream = await openai.chat.completions.create({
  model: "gpt-4",
  messages: [{role: "user", content: "Hello"}],
  stream: true
});`,
    options: [
      'Use for await...of loop to iterate chunks',
      'Use .then() method to handle completion',
      'Convert to string immediately',
      'Use JSON.parse() on each chunk'
    ],
    correctAnswerIndex: 0,
    explanation: 'Streaming responses should be handled with for await...of loop to properly iterate over chunks as they arrive.',
    timeAllotted: 100
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 7,
    type: 'conceptual',
    title: 'Token Management',
    content: 'What is the most effective strategy for managing token limits in long conversations?',
    options: [
      'Truncate old messages when approaching limit',
      'Summarize conversation history periodically',
      'Use smaller model variants',
      'Split conversation into multiple sessions'
    ],
    correctAnswerIndex: 1,
    explanation: 'Summarizing conversation history maintains context while reducing token count, providing better continuity than truncation.',
    timeAllotted: 110
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 8,
    type: 'code-based',
    title: 'Function Call Validation',
    content: 'What is wrong with this function call validation?',
    codeExample: `if (message.function_call) {
  const result = await executeFunction(message.function_call.name);
  return result;
}`,
    options: [
      'Missing parameter validation',
      'No error handling for function execution',
      'Not checking function_call.arguments',
      'All of the above'
    ],
    correctAnswerIndex: 3,
    explanation: 'Proper function call handling requires parameter validation, argument parsing, and comprehensive error handling.',
    timeAllotted: 120
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 5,
    type: 'conceptual',
    title: 'Model Selection Criteria',
    content: 'When should you choose GPT-4 over GPT-3.5-turbo for an agent?',
    options: [
      'For simple question-answering tasks',
      'When cost optimization is the priority',
      'For complex reasoning and multi-step tasks',
      'For faster response times'
    ],
    correctAnswerIndex: 2,
    explanation: 'GPT-4 excels at complex reasoning and multi-step tasks, while GPT-3.5-turbo is better for simpler, cost-sensitive applications.',
    timeAllotted: 90
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 9,
    type: 'conceptual',
    title: 'Agent State Management',
    content: 'What is the best pattern for maintaining agent state across multiple interactions?',
    options: [
      'Store everything in local variables',
      'Use external database with session management',
      'Embed state in system messages',
      'Use file-based storage'
    ],
    correctAnswerIndex: 1,
    explanation: 'External database with session management provides scalability, persistence, and proper state isolation for production agents.',
    timeAllotted: 130
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 6,
    type: 'code-based',
    title: 'Error Response Parsing',
    content: 'How should you handle OpenAI API errors properly?',
    codeExample: `try {
  const response = await openai.chat.completions.create(params);
} catch (error) {
  // What should go here?
}`,
    options: [
      'console.log(error) and continue',
      'Check error.status and handle different error types',
      'Retry immediately',
      'Return generic error message'
    ],
    correctAnswerIndex: 1,
    explanation: 'Proper error handling involves checking error status codes and implementing appropriate responses for different error types (rate limits, invalid requests, etc.).',
    timeAllotted: 100
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 7,
    type: 'conceptual',
    title: 'Prompt Template Design',
    content: 'What makes a prompt template most effective for agent consistency?',
    options: [
      'Using very detailed instructions',
      'Including few-shot examples',
      'Keeping templates as short as possible',
      'Using technical jargon'
    ],
    correctAnswerIndex: 1,
    explanation: 'Few-shot examples provide concrete patterns for the agent to follow, leading to more consistent and predictable responses.',
    timeAllotted: 100
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 8,
    type: 'code-based',
    title: 'Async Function Orchestration',
    content: 'What is the issue with this agent workflow?',
    codeExample: `async function processRequest(input) {
  const analysis = await analyzeInput(input);
  const response1 = await generateResponse(analysis);
  const response2 = await enhanceResponse(response1);
  return response2;
}`,
    options: [
      'Missing error handling',
      'No input validation',
      'Sequential processing when parallel is possible',
      'All operations should be parallel'
    ],
    correctAnswerIndex: 0,
    explanation: 'While the sequential flow might be necessary for dependent operations, the critical issue is missing error handling at each step.',
    timeAllotted: 120
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 5,
    type: 'conceptual',
    title: 'Agent Response Formatting',
    content: 'What is the best practice for structuring agent responses?',
    options: [
      'Always return plain text',
      'Use JSON for structured data',
      'Include metadata and confidence scores',
      'Depend on the use case requirements'
    ],
    correctAnswerIndex: 3,
    explanation: 'Response formatting should be tailored to use case requirements - plain text for conversational agents, JSON for data processing, etc.',
    timeAllotted: 80
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 9,
    type: 'code-based',
    title: 'Advanced Function Chaining',
    content: 'What pattern is demonstrated in this code?',
    codeExample: `const agent = {
  async process(input) {
    let context = { input, tools: this.tools };
    for (const step of this.workflow) {
      context = await step.execute(context);
    }
    return context.result;
  }
};`,
    options: [
      'Pipeline pattern for agent workflows',
      'Observer pattern implementation',
      'Factory pattern for tool creation',
      'Singleton pattern for agent management'
    ],
    correctAnswerIndex: 0,
    explanation: 'This demonstrates the pipeline pattern, where data flows through a series of processing steps, each potentially modifying the context.',
    timeAllotted: 140
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 6,
    type: 'conceptual',
    title: 'Context Window Optimization',
    content: 'How can you maximize effective context usage in long documents?',
    options: [
      'Use sliding window approach',
      'Implement hierarchical summarization',
      'Use embeddings for relevant section retrieval',
      'All of the above'
    ],
    correctAnswerIndex: 3,
    explanation: 'Effective context management combines multiple strategies: sliding windows for recent context, hierarchical summarization for compression, and embeddings for relevant retrieval.',
    timeAllotted: 100
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 7,
    type: 'code-based',
    title: 'Temperature and Sampling Control',
    content: 'When would you use these specific parameters?',
    codeExample: `const completion = await openai.chat.completions.create({
  model: "gpt-4",
  temperature: 0.0,
  top_p: 1.0,
  frequency_penalty: 0.0,
  presence_penalty: 0.0
});`,
    options: [
      'For creative writing tasks',
      'For deterministic, factual responses',
      'For diverse conversation responses',
      'For code generation tasks'
    ],
    correctAnswerIndex: 1,
    explanation: 'Temperature 0.0 with default other parameters produces deterministic, factual responses ideal for consistent agent behavior.',
    timeAllotted: 110
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 8,
    type: 'conceptual',
    title: 'Multi-Agent Communication',
    content: 'What is the most robust pattern for inter-agent communication?',
    options: [
      'Direct method calls between agents',
      'Shared memory space',
      'Message passing with event bus',
      'Database-mediated communication'
    ],
    correctAnswerIndex: 2,
    explanation: 'Message passing with event bus provides loose coupling, scalability, and clear communication patterns between agents.',
    timeAllotted: 120
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 5,
    type: 'code-based',
    title: 'Basic System Message Setup',
    content: 'What is the purpose of the system message in this setup?',
    codeExample: `const messages = [
  {
    role: "system",
    content: "You are a helpful assistant that always responds in JSON format."
  },
  {
    role: "user", 
    content: "What's the weather today?"
  }
];`,
    options: [
      'To provide conversation history',
      'To set agent behavior and constraints',
      'To improve response speed',
      'To reduce token usage'
    ],
    correctAnswerIndex: 1,
    explanation: 'System messages establish the agent\'s role, behavior patterns, and output format constraints.',
    timeAllotted: 80
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 9,
    type: 'conceptual',
    title: 'Agent Security Considerations',
    content: 'What is the most critical security concern when deploying agents in production?',
    options: [
      'API key exposure',
      'Prompt injection attacks',
      'Rate limiting bypass',
      'Model parameter manipulation'
    ],
    correctAnswerIndex: 1,
    explanation: 'Prompt injection attacks can manipulate agent behavior to bypass intended constraints and perform unintended actions.',
    timeAllotted: 130
  },
  // Continue with more OpenAI Agents SDK questions...
  {
    category: 'OpenAI Agents SDK',
    difficulty: 6,
    type: 'code-based',
    title: 'Tool Integration Pattern',
    content: 'What is the recommended pattern for integrating external tools?',
    codeExample: `class ToolManager {
  async executeTool(name, params) {
    const tool = this.tools[name];
    if (!tool) throw new Error('Tool not found');
    return await tool.execute(params);
  }
}`,
    options: [
      'Direct function calls are better',
      'This provides good abstraction and error handling',
      'Should use synchronous execution',
      'Missing validation layer'
    ],
    correctAnswerIndex: 1,
    explanation: 'This pattern provides clean abstraction, centralized tool management, and basic error handling for missing tools.',
    timeAllotted: 100
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 7,
    type: 'conceptual',
    title: 'Agent Performance Monitoring',
    content: 'Which metric is most important for agent performance monitoring?',
    options: [
      'Response time only',
      'Token usage per interaction',
      'Task completion rate and quality',
      'API call frequency'
    ],
    correctAnswerIndex: 2,
    explanation: 'Task completion rate and quality metrics provide the most meaningful insights into agent effectiveness and user satisfaction.',
    timeAllotted: 100
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 8,
    type: 'code-based',
    title: 'Dynamic Function Generation',
    content: 'What is the advantage of this dynamic function approach?',
    codeExample: `function createAgent(config) {
  return {
    functions: config.tools.map(tool => ({
      name: tool.name,
      description: tool.description,
      parameters: tool.schema
    })),
    async call(messages) {
      return await openai.chat.completions.create({
        messages,
        functions: this.functions
      });
    }
  };
}`,
    options: [
      'Better performance',
      'Flexible tool configuration per agent instance',
      'Reduced memory usage',
      'Simpler debugging'
    ],
    correctAnswerIndex: 1,
    explanation: 'This pattern allows different agent instances to have different tool sets based on their specific requirements and use cases.',
    timeAllotted: 120
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 5,
    type: 'conceptual',
    title: 'Agent Testing Strategies',
    content: 'What is the most effective approach for testing agent responses?',
    options: [
      'Manual testing only',
      'Unit tests with mocked responses',
      'Integration tests with real API calls',
      'Combination of automated and manual testing'
    ],
    correctAnswerIndex: 3,
    explanation: 'Effective agent testing requires both automated tests for consistency and manual testing for quality and edge cases.',
    timeAllotted: 90
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 9,
    type: 'code-based',
    title: 'Advanced Memory Pattern',
    content: 'What memory management pattern is shown here?',
    codeExample: `class AgentMemory {
  constructor(maxTokens = 4000) {
    this.shortTerm = [];
    this.longTerm = new Map();
    this.maxTokens = maxTokens;
  }
  
  async addInteraction(interaction) {
    this.shortTerm.push(interaction);
    if (this.getTokenCount() > this.maxTokens) {
      await this.compressMemory();
    }
  }
}`,
    options: [
      'Simple FIFO buffer',
      'Hierarchical memory with compression',
      'Fixed-size circular buffer',
      'Database-backed persistence'
    ],
    correctAnswerIndex: 1,
    explanation: 'This implements hierarchical memory with automatic compression when token limits are reached, maintaining both recent and summarized long-term context.',
    timeAllotted: 140
  },
  
  // Prompt Engineering Questions (15 questions)
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
  {
    category: 'Prompt Engineering',
    difficulty: 8,
    type: 'conceptual',
    title: 'Advanced Prompt Optimization',
    content: 'What is the most effective strategy for optimizing prompts for complex reasoning tasks?',
    options: [
      'Increase temperature for more creativity',
      'Use role-playing with expert personas',
      'Decompose into smaller, sequential sub-tasks',
      'Add more detailed background context'
    ],
    correctAnswerIndex: 2,
    explanation: 'Breaking complex tasks into smaller, manageable sub-tasks allows the model to handle each component systematically, reducing errors.',
    timeAllotted: 110
  },
  {
    category: 'Prompt Engineering',
    difficulty: 5,
    type: 'conceptual',
    title: 'Temperature and Creativity Control',
    content: 'When should you use a low temperature (0.1-0.3) in your prompts?',
    options: [
      'For creative writing tasks',
      'For factual information retrieval',
      'For brainstorming sessions',
      'For generating diverse options'
    ],
    correctAnswerIndex: 1,
    explanation: 'Low temperature produces more deterministic, focused responses ideal for factual information where consistency is important.',
    timeAllotted: 80
  },
  {
    category: 'Prompt Engineering',
    difficulty: 9,
    type: 'code-based',
    title: 'Dynamic Prompt Construction',
    content: 'What is the advantage of this dynamic prompting approach?',
    codeExample: `function buildPrompt(task, context, examples) {
  return \`
    Task: \${task}
    Context: \${context}
    
    Examples:
    \${examples.map(ex => \`Input: \${ex.input}\\nOutput: \${ex.output}\`).join('\\n\\n')}
    
    Now complete this task:
  \`;
}`,
    options: [
      'Better performance than static prompts',
      'Allows context-specific adaptation',
      'Reduces token usage',
      'Improves model training'
    ],
    correctAnswerIndex: 1,
    explanation: 'Dynamic prompts can adapt to different contexts and include relevant examples specific to each use case, improving relevance and accuracy.',
    timeAllotted: 120
  },
  
  // Markdown Questions (8 questions)
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
  
  // Pydantic Questions (12 questions)
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
  }
];

// Additional questions for comprehensive coverage
const additionalQuestions: FallbackQuestion[] = [
  // More OpenAI Agents SDK questions
  {
    category: 'OpenAI Agents SDK',
    difficulty: 6,
    type: 'conceptual',
    title: 'Conversation History Management',
    content: 'What is the best approach to manage conversation history in long-running agents?',
    options: [
      'Store all messages indefinitely',
      'Use sliding window with summarization',
      'Delete old messages when limit reached',
      'Store only system messages'
    ],
    correctAnswerIndex: 1,
    explanation: 'Sliding window with summarization maintains context while staying within token limits, preserving important information.',
    timeAllotted: 90
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 7,
    type: 'code-based',
    title: 'Retry Logic Implementation',
    content: 'What is the issue with this retry implementation?',
    codeExample: `async function callAPI(params, retries = 3) {
  try {
    return await openai.chat.completions.create(params);
  } catch (error) {
    if (retries > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return callAPI(params, retries - 1);
    }
    throw error;
  }
}`,
    options: [
      'Fixed delay is inefficient for rate limits',
      'Should use exponential backoff',
      'Missing specific error type checking',
      'All of the above'
    ],
    correctAnswerIndex: 3,
    explanation: 'Effective retry logic should use exponential backoff, check specific error types (like rate limits), and avoid fixed delays.',
    timeAllotted: 110
  },
  {
    category: 'OpenAI Agents SDK',
    difficulty: 8,
    type: 'conceptual',
    title: 'Agent Scaling Patterns',
    content: 'Which pattern is most effective for scaling agents horizontally?',
    options: [
      'Single instance with threading',
      'Stateless agents with external session storage',
      'Shared memory between agent instances',
      'Database connection pooling'
    ],
    correctAnswerIndex: 1,
    explanation: 'Stateless agents with external session storage enable horizontal scaling while maintaining session continuity.',
    timeAllotted: 120
  },
  // More Prompt Engineering questions
  {
    category: 'Prompt Engineering',
    difficulty: 7,
    type: 'conceptual',
    title: 'Role-Based Prompting',
    content: 'What makes role-based prompting effective for specialized tasks?',
    options: [
      'It reduces token usage',
      'It provides domain-specific context and behavior patterns',
      'It improves response speed',
      'It enables multimodal interactions'
    ],
    correctAnswerIndex: 1,
    explanation: 'Role-based prompting leverages domain expertise by providing specific context and behavioral patterns relevant to the role.',
    timeAllotted: 95
  },
  // More Markdown questions
  {
    category: 'Markdown',
    difficulty: 5,
    type: 'code-based',
    title: 'Code Block Syntax',
    content: 'What is the correct way to specify language highlighting in code blocks?',
    codeExample: '```javascript\nconst x = 5;\n```',
    options: [
      'This is correct syntax',
      'Should use <code> tags instead',
      'Language identifier goes after closing backticks',
      'Need to specify encoding type'
    ],
    correctAnswerIndex: 0,
    explanation: 'The language identifier goes immediately after the opening triple backticks for syntax highlighting.',
    timeAllotted: 70
  },
  // More Pydantic questions
  {
    category: 'Pydantic',
    difficulty: 7,
    type: 'code-based',
    title: 'Custom Validators',
    content: 'What is the correct way to implement a custom validator?',
    codeExample: `from pydantic import BaseModel, validator

class User(BaseModel):
    name: str
    age: int
    
    @validator('age')
    def validate_age(cls, v):
        if v < 0 or v > 150:
            raise ValueError('Age must be between 0 and 150')
        return v`,
    options: [
      'This is correct implementation',
      'Should use @field_validator instead',
      'Missing return type annotation',
      'Need to import Field'
    ],
    correctAnswerIndex: 0,
    explanation: 'This shows proper validator implementation with class method decorator and appropriate validation logic.',
    timeAllotted: 100
  }
];
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

// Combine all questions
const allQuestions = [...fallbackQuestions, ...additionalQuestions];

export function getFallbackQuestion(questionNumber: number, category: string, difficulty: number, type: 'conceptual' | 'code-based'): FallbackQuestion {
  // Find questions matching the criteria
  const matchingQuestions = allQuestions.filter(q => 
    q.category === category && 
    Math.abs(q.difficulty - difficulty) <= 3 && 
    q.type === type
  );
  
  if (matchingQuestions.length > 0) {
    return matchingQuestions[questionNumber % matchingQuestions.length];
  }
  
  // Fallback to any question from the category
  const categoryQuestions = allQuestions.filter(q => q.category === category);
  if (categoryQuestions.length > 0) {
    return categoryQuestions[questionNumber % categoryQuestions.length];
  }
  
  // Final fallback - return any question (this ensures we never return null)
  return allQuestions[questionNumber % allQuestions.length];
}