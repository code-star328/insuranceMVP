'use client';

import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import LoadingSpinner from '@/components/LoadingSpinner';

// Dynamically import the ChatBot component to avoid SSR issues
const ChatBot = dynamic(() => import('@/components/ChatBot'), { 
  ssr: false,
  loading: () => (
    <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-lg shadow-lg items-center justify-center">
      <LoadingSpinner size="large" />
      <p className="mt-4 text-gray-500">Loading chat assistant...</p>
    </div>
  )
});

export default function ChatPage() {
  const searchParams = useSearchParams();
  const product = searchParams.get('product');

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Chat with Our Insurance Assistant
        </h1>
        <p className="mt-4 text-xl text-gray-500">
          Get answers to your insurance questions and find the right coverage for your needs.
        </p>
      </div>
      
      <Suspense fallback={
        <div className="flex flex-col h-[600px] max-h-[80vh] bg-white rounded-lg shadow-lg items-center justify-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-gray-500">Loading chat assistant...</p>
        </div>
      }>
        <ChatBot initialProduct={product || undefined} />
      </Suspense>
      
      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">How Our AI-Powered Chat Assistant Can Help</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Answer questions about our insurance products</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Guide you to the right coverage based on your needs</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Provide information about claims and policy management</span>
          </li>
          <li className="flex items-start">
            <svg className="h-6 w-6 text-primary mr-2 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Help you understand insurance terminology</span>
          </li>
        </ul>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-500">
        <p>Powered by OpenAI technology for natural, helpful conversations</p>
      </div>
    </div>
  );
}