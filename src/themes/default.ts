import { Theme } from './types';

export const defaultTheme: Theme = {
  id: 'default',
  name: 'Knowledge Assistant',
  description: 'General knowledge assistant',
  colors: {
    primary: '#3B82F6',
    secondary: '#6366F1',
    accent: '#8B5CF6',
    background: '#FFFFFF',
    text: '#1F2937',
    border: '#E5E7EB',
    messageBg: {
      user: '#EFF6FF',
      assistant: '#F9FAFB',
    },
    inputBg: '#F9FAFB',
    headerBg: '#3B82F6',
  },
  fonts: {
    heading: '"Inter", sans-serif',
    body: '"Inter", sans-serif',
    code: '"Fira Code", monospace',
  },
  avatars: {
    assistant: '/avatars/default/assistant.png',
    user: '/avatars/default/user.png',
  },
  patterns: {},
  animations: {
    messageEntry: 'fadeSlideUp',
    thinking: 'pulse',
  },
  metadata: {
    culture: 'Universal',
    primaryLanguage: 'English',
    region: 'Global',
  },
};
