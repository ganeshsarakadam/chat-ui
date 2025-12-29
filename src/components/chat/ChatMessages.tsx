'use client';

import { useAutoScroll } from '@/hooks/useAutoScroll';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { ChatMessage } from './ChatMessage';
import { ChatMessage as ChatMessageType } from '@/types/chat';

interface ChatMessagesProps {
  messages: ChatMessageType[];
  isLoading?: boolean;
}

export function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  const scrollRef = useAutoScroll(messages.length);

  return (
    <ScrollArea className="flex-1 h-full">
      <div ref={scrollRef} className="space-y-4 p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-center min-h-[400px]">
            <div className="max-w-md">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Ask about the Mahabharata
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Start a conversation to learn about the epic tale. Choose Quick mode for
                faster responses or Pro mode for more detailed answers.
              </p>
            </div>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))
        )}

        {isLoading && (
          <div className="flex gap-3 p-4 rounded-lg bg-gray-50 dark:bg-gray-800/50">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
            <div className="flex-1">
              <p className="text-gray-600 dark:text-gray-400">Thinking...</p>
            </div>
          </div>
        )}
      </div>
    </ScrollArea>
  );
}
