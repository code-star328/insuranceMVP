import { useState, useRef, useEffect } from 'react';
import ErrorMessage from './ErrorMessage';
import ApiKeyMissing from './ApiKeyMissing';
import { getChatCompletion } from '@/lib/openai';
import { Message } from '@/types/chat';

type ChatBotProps = {
  initialProduct?: string;
};

export default function ChatBot({ initialProduct }: ChatBotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isApiKeyMissing, setIsApiKeyMissing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat with a welcome message
  useEffect(() => {
    let initialMessage = "Hi there! I'm your insurance assistant. How can I help you today?";
    
    if (initialProduct) {
      const productMap: Record<string, string> = {
        'auto': 'auto insurance',
        'home': 'home insurance',
        'life': 'life insurance',
        'health': 'health insurance',
        'business': 'business insurance',
        'travel': 'travel insurance',
      };
      
      const productName = productMap[initialProduct] || initialProduct;
      initialMessage = `Hi there! I see you're interested in ${productName}. What would you like to know about it?`;
    }
    
    setMessages([{ role: 'assistant', content: initialMessage }]);
  }, [initialProduct]);

  // Auto-scroll to the bottom of the chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Clear any previous errors
    setError(null);
    setIsApiKeyMissing(false);

    // Add user message to chat
    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Create a copy of all messages for the API call
      const chatMessages = [...messages, userMessage];
      
      // Get response from OpenAI API
      const responseContent = await getChatCompletion(chatMessages);
      
      // Add assistant response to chat
      setMessages((prev) => [...prev, { role: 'assistant', content: responseContent }]);
    } catch (error) {
      console.error('Error getting chat response:', error);
      
      // Check if the error is due to missing API key
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      if (errorMessage.includes('API key is missing')) {
        setIsApiKeyMissing(true);
      } else {
        setError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRetry = () => {
    setError(null);
    // Retry the last user message if there was one
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      const lastUserMessage = messages[messages.length - 1];
      setInput(lastUserMessage.content);
      // Remove the last user message to avoid duplication
      setMessages(messages.slice(0, -1));
    }
  };

  // If API key is missing, show the API key missing component
  if (isApiKeyMissing) {
    return (
      <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-lg shadow-lg">
        <div className="bg-primary text-white px-4 py-3 rounded-t-lg">
          <h3 className="text-lg font-medium">Insurance Assistant</h3>
        </div>
        <div className="flex-1 p-6 flex items-center justify-center">
          <div className="max-w-md">
            <ApiKeyMissing />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-lg shadow-lg">
      {/* Chat header */}
      <div className="bg-primary text-white px-4 py-3 rounded-t-lg">
        <h3 className="text-lg font-medium">Insurance Assistant</h3>
      </div>
      
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.role === 'user'
                  ? 'bg-primary text-white rounded-br-none'
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 rounded-lg rounded-bl-none px-4 py-2">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Error message */}
        {error && (
          <div className="flex justify-start w-full">
            <div className="max-w-[80%] w-full">
              <ErrorMessage message={error} onRetry={handleRetry} />
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Chat input */}
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-primary text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            disabled={isLoading}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}