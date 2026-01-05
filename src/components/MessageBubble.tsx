'use client';

import { motion } from 'framer-motion';
import { Avatar } from './Avatar';
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function MessageBubble({ message, avatar, animationStyle }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* Avatar - Only show for assistant */}
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar src={avatar} alt={message.role} />
        </div>
      )}

      {/* Message Content */}
      <div className={`max-w-[80%] ${isUser ? 'text-right' : 'text-left'}`}>
        <div
          className="inline-block px-4 py-3"
          style={{
            backgroundColor: isUser ? 'var(--color-surface)' : 'transparent',
            color: 'var(--color-text)',
            borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
          }}
        >
          <div className="text-sm leading-relaxed prose prose-sm max-w-none prose-invert">
            <ReactMarkdown
              components={{
                strong: ({ children }) => (
                  <strong className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                    {children}
                  </strong>
                ),
                em: ({ children }) => (
                  <em className="italic opacity-90">{children}</em>
                ),
                a: ({ href, children }) => (
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:opacity-70"
                    style={{ color: 'var(--color-primary)' }}
                  >
                    {children}
                  </a>
                ),
                p: ({ children }) => (
                  <p className="mb-3 last:mb-0">{children}</p>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-4 mb-3 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside ml-4 mb-3 space-y-1">{children}</ol>
                ),
                li: ({ children }) => (
                  <li>{children}</li>
                ),
                code: ({ children, className }) => {
                  const isInline = !className;
                  return isInline ? (
                    <code
                      className="px-1.5 py-0.5 rounded text-[13px] font-mono"
                      style={{
                        backgroundColor: 'rgba(255,255,255,0.1)',
                      }}
                    >
                      {children}
                    </code>
                  ) : (
                    <code
                      className="block p-4 rounded-xl text-[13px] font-mono overflow-x-auto my-3"
                      style={{
                        backgroundColor: '#1e1e1e',
                      }}
                    >
                      {children}
                    </code>
                  );
                },
                h1: ({ children }) => (
                  <h1 className="text-lg font-semibold mb-2 mt-4 first:mt-0">{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-semibold mb-2 mt-3 first:mt-0">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-sm font-semibold mb-2 mt-2 first:mt-0">{children}</h3>
                ),
                hr: () => (
                  <hr className="my-4 border-0 h-px" style={{ backgroundColor: 'var(--color-border)' }} />
                ),
                blockquote: ({ children }) => (
                  <blockquote
                    className="pl-4 my-3 italic border-l-2"
                    style={{
                      borderColor: 'var(--color-primary)',
                      color: 'var(--color-text-muted)',
                    }}
                  >
                    {children}
                  </blockquote>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
