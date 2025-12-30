'use client';

import { useTheme } from './ThemeProvider';
import { MessageBubble } from './MessageBubble';
import { InputArea } from './InputArea';
import { useChat } from '@/hooks/useChat';
import { Theme } from '@/themes/types';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export function ChatContainer() {
  const theme = useTheme();
  const { messages, sendMessage, isLoading } = useChat();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-screen relative">
      {/* Animated background gradient */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none"
        style={{
          background: `linear-gradient(135deg, ${theme.colors.primary}10 0%, ${theme.colors.secondary}10 100%)`,
        }}
      />

      {/* Modern Header with glassmorphism */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative backdrop-blur-xl border-b shadow-lg z-10"
        style={{
          backgroundColor: `${theme.colors.primary}f0`,
          borderColor: `${theme.colors.primary}40`,
          boxShadow: `0 4px 24px ${theme.colors.primary}20`,
        }}
      >
        <div className="max-w-5xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Animated icon */}
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.accent})`,
                }}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </motion.div>

              <div>
                <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg"
                  style={{ fontFamily: 'var(--font-heading)' }}
                >
                  {theme.name}
                </motion.h1>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-white/90 text-sm mt-1"
                >
                  {theme.description}
                </motion.p>
              </div>
            </div>

            {/* Status indicator */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-400"
              />
              <span className="text-white text-xs font-medium">Online</span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Messages area with Radix ScrollArea */}
      <ScrollArea.Root className="flex-1 overflow-hidden relative z-0">
        <ScrollArea.Viewport className="w-full h-full" ref={scrollRef}>
          <div className="max-w-5xl mx-auto px-6 py-8">
            {messages.length === 0 && <WelcomeMessage theme={theme} />}

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

              {isLoading && <ThinkingIndicator theme={theme} />}
            </div>
          </div>
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex select-none touch-none p-0.5 transition-colors duration-300 ease-out hover:bg-gray-100/20 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
          orientation="vertical"
        >
          <ScrollArea.Thumb
            className="flex-1 rounded-full relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]"
            style={{ backgroundColor: theme.colors.primary }}
          />
        </ScrollArea.Scrollbar>

        <ScrollArea.Corner />
      </ScrollArea.Root>

      {/* Input area */}
      <InputArea
        onSend={sendMessage}
        disabled={isLoading}
        placeholder={`Ask about ${theme.name}...`}
      />
    </div>
  );
}

function WelcomeMessage({ theme }: { theme: Theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="text-center py-20 px-4"
    >
      {/* Animated icon with pulse effect */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="relative w-24 h-24 mx-auto mb-8"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: theme.colors.primary }}
        />
        <div
          className="relative w-full h-full rounded-3xl flex items-center justify-center shadow-2xl"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
          }}
        >
          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent"
        style={{
          fontFamily: 'var(--font-heading)',
          backgroundImage: `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.secondary})`,
        }}
      >
        Welcome to {theme.name}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-lg md:text-xl mb-10 opacity-80 max-w-2xl mx-auto"
      >
        {theme.description}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="max-w-md mx-auto grid grid-cols-3 gap-4 mb-10"
      >
        {[
          { label: 'Culture', value: theme.metadata.culture },
          { label: 'Language', value: theme.metadata.primaryLanguage },
          { label: 'Region', value: theme.metadata.region },
        ].map((item, idx) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + idx * 0.1 }}
            className="p-4 rounded-2xl backdrop-blur-sm border"
            style={{
              backgroundColor: `${theme.colors.primary}10`,
              borderColor: `${theme.colors.primary}30`,
            }}
          >
            <p className="text-xs opacity-60 mb-1">{item.label}</p>
            <p className="font-semibold text-sm">{item.value}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="text-sm opacity-60 flex items-center justify-center gap-2"
      >
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          ✨
        </motion.span>
        Ask me anything about {theme.name}
        <motion.span
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, delay: 1 }}
        >
          ✨
        </motion.span>
      </motion.p>
    </motion.div>
  );
}

function ThinkingIndicator({ theme }: { theme: Theme }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-start gap-3"
    >
      {/* Avatar placeholder */}
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${theme.colors.primary}20` }}
      >
        <svg className="w-5 h-5" style={{ color: theme.colors.primary }} fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      </div>

      {/* Thinking animation */}
      <div
        className="px-6 py-4 rounded-3xl rounded-tl-sm backdrop-blur-sm border shadow-lg"
        style={{
          backgroundColor: `${theme.colors.messageBg.assistant}f0`,
          borderColor: `${theme.colors.primary}20`,
        }}
      >
        <div className="flex items-center gap-2">
          <motion.div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -8, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.15,
                  ease: 'easeInOut',
                }}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: theme.colors.primary }}
              />
            ))}
          </motion.div>
          <span className="text-sm ml-2" style={{ color: theme.colors.text }}>
            Thinking...
          </span>
        </div>
      </div>
    </motion.div>
  );
}
