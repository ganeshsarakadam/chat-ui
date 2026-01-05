'use client';

import { useTheme } from './ThemeProvider';
import { MessageBubble } from './MessageBubble';
// InputArea is defined inline as ChatInput
import { useChat } from '@/hooks/useChat';
// Theme type not currently needed here
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function ChatContainer() {
  const { theme, isDarkMode, toggleDarkMode } = useTheme();
  const { messages, sendMessage, isLoading } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const hasMessages = messages.length > 0;

  return (
    <div
      className="flex flex-col h-screen"
      style={{ backgroundColor: 'var(--color-background)' }}
    >
      {/* Header - Always visible */}
      <header
        className="flex items-center justify-between px-4 py-3 z-10"
        style={{ borderBottom: hasMessages ? '1px solid var(--color-border)' : 'none' }}
      >
        {/* Left side - Title with icon space */}
        <div className="flex items-center gap-2">
          {/* Icon placeholder */}
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{
              background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
            }}
          >
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <h1
            className="text-sm font-medium"
            style={{ color: 'var(--color-text)' }}
          >
            Mahabharatam
          </h1>

          {/* Info icon with tooltip */}
          <div className="relative group">
            <button
              className="w-5 h-5 rounded-full flex items-center justify-center cursor-help transition-opacity hover:opacity-80"
              style={{
                backgroundColor: 'var(--color-border)',
                color: 'var(--color-text-muted)',
              }}
              aria-label="About this application"
            >
              <span className="text-xs font-medium">i</span>
            </button>

            {/* Tooltip */}
            <div
              className="absolute left-0 top-full mt-2 w-72 p-3 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              }}
            >
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Powered by the knowledge from <strong style={{ color: 'var(--color-text)' }}>The Mahabharata</strong> — Translated into English Prose from the Original Sanskrit Text by <strong style={{ color: 'var(--color-primary)' }}>Kisari Mohan Ganguli</strong>
              </p>
            </div>
          </div>
        </div>

        {/* Right side - Theme toggle & User */}
        <div className="flex items-center gap-1">
          {/* Theme toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
            style={{ color: 'var(--color-text)' }}
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>

          {/* User icon - Disabled with tooltip */}
          <div className="relative group">
            <button
              disabled
              className="p-2 rounded-lg transition-colors cursor-not-allowed opacity-50"
              style={{ color: 'var(--color-text)' }}
              aria-label="User menu"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>

            {/* Tooltip */}
            <div
              className="absolute right-0 top-full mt-2 px-3 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 whitespace-nowrap"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              }}
            >
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                Login feature coming soon
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AnimatePresence mode="wait">
          {!hasMessages ? (
            /* Welcome view - Centered */
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-1 flex flex-col items-center justify-center px-4"
            >
              <WelcomeMessage onSend={sendMessage} disabled={isLoading} />
            </motion.div>
          ) : (
            /* Chat view - Messages */
            <motion.div
              key="chat"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <ScrollArea.Root className="flex-1 overflow-hidden">
                <ScrollArea.Viewport className="w-full h-full" ref={scrollRef}>
                  <div className="max-w-3xl mx-auto px-4 py-6">
                    <div className="space-y-6">
                      {messages.map((msg, idx) => (
                        <MessageBubble
                          key={msg.id || idx}
                          message={msg}
                          avatar={msg.role === 'assistant'
                            ? theme.avatars.assistant
                            : theme.avatars.user
                          }
                          animationStyle={theme.animations.messageEntry}
                        />
                      ))}

                      {isLoading && <ThinkingIndicator />}
                    </div>
                  </div>
                </ScrollArea.Viewport>

                <ScrollArea.Scrollbar
                  className="flex select-none touch-none p-0.5 transition-opacity hover:opacity-100 opacity-50 data-[orientation=vertical]:w-2"
                  orientation="vertical"
                >
                  <ScrollArea.Thumb
                    className="flex-1 rounded-full"
                    style={{ background: 'var(--color-text-muted)' }}
                  />
                </ScrollArea.Scrollbar>
              </ScrollArea.Root>

              {/* Input area - Fixed at bottom when chatting */}
              <div className="border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="max-w-3xl mx-auto px-4 py-4">
                  <ChatInput onSend={sendMessage} disabled={isLoading} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* Welcome message component - ChatGPT style */
function WelcomeMessage({
  onSend,
  disabled
}: {
  // theme: Theme; - not currently used
  onSend: (msg: string, mode: 'quick' | 'detailed') => void;
  disabled: boolean;
}) {
  return (
    <div className="w-full max-w-2xl mx-auto text-center">
      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl md:text-4xl font-medium mb-8"
        style={{
          color: 'var(--color-text)',
          fontFamily: 'var(--font-heading)',
        }}
      >
        Learn <span style={{ color: 'var(--color-primary)' }}>Mahabharatam</span>
        <br />
        <span className="text-2xl md:text-3xl opacity-60">What questions do you have?</span>
      </motion.h1>

      {/* Centered input */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="w-full"
      >
        <ChatInput onSend={onSend} disabled={disabled} />
      </motion.div>

      {/* Quick suggestions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-6 flex flex-wrap justify-center gap-2"
      >
        {[
          "Who is Arjuna?",
          "Explain the Bhagavad Gita",
          "What is Dharma?",
          "Tell me about Krishna",
        ].map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSend(suggestion, 'quick')}
            disabled={disabled}
            className="px-4 py-2 text-sm transition-all hover:scale-105 cursor-pointer disabled:opacity-50"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-muted)',
              borderRadius: '20px',
            }}
          >
            {suggestion}
          </button>
        ))}
      </motion.div>
    </div>
  );
}

/* ChatGPT-style input component */
function ChatInput({
  onSend,
  disabled
}: {
  onSend: (msg: string, mode: 'quick' | 'detailed') => void;
  disabled: boolean;
}) {
  const [input, setInput] = React.useState('');
  const [mode, setMode] = React.useState<'quick' | 'detailed'>('quick');
  const [isFocused, setIsFocused] = React.useState(false);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  React.useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  }, [input]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim(), mode);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div
        className="flex items-center gap-3 px-4 py-3 transition-all"
        style={{
          backgroundColor: 'var(--color-surface)',
          border: isFocused ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
          borderRadius: '28px',
          boxShadow: isFocused ? '0 0 0 3px rgba(255, 107, 53, 0.15)' : 'none',
        }}
      >
        {/* Mode badges */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            type="button"
            onClick={() => setMode('quick')}
            className="px-2.5 py-1 text-xs font-medium transition-all cursor-pointer"
            style={{
              borderRadius: '12px',
              backgroundColor: mode === 'quick' ? 'var(--color-primary)' : 'transparent',
              color: mode === 'quick' ? 'white' : 'var(--color-text-muted)',
              border: mode === 'quick' ? 'none' : '1px solid var(--color-border)',
            }}
          >
            Quick
          </button>
          <button
            type="button"
            onClick={() => setMode('detailed')}
            className="px-2.5 py-1 text-xs font-medium transition-all cursor-pointer"
            style={{
              borderRadius: '12px',
              backgroundColor: mode === 'detailed' ? 'var(--color-primary)' : 'transparent',
              color: mode === 'detailed' ? 'white' : 'var(--color-text-muted)',
              border: mode === 'detailed' ? 'none' : '1px solid var(--color-border)',
            }}
          >
            Pro
          </button>
        </div>

        {/* Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask anything related to Mahabharatam"
          disabled={disabled}
          rows={1}
          className="flex-1 bg-transparent resize-none text-sm py-1"
          style={{
            color: 'var(--color-text)',
            minHeight: '24px',
            maxHeight: '200px',
            outline: 'none',
            border: 'none',
          }}
        />

        {/* Send button - only show when there's input */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {input.trim() && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              type="submit"
              disabled={disabled}
              className="p-2 rounded-full transition-colors cursor-pointer disabled:opacity-50"
              style={{
                backgroundColor: 'var(--color-text)',
                color: 'var(--color-background)',
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.button>
          )}
        </div>
      </div>
    </form>
  );
}

/* Thinking indicator */
function ThinkingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: 'var(--color-surface)' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-4 h-4 border-2 rounded-full"
          style={{
            borderColor: 'var(--color-border)',
            borderTopColor: 'var(--color-primary)',
          }}
        />
      </div>
      <div
        className="px-4 py-3 rounded-2xl rounded-tl-sm"
        style={{
          backgroundColor: 'var(--color-surface)',
        }}
      >
        <div className="flex items-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -4, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.1,
              }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: 'var(--color-text-muted)' }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Need to import React for the component-level state
import React from 'react';
