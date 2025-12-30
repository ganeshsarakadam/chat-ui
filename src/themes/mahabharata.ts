import { Theme } from './types';

export const mahabharataTheme: Theme = {
  id: 'mahabharata',
  name: 'Mahabharata',
  description: 'Ancient Indian epic of dharma and cosmic battles',
  colors: {
    primary: '#FF6B35',      // Saffron
    secondary: '#F7931E',    // Deep orange
    accent: '#D4AF37',       // Gold
    background: '#FFF8E7',   // Warm cream
    text: '#2C1810',         // Dark brown
    border: '#E8C4A0',       // Light terracotta
    messageBg: {
      user: '#FFE4CC',
      assistant: '#FFFFFF',
    },
    inputBg: '#FFFFFF',
    headerBg: '#FF6B35',
  },
  fonts: {
    heading: '"Cinzel", serif',
    body: '"Lora", serif',
    code: '"Fira Code", monospace',
  },
  avatars: {
    assistant: '/avatars/mahabharata/krishna.png',
    user: '/avatars/mahabharata/arjuna.png',
  },
  patterns: {
    background: '/patterns/mahabharata/lotus-mandala.svg',
    decoration: '/patterns/mahabharata/om-border.svg',
    opacity: 0.05,
  },
  animations: {
    messageEntry: 'fadeSlideUp',
    thinking: 'lotusBloom',
  },
  metadata: {
    culture: 'Hindu',
    primaryLanguage: 'Sanskrit',
    region: 'Indian Subcontinent',
  },
};
