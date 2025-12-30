'use client';

import { motion } from 'framer-motion';
import { Avatar } from './Avatar';
import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
}

interface MessageBubbleProps {
  message: Message;
  avatar: string;
  animationStyle: string;
}

export function MessageBubble({ message, avatar, animationStyle }: MessageBubbleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const isUser = message.role === 'user';

  const animations = {
    fadeSlideUp: {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
    },
    gracefulFade: {
      initial: { opacity: 0, scale: 0.9, filter: 'blur(4px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      transition: { duration: 0.6, ease: 'easeOut' },
    },
    reverentSlide: {
      initial: { opacity: 0, x: isUser ? 40 : -40, scale: 0.9 },
      animate: { opacity: 1, x: 0, scale: 1 },
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  const animation = animations[animationStyle as keyof typeof animations] || animations.fadeSlideUp;

  return (
    <motion.div
      className={`flex gap-3 items-end ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
      {...animation}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Animated Avatar */}
      <motion.div
        animate={{
          scale: isHovered ? 1.1 : 1,
          rotate: isHovered ? (isUser ? -5 : 5) : 0,
        }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <Avatar src={avatar} alt={message.role} />
      </motion.div>

      {/* Message Content with Glassmorphism */}
      <div className={`relative group max-w-[75%] md:max-w-[65%]`}>
        {/* Glow effect on hover */}
        <motion.div
          className={`absolute inset-0 rounded-3xl blur-xl ${isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'}`}
          style={{
            backgroundColor: isUser ? 'var(--color-primary)' : 'var(--color-accent)',
          }}
          animate={{
            opacity: isHovered ? 0.3 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Message bubble */}
        <div
          className={`relative px-6 py-4 rounded-3xl backdrop-blur-lg border shadow-lg transition-all duration-300 ${
            isUser ? 'rounded-tr-sm' : 'rounded-tl-sm'
          }`}
          style={{
            backgroundColor: isUser
              ? `${getComputedStyle(document.documentElement).getPropertyValue('--color-message-user')}f0`
              : `${getComputedStyle(document.documentElement).getPropertyValue('--color-message-assistant')}f0`,
            borderColor: isUser
              ? `${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}40`
              : `${getComputedStyle(document.documentElement).getPropertyValue('--color-border')}60`,
            color: 'var(--color-text)',
          }}
        >
          <div className="text-sm md:text-base leading-relaxed break-words prose prose-sm md:prose-base max-w-none">
            <ReactMarkdown
              components={{
                // Style bold text
                strong: ({ children }) => (
                  <strong className="font-bold" style={{ color: 'var(--color-primary)' }}>
                    {children}
                  </strong>
                ),
                // Style italic text
                em: ({ children }) => (
                  <em className="italic opacity-90">{children}</em>
                ),
                // Style links
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-70 transition-opacity"
                    style={{ color: 'var(--color-accent)' }}
                  >
                    {children}
                  </a>
                ),
                // Style paragraphs
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0">{children}</p>
                ),
                // Style lists
                ul: ({ children }) => (
                  <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>
                ),
                // Style list items
                li: ({ children }) => (
                  <li className="ml-2">{children}</li>
                ),
                // Style code blocks
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code
                      className="px-1.5 py-0.5 rounded text-xs font-mono"
                      style={{
                        backgroundColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-border')}40`,
                      }}
                    >
                      {children}
                    </code>
                  ) : (
                    <code
                      className="block p-3 rounded-lg text-xs font-mono overflow-x-auto"
                      style={{
                        backgroundColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-border')}60`,
                      }}
                    >
                      {children}
                    </code>
                  );
                },
                // Style headings
                h1: ({ children }) => (
                  <h1 className="text-xl font-bold mb-2 mt-4 first:mt-0">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-lg font-bold mb-2 mt-3 first:mt-0">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-base font-bold mb-2 mt-2 first:mt-0">{children}</h3>
                ),
                // Style horizontal rules
                hr: () => (
                  <hr
                    className="my-4 border-0 h-px"
                    style={{
                      backgroundColor: `${getComputedStyle(document.documentElement).getPropertyValue('--color-border')}60`,
                    }}
                  />
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>

          {/* Timestamp (optional - can be added later) */}
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: isHovered ? 0.5 : 0, y: 0 }}
            className="text-xs mt-2 opacity-0 group-hover:opacity-50 transition-opacity"
          >
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </motion.div>
        </div>

        {/* Message tail */}
        <div
          className={`absolute ${isUser ? 'right-0 -mr-1' : 'left-0 -ml-1'} top-0 w-4 h-4`}
          style={{
            backgroundColor: isUser
              ? `${getComputedStyle(document.documentElement).getPropertyValue('--color-message-user')}f0`
              : `${getComputedStyle(document.documentElement).getPropertyValue('--color-message-assistant')}f0`,
            clipPath: isUser
              ? 'polygon(100% 0, 0 0, 100% 100%)'
              : 'polygon(0 0, 100% 0, 0 100%)',
          }}
        />
      </div>
    </motion.div>
  );
}
