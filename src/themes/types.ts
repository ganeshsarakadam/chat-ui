export interface Theme {
  id: string;
  name: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    border: string;
    messageBg: {
      user: string;
      assistant: string;
    };
    inputBg: string;
    headerBg: string;
  };
  fonts: {
    heading: string;
    body: string;
    code?: string;
  };
  avatars: {
    assistant: string;
    user: string;
  };
  patterns: {
    background?: string;
    decoration?: string;
    opacity?: number;
  };
  animations: {
    messageEntry: AnimationStyle;
    thinking: ThinkingStyle;
  };
  metadata: {
    culture: string;
    primaryLanguage: string;
    region: string;
  };
}

export type AnimationStyle = 'fadeSlideUp' | 'gracefulFade' | 'reverentSlide';
export type ThinkingStyle = 'lotusBloom' | 'candleFlicker' | 'prayerBeads' | 'pulse';
