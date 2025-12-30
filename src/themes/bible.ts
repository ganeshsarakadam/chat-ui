import { Theme } from './types';

export const bibleTheme: Theme = {
  id: 'bible',
  name: 'Holy Bible',
  description: 'Sacred Christian scriptures of faith and redemption',
  colors: {
    primary: '#4A90E2',      // Heavenly blue
    secondary: '#8B4513',    // Saddle brown
    accent: '#FFD700',       // Gold
    background: '#F5F5DC',   // Beige
    text: '#2F4F4F',         // Dark slate gray
    border: '#DAA520',       // Goldenrod
    messageBg: {
      user: '#E6F2FF',
      assistant: '#FFFFFF',
    },
    inputBg: '#FFFFFF',
    headerBg: '#4A90E2',
  },
  fonts: {
    heading: '"Crimson Text", serif',
    body: '"EB Garamond", serif',
    code: '"Courier Prime", monospace',
  },
  avatars: {
    assistant: '/avatars/bible/angel.png',
    user: '/avatars/bible/pilgrim.png',
  },
  patterns: {
    background: '/patterns/bible/cross-subtle.svg',
    decoration: '/patterns/bible/vine-border.svg',
    opacity: 0.04,
  },
  animations: {
    messageEntry: 'gracefulFade',
    thinking: 'candleFlicker',
  },
  metadata: {
    culture: 'Christian',
    primaryLanguage: 'Hebrew/Greek',
    region: 'Mediterranean',
  },
};
