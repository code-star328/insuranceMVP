# Insurance MVP Website with OpenAI Chatbot

## Project Overview

This project is a simple and modern insurance website MVP built with Next.js, featuring an OpenAI-powered chatbot assistant to help users navigate insurance products.

## Key Features

1. **Home Page**
   - Modern hero section with tagline and CTA buttons
   - Feature highlights section
   - Testimonial section

2. **Products Page**
   - Grid of insurance product cards (Auto, Home, Life, Health, Business, Travel)
   - Each card has an icon, name, description, and "Learn More" button
   - Clicking "Learn More" takes users to the chatbot with the selected product pre-selected

3. **OpenAI-Powered Chatbot**
   - Interactive chat interface
   - Integration with OpenAI API for intelligent responses
   - Product-specific conversations
   - Error handling and loading states
   - API key validation

## Technical Implementation

### Frontend
- Next.js App Router for page routing
- TypeScript for type safety
- Tailwind CSS for styling
- React components for UI elements

### Backend
- Next.js API routes for backend functionality
- OpenAI API integration for the chatbot

### Components
- `ChatBot.tsx`: Main chatbot component with message handling
- `ErrorMessage.tsx`: Error display component
- `ApiKeyMissing.tsx`: Component to guide users when API key is missing
- `LoadingSpinner.tsx`: Loading indicator component

### API
- `/api/chat/route.ts`: API route for OpenAI integration

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Set up your OpenAI API key:
   - Rename `.env.local.example` to `.env.local`
   - Replace `your_openai_api_key_here` with your actual OpenAI API key

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Future Enhancements

- User authentication
- Integration with a real insurance API
- Chatbot with memory and conversation history
- Admin dashboard for managing content
- Quote generation functionality