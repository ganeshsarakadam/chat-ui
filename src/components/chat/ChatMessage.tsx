'use client';

import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { parseSources } from '@/lib/parseSources';
import { SourceCitation } from './SourceCitation';
import { User, Bot } from 'lucide-react';
import { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const { content, sources } = useMemo(() => {
    if (message.role === 'assistant') {
      return parseSources(message.content);
    }
    return { content: message.content, sources: [] };
  }, [message.content, message.role]);

  const isUser = message.role === 'user';

  return (
    <div
      className={cn(
        'flex gap-3 p-4 rounded-lg',
        isUser ? 'bg-blue-50 dark:bg-blue-900/20' : 'bg-gray-50 dark:bg-gray-800/50'
      )}
    >
      <div
        className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-purple-600 text-white'
        )}
      >
        {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
            {isUser ? 'You' : 'Mahabharata Assistant'}
          </span>
        </div>

        <div className="prose prose-sm dark:prose-invert max-w-none">
          {isUser ? (
            <p className="text-gray-800 dark:text-gray-200">{content}</p>
          ) : (
            <ReactMarkdown>{content}</ReactMarkdown>
          )}
        </div>

        {!isUser && sources.length > 0 && <SourceCitation sources={sources} />}
      </div>
    </div>
  );
}
