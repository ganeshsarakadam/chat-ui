'use client';

import { MessageMode } from '@/types/chat';
import { cn } from '@/lib/utils';
import { Zap, Sparkles } from 'lucide-react';

interface ModeSelectorProps {
  mode: MessageMode;
  onModeChange: (mode: MessageMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ mode, onModeChange, disabled }: ModeSelectorProps) {
  return (
    <div className="flex items-center gap-2 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      <button
        onClick={() => onModeChange('quick')}
        disabled={disabled}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          mode === 'quick'
            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Zap className="w-4 h-4" />
        Quick
      </button>
      <button
        onClick={() => onModeChange('detailed')}
        disabled={disabled}
        className={cn(
          'flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
          mode === 'detailed'
            ? 'bg-white dark:bg-gray-700 shadow-sm text-gray-900 dark:text-gray-100'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100',
          disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <Sparkles className="w-4 h-4" />
        Pro
      </button>
    </div>
  );
}
