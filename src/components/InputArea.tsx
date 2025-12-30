'use client';

import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type MessageMode = 'quick' | 'detailed';

interface InputAreaProps {
  onSend: (message: string, mode: MessageMode) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function InputArea({ onSend, disabled, placeholder = 'Type your message...' }: InputAreaProps) {
  const [input, setInput] = useState('');
  const [mode, setMode] = useState<MessageMode>('quick');
  const [isFocused, setIsFocused] = useState(false);
  const [showModeDropdown, setShowModeDropdown] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim(), mode);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="relative backdrop-blur-xl border-t z-20"
      style={{
        backgroundColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-background')}f0`,
        borderColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-border')}40`,
      }}
    >
      {/* Gradient glow on focus */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 -top-20 pointer-events-none"
            style={{
              background: `linear-gradient(to top, ${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}10, transparent)`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-6 py-6">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            {/* Input container with glassmorphism */}
            <motion.div
              animate={{
                boxShadow: isFocused
                  ? `0 0 0 3px ${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}40`
                  : '0 4px 20px rgba(0, 0, 0, 0.05)',
              }}
              className="flex gap-3 p-3 rounded-3xl backdrop-blur-lg border transition-all duration-300"
              style={{
                backgroundColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-input-bg')}f0`,
                borderColor: isFocused
                  ? `${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}60`
                  : `${getComputedStyle(document.documentElement).getPropertyValue('--color-border')}40`,
              }}
            >
              {/* Mode Selector */}
              <div className="relative flex items-center">
                <button
                  type="button"
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl font-medium text-sm transition-all hover:opacity-80 border"
                  style={{
                    backgroundColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}20`,
                    borderColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}40`,
                    color: 'var(--color-text)',
                  }}
                >
                  <span className="capitalize">{mode}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown */}
                <AnimatePresence>
                  {showModeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute bottom-full mb-2 left-0 rounded-xl border shadow-lg overflow-hidden z-50"
                      style={{
                        backgroundColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-input-bg')}f0`,
                        borderColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-border')}40`,
                      }}
                    >
                      {(['quick', 'detailed'] as const).map((modeOption) => (
                        <button
                          key={modeOption}
                          type="button"
                          onClick={() => {
                            setMode(modeOption);
                            setShowModeDropdown(false);
                          }}
                          className="w-full px-4 py-2 text-left text-sm hover:opacity-80 transition-all capitalize"
                          style={{
                            backgroundColor: mode === modeOption
                              ? `${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}20`
                              : 'transparent',
                            color: 'var(--color-text)',
                          }}
                        >
                          {modeOption}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Textarea */}
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                disabled={disabled}
                rows={1}
                className="flex-1 px-4 py-3 bg-transparent resize-none outline-none placeholder-opacity-50 transition-all"
                style={{
                  color: 'var(--color-text)',
                  minHeight: '48px',
                  maxHeight: '120px',
                }}
              />

              {/* Send button with animations */}
              <motion.button
                type="submit"
                disabled={disabled || !input.trim()}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-6 py-3 rounded-2xl font-medium text-white shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer overflow-hidden"
                style={{
                  background: disabled || !input.trim()
                    ? `${getComputedStyle(document.documentElement).getPropertyValue('--color-border')}`
                    : `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}, ${getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')})`,
                }}
              >
                {/* Shimmer effect on hover */}
                {!disabled && input.trim() && (
                  <motion.div
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  />
                )}

                <span className="relative flex items-center gap-2">
                  {disabled ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </>
                  )}
                </span>
              </motion.button>
            </motion.div>
          </div>

          {/* Helper text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isFocused ? 1 : 0.5 }}
            className="flex items-center justify-between mt-3 px-4 text-xs transition-opacity"
            style={{ color: 'var(--color-text)' }}
          >
            <span>Press Enter to send, Shift+Enter for new line</span>
            <span className="opacity-60">{input.length} characters</span>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
