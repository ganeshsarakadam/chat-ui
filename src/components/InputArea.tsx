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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowModeDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="relative z-20 glass-strong"
      style={{
        borderTop: '1px solid var(--color-border)',
      }}
    >
      <div className="max-w-4xl mx-auto px-6 py-4">
        <form onSubmit={handleSubmit}>
          <div className="relative">
            {/* Input container - Sleek Modern Design */}
            <motion.div
              className="flex items-end gap-2 p-2 rounded-2xl transition-all duration-200"
              style={{
                backgroundColor: 'var(--color-surface)',
                border: `1px solid ${isFocused ? 'var(--color-primary)' : 'var(--color-border)'}`,
                boxShadow: isFocused
                  ? '0 0 0 3px rgba(99, 102, 241, 0.1), var(--shadow-md)'
                  : 'var(--shadow-sm)',
              }}
            >
              {/* Mode Selector - Pill style */}
              <div className="relative flex-shrink-0" ref={dropdownRef}>
                <motion.button
                  type="button"
                  onClick={() => setShowModeDropdown(!showModeDropdown)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl font-medium text-xs transition-all cursor-pointer"
                  style={{
                    backgroundColor: 'var(--color-border-subtle)',
                    color: 'var(--color-text)',
                  }}
                >
                  <span className="capitalize">{mode}</span>
                  <motion.svg
                    animate={{ rotate: showModeDropdown ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-3 h-3 opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </motion.button>

                {/* Dropdown - Sleek floating panel */}
                <AnimatePresence>
                  {showModeDropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 5, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 5, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute bottom-full mb-2 left-0 rounded-xl overflow-hidden z-50 glass-strong shadow-sleek-lg"
                      style={{
                        minWidth: '120px',
                      }}
                    >
                      {(['quick', 'detailed'] as const).map((modeOption) => (
                        <motion.button
                          key={modeOption}
                          type="button"
                          onClick={() => {
                            setMode(modeOption);
                            setShowModeDropdown(false);
                          }}
                          whileHover={{ backgroundColor: 'var(--color-border-subtle)' }}
                          className={`w-full px-4 py-2.5 text-left text-xs font-medium transition-all capitalize cursor-pointer flex items-center gap-2`}
                          style={{
                            color: 'var(--color-text)',
                            backgroundColor: mode === modeOption ? 'var(--color-border-subtle)' : 'transparent',
                          }}
                        >
                          {mode === modeOption && (
                            <motion.div
                              layoutId="activeMode"
                              className="w-1 h-1 rounded-full"
                              style={{ backgroundColor: 'var(--color-primary)' }}
                            />
                          )}
                          <span>{modeOption}</span>
                          <span className="ml-auto text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                            {modeOption === 'quick' ? '⚡' : '📝'}
                          </span>
                        </motion.button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Textarea - Clean and minimal */}
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
                className="flex-1 px-3 py-2.5 bg-transparent resize-none outline-none text-sm leading-relaxed"
                style={{
                  color: 'var(--color-text)',
                  minHeight: '44px',
                  maxHeight: '120px',
                }}
              />

              {/* Send button - Gradient pill */}
              <motion.button
                type="submit"
                disabled={disabled || !input.trim()}
                whileHover={{ scale: disabled || !input.trim() ? 1 : 1.02 }}
                whileTap={{ scale: disabled || !input.trim() ? 1 : 0.98 }}
                className="relative flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl font-medium text-white text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                style={{
                  background: disabled || !input.trim()
                    ? 'var(--color-border)'
                    : 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                  boxShadow: disabled || !input.trim()
                    ? 'none'
                    : '0 2px 8px rgba(99, 102, 241, 0.25)',
                }}
              >
                {disabled ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                      className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full"
                    />
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>

          {/* Helper text - Subtle and minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-between mt-2 px-1"
          >
            <span className="text-[11px]" style={{ color: 'var(--color-text-muted)', opacity: 0.6 }}>
              Press <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: 'var(--color-border-subtle)' }}>Enter</kbd> to send · <kbd className="px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: 'var(--color-border-subtle)' }}>Shift+Enter</kbd> for new line
            </span>
            {input.length > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                className="text-[10px] tabular-nums"
                style={{ color: 'var(--color-text-muted)' }}
              >
                {input.length}
              </motion.span>
            )}
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
