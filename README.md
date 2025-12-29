# Chat UI - AI-Powered Knowledge Service Frontend

A generic, modern chat interface frontend that connects to Next.js-based Knowledge Services powered by AI. This application provides a ChatGPT-like experience with real-time streaming responses, making it easy to interact with AI-powered knowledge bases.

## Overview

This Chat UI serves as a universal frontend for AI knowledge services, featuring:
- Real-time streaming responses with typewriter effect
- Clean, modern interface with dark mode support
- Message persistence using localStorage
- Dual response modes (Quick & Detailed)
- Source citation display for retrieved information
- Markdown rendering for rich content

## Tech Stack

### Frontend Framework
- **Next.js 16.1.1** - React framework with App Router
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety

### Styling
- **Tailwind CSS 4** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library
- **class-variance-authority** - CSS variant management

### UI Components
- **react-markdown** - Markdown rendering
- **Radix UI Scroll Area** - Custom scrollable areas
- **Custom components** - Button, chat components

### State Management
- React Hooks (useState, useEffect, useCallback)
- Custom hooks for chat persistence and auto-scroll

## Architecture

```
Browser → Next.js /api/chat → Knowledge Service /api/ask
                              (AI-Powered Backend)
```

The application acts as a **proxy layer** between the browser and your knowledge service:
- Receives user queries from the chat interface
- Forwards requests to the knowledge service backend
- Streams AI-generated responses back to the user
- Provides a seamless ChatGPT-like experience

## Getting Started

### Prerequisites
- Node.js 20+ installed
- A running knowledge service backend (e.g., RAG service)

### Installation

1. **Clone the repository**
   ```bash
   cd chat-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env.local` file in the root directory:
   ```env
   # Knowledge Service URL (your backend API)
   KNOWLEDGE_SERVICE_URL=https://your-knowledge-service.com

   # Optional: App URL
   NEXT_PUBLIC_APP_URL=http://localhost:3001
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build optimized production bundle |
| `npm start` | Run production server |
| `npm run lint` | Run ESLint for code quality |

## Features

### 💬 Chat Interface
- Real-time message streaming with typewriter effect
- Support for user and assistant messages
- Markdown rendering for rich content formatting
- Auto-scroll to latest messages

### ⚙️ Response Modes
- **Quick Mode**: Faster responses using lightweight AI models
- **Detailed Mode (Pro)**: Comprehensive answers with deeper analysis

### 💾 Persistence
- Automatic message history storage in localStorage
- Conversation continuity across sessions
- Clear history option

### 🎨 UI/UX
- Clean, modern design
- Dark mode support
- Responsive layout
- Loading states and error handling
- Source citations for AI responses

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `KNOWLEDGE_SERVICE_URL` | Yes | Backend API endpoint (server-side only) |
| `NEXT_PUBLIC_APP_URL` | No | Public app URL for client-side usage |

## Project Structure

```
chat-ui/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/
│   │   │       └── route.ts          # API proxy to knowledge service
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Landing page
│   │   └── globals.css               # Global styles
│   ├── components/
│   │   ├── chat/
│   │   │   ├── ChatContainer.tsx     # Main chat component
│   │   │   ├── ChatMessages.tsx      # Message list
│   │   │   ├── ChatMessage.tsx       # Individual message
│   │   │   ├── ChatInput.tsx         # Message input
│   │   │   ├── ModeSelector.tsx      # Quick/Pro toggle
│   │   │   └── SourceCitation.tsx    # Source display
│   │   └── ui/
│   │       ├── Button.tsx            # Button component
│   │       └── ScrollArea.tsx        # Scroll component
│   ├── hooks/
│   │   ├── useChatPersistence.ts     # localStorage sync
│   │   └── useAutoScroll.ts          # Auto-scroll behavior
│   ├── lib/
│   │   ├── utils.ts                  # Utility functions
│   │   └── parseSources.ts           # Source parsing
│   └── types/
│       └── chat.ts                   # TypeScript types
├── .env.local                        # Environment variables
├── package.json
├── tsconfig.json
└── tailwind.config.ts
```

## Integration with Knowledge Services

This Chat UI is designed to work with any AI-powered knowledge service that:
1. Accepts POST requests with `{ question: string, mode: string }`
2. Returns streaming text responses
3. Optionally includes source citations in the response

### API Contract

**Request to `/api/chat`:**
```json
{
  "question": "Your question here",
  "mode": "quick" | "detailed"
}
```

**Response:**
- Streaming text with `Content-Type: text/plain; charset=utf-8`
- Optional source citations formatted as:
  ```
  Sources:
  - Location: Chapter X, Verse Y (Score: 0.95)
  ```

## Customization

### Changing the Theme
Edit `src/app/globals.css` and Tailwind configuration in `tailwind.config.ts`

### Modifying Response Modes
Update `src/types/chat.ts` to add/remove modes:
```typescript
export type MessageMode = 'quick' | 'detailed' | 'expert';
```

### Adjusting Message Persistence
Configure storage limits in `src/hooks/useChatPersistence.ts`

## Troubleshooting

### CORS Issues
The proxy pattern avoids CORS by making server-to-server requests. If you encounter CORS errors, ensure you're calling `/api/chat` (not the knowledge service directly).

### Streaming Not Working
Verify your knowledge service supports HTTP streaming responses with proper headers.

### Build Errors
Run `npm run build` to check for TypeScript errors. Ensure all environment variables are set correctly.

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
