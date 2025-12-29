'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { MessageMode, ChatMessage } from '@/types/chat';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';
import { ModeSelector } from './ModeSelector';

export function ChatContainer() {
  const [mode, setMode] = useState<MessageMode>('quick');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
      createdAt: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: input.trim(),
          mode,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantMessage = '';

      if (reader) {
        const assistantId = (Date.now() + 1).toString();
        setMessages((prev) => [
          ...prev,
          {
            id: assistantId,
            role: 'assistant',
            content: '',
            createdAt: Date.now()
          },
        ]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          assistantMessage += chunk;

          // Update UI with each chunk for typewriter effect
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: assistantMessage } : msg
            )
          );
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: 'assistant',
          content: 'Sorry, there was an error processing your request.',
          createdAt: Date.now(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Mahabharata Knowledge Base
        </h1>
        <ModeSelector mode={mode} onModeChange={setMode} disabled={isLoading} />
      </div>

      {/* Messages */}
      <ChatMessages messages={messages} isLoading={isLoading} />

      {/* Input */}
      <ChatInput
        input={input}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        isLoading={isLoading}
      />
    </div>
  );
}
