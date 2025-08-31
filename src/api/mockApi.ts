export interface ApiResponse {
  id: string;
  content: string;
  model: string;
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

const mockResponses = [
  "I'd be happy to help you with that! Here's a comprehensive approach to your question...",
  "That's an interesting perspective. Let me break this down into key components...",
  "Based on the information provided, I can suggest several strategies...",
  "Here's a detailed analysis of the topic you've mentioned...",
  "I understand what you're looking for. Let me provide a structured response..."
];

export async function sendPrompt(
  prompt: string,
  model: string,
  parameters: {
    temperature: number;
    maxTokens: number;
    topP: number;
    frequencyPenalty: number;
  }
): Promise<ApiResponse> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

  // Simulate occasional errors
  if (Math.random() < 0.1) {
    throw new Error('API request failed. Please try again.');
  }

  const response = mockResponses[Math.floor(Math.random() * mockResponses.length)];
  
  return {
    id: `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    content: response + ` (Generated with ${model} at temperature ${parameters.temperature})`,
    model,
    usage: {
      promptTokens: Math.floor(prompt.length / 4),
      completionTokens: Math.floor(response.length / 4),
      totalTokens: Math.floor((prompt.length + response.length) / 4),
    }
  };
}

export const availableModels = [
  { id: 'gpt-3.5-turbo', name: 'GPT-3.5 Turbo', provider: 'OpenAI' },
  { id: 'gpt-4', name: 'GPT-4', provider: 'OpenAI' },
  { id: 'claude-3-sonnet', name: 'Claude 3 Sonnet', provider: 'Anthropic' },
  { id: 'claude-3-opus', name: 'Claude 3 Opus', provider: 'Anthropic' },
  { id: 'custom', name: 'Custom Model', provider: 'Custom' },
];