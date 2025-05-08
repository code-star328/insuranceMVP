# Insurance MVP Website

A simple and modern insurance website MVP built with Next.js, featuring an OpenAI-powered chatbot assistant to help users navigate insurance products.

## Features

- **Home Page**: Featuring a tagline, CTA buttons, and feature highlights
- **Products Page**: Simple cards for different insurance types (Auto, Home, Life, etc.)
- **Chatbot**: OpenAI-powered assistant to help users with insurance questions

## Tech Stack

- **Next.js**: React framework for building the frontend
- **TypeScript**: For type safety
- **Tailwind CSS**: For styling
- **OpenAI API**: For the intelligent chatbot functionality

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- OpenAI API key

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set up your OpenAI API key:
   - Rename `.env.local.example` to `.env.local`
   - Replace `your_openai_api_key_here` with your actual OpenAI API key

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `src/app/`: Next.js App Router pages
- `src/components/`: Reusable React components
- `src/app/api/`: API routes for backend functionality

## OpenAI Chatbot Implementation

The chatbot uses the OpenAI API to generate intelligent responses to user queries about insurance products. The implementation includes:

1. A frontend component (`src/components/ChatBot.tsx`) that handles the chat UI and user interactions
2. A backend API route (`src/app/api/chat/route.ts`) that communicates with the OpenAI API
3. System prompts to guide the AI to provide helpful insurance-related information

To customize the chatbot behavior:
- Modify the system prompt in `src/app/api/chat/route.ts`
- Adjust the model parameters (temperature, max_tokens, etc.) for different response styles
- Add more context about your specific insurance offerings for more accurate responses

## Customization

- Update colors in `tailwind.config.js`
- Modify insurance products in `src/app/products/page.tsx`
- Customize the OpenAI system prompt in `src/app/api/chat/route.ts`

## Future Enhancements

- User authentication
- Integration with a real insurance API
- Chatbot with memory and conversation history
- Admin dashboard for managing content
- Quote generation functionality