import { NextResponse } from 'next/server';
import OpenAI from 'openai';

// Check if the OpenAI API key is set
const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey || apiKey === 'your_openai_api_key_here') {
  console.warn('OpenAI API key is not set or is using the default value');
}

// Initialize the OpenAI client with API key from environment variables
const openai = new OpenAI({
  apiKey: apiKey,
});

export async function POST(request: Request) {
  try {
    // Check if API key is missing or using the default value
    if (!apiKey || apiKey === 'your_openai_api_key_here') {
      return NextResponse.json(
        { 
          error: 'OpenAI API key is missing. Please set it in your .env.local file.' 
        },
        { status: 401 }
      );
    }

    const { messages } = await request.json();
    
    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // System message to guide the AI's behavior
    const systemMessage = {
      role: 'system',
      content: `You are a helpful insurance assistant for InsureMVP. 
      Your goal is to help users understand insurance products, answer their questions, 
      and guide them to the right coverage for their needs.
      
      Be friendly, professional, and concise. Focus on providing accurate information about 
      insurance products including auto, home, life, health, business, and travel insurance.
      
      If asked about specific pricing, explain that you'll need to collect some information 
      to provide an accurate quote. If asked about claims, explain the general process.
      
      Always maintain a helpful and supportive tone.`
    };

    // Add system message to the beginning of the messages array
    const completeMessages = [systemMessage, ...messages];
    
    // Call the OpenAI API
    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // You can use 'gpt-4' for more advanced capabilities
      messages: completeMessages,
      temperature: 0.7,
      max_tokens: 500,
    });
    
    // Return the response from OpenAI
    return NextResponse.json(completion);
  } catch (error) {
    console.error('Error in chat API:', error);
    
    // Check if it's an OpenAI API error
    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { error: `OpenAI API error: ${error.message}` },
        { status: error.status || 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}