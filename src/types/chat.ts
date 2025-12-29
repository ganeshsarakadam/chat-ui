export type MessageMode = 'quick' | 'detailed';

export interface SourceCitation {
  id: string;
  location: string;
  confidence: number;
  url?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: SourceCitation[];
  mode?: MessageMode;
  createdAt: number;
}

export interface ChatHistory {
  messages: ChatMessage[];
  lastUpdated: number;
}
