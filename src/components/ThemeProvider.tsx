'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Theme } from '@/themes/types';
import { ThemeLoader } from '@/themes/loader';

interface ThemeContextValue {
  theme: Theme;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({
  domainId,
  children
}: {
  domainId: string;
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadTheme() {
      setIsLoading(true);
      try {
        const loadedTheme = await ThemeLoader.load(domainId);
        if (mounted) {
          setTheme(loadedTheme);
        }
      } catch (error) {
        console.error('Failed to load theme:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    loadTheme();

    return () => {
      mounted = false;
    };
  }, [domainId]);

  if (isLoading || !theme) {
    return <ThemeLoadingSkeleton />;
  }

  return (
    <ThemeContext.Provider value={{ theme, isLoading }}>
      <div
        className="min-h-screen transition-all duration-500 ease-in-out"
        style={{
          // CSS custom properties
          '--color-primary': theme.colors.primary,
          '--color-secondary': theme.colors.secondary,
          '--color-accent': theme.colors.accent,
          '--color-background': theme.colors.background,
          '--color-text': theme.colors.text,
          '--color-border': theme.colors.border,
          '--color-message-user': theme.colors.messageBg.user,
          '--color-message-assistant': theme.colors.messageBg.assistant,
          '--color-input-bg': theme.colors.inputBg,
          '--color-header-bg': theme.colors.headerBg,
          '--font-heading': theme.fonts.heading,
          '--font-body': theme.fonts.body,

          // Apply base styles
          fontFamily: theme.fonts.body,
          backgroundColor: theme.colors.background,
          color: theme.colors.text,
        } as React.CSSProperties}
      >
        {/* Background pattern */}
        {theme.patterns.background && (
          <div
            className="fixed inset-0 pointer-events-none"
            style={{
              backgroundImage: `url(${theme.patterns.background})`,
              backgroundRepeat: 'repeat',
              backgroundSize: '400px',
              opacity: theme.patterns.opacity || 0.05,
              zIndex: 0,
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context.theme;
}

function ThemeLoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="relative w-16 h-16 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-slate-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-slate-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        <p className="text-slate-600 text-lg font-medium">Loading experience...</p>
      </div>
    </div>
  );
}
