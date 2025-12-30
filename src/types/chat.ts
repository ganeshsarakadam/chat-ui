export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: Date;
}

export interface ChatResponse {
  answer: string;
  sources?: Array<{
    content: string;
    metadata?: Record<string, any>;
  }>;
}
