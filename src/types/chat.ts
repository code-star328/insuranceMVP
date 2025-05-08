/**
 * Types for chat functionality
 */

export type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

export type ChatCompletionResponse = {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }[];
};