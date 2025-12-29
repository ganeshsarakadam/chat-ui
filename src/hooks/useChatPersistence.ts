import { useEffect } from 'react';
import { ChatMessage } from '@/types/chat';

const STORAGE_KEY = 'mahabharata-chat-history';
const MAX_MESSAGES = 100; // Limit to prevent localStorage quota issues

export function useChatPersistence(messages: ChatMessage[]) {
  // Save to localStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      // Keep only last 100 messages to prevent quota issues
      const trimmed = messages.slice(-MAX_MESSAGES);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
    }
  }, [messages]);

  // Load from localStorage on mount
  const loadMessages = (): ChatMessage[] => {
    // Only run in browser environment
    if (typeof window === 'undefined') {
      return [];
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
    return [];
  };

  const clearHistory = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return { loadMessages, clearHistory };
}
