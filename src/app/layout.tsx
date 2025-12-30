import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ethics & History Knowledge Chat',
  description: 'AI-powered chat interface for sacred texts and philosophical wisdom',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
