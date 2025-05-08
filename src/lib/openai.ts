/**
 * Utility functions for interacting with the OpenAI API
 */

import { Message } from '@/types/chat';

/**
 * Sends a chat conversation to the OpenAI API and returns the response
 */
export async function getChatCompletion(messages: Message[]): Promise<string> {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to get response from AI');
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error in getChatCompletion:', error);
    throw error;
  }
}