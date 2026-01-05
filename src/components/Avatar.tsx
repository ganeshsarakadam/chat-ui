'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';

export function Avatar({ src, alt }: { src: string; alt: string }) {
  const isAssistant = alt === 'assistant';

  return (
    <AvatarPrimitive.Root className="relative inline-flex h-8 w-8 flex-shrink-0">
      <div className="relative h-full w-full overflow-hidden rounded-full">
        <AvatarPrimitive.Image
          className="h-full w-full object-cover"
          src={src}
          alt={alt}
        />
        <AvatarPrimitive.Fallback
          className="flex h-full w-full items-center justify-center text-xs font-medium"
          style={{
            backgroundColor: isAssistant ? 'var(--color-primary)' : 'var(--color-surface)',
            color: isAssistant ? 'white' : 'var(--color-text)',
            border: isAssistant ? 'none' : '1px solid var(--color-border)',
          }}
          delayMs={0}
        >
          {isAssistant ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          ) : (
            alt.charAt(0).toUpperCase()
          )}
        </AvatarPrimitive.Fallback>
      </div>
    </AvatarPrimitive.Root>
  );
}
