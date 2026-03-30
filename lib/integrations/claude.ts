import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({
  apiKey: process.env.CLAUDE_API_KEY,
});

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface SummaryOptions {
  maxTokens?: number;
  temperature?: number;
}

export async function generateSummary(
  text: string,
  options: SummaryOptions = {}
): Promise<string> {
  try {
    const response = await client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: options.maxTokens || 1024,
      temperature: options.temperature || 0.3,
      messages: [{
        role: 'user',
        content: `Summarize the following text concisely:\n\n${text}`
      }]
    });
    return response.content[0].type === 'text' ? response.content[0].text : '';
  } catch (error) {
    throw new Error(`Claude API error: ${error}`);
  }
}

export async function chatCompletion(
  messages: ChatMessage[]
): Promise<string> {
  try {
    const response = await client.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 1024,
      messages
    });
    return response.content[0].type === 'text' ? response.content[0].text : '';
  } catch (error) {
    throw new Error(`Claude API error: ${error}`);
  }
}