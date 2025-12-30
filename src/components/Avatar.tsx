'use client';

import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { motion } from 'framer-motion';

export function Avatar({ src, alt }: { src: string; alt: string }) {
  return (
    <AvatarPrimitive.Root className="relative inline-flex h-10 w-10 flex-shrink-0 cursor-pointer">
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="relative h-full w-full cursor-pointer"
      >
        {/* Gradient border */}
        <div
          className="absolute inset-0 rounded-full p-[2px]"
          style={{
            background: `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}, ${getComputedStyle(document.documentElement).getPropertyValue('--color-secondary')})`,
          }}
        >
          <div className="h-full w-full rounded-full bg-white" />
        </div>

        {/* Avatar content */}
        <div className="absolute inset-[2px] overflow-hidden rounded-full">
          <AvatarPrimitive.Image
            className="h-full w-full object-cover"
            src={src}
            alt={alt}
          />
          <AvatarPrimitive.Fallback
            className="flex h-full w-full items-center justify-center text-white font-semibold text-sm shadow-inner"
            style={{
              background: `linear-gradient(135deg, ${getComputedStyle(document.documentElement).getPropertyValue('--color-primary')}, ${getComputedStyle(document.documentElement).getPropertyValue('--color-accent')})`,
            }}
            delayMs={600}
          >
            {alt.charAt(0).toUpperCase()}
          </AvatarPrimitive.Fallback>
        </div>

        {/* Online indicator (optional) */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white"
          style={{
            backgroundColor: '#10b981',
            boxShadow: '0 0 0 2px rgba(16, 185, 129, 0.3)',
          }}
        />
      </motion.div>
    </AvatarPrimitive.Root>
  );
}
