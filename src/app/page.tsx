'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChatContainer } from '@/components/ChatContainer';

function ChatApp() {
  const searchParams = useSearchParams();
  // Get domain from URL query parameter, default to 'default'
  const domain = searchParams.get('domain') || 'default';

  return (
    <ThemeProvider domainId={domain}>
      <ChatContainer />
    </ThemeProvider>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <ChatApp />
    </Suspense>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="animate-pulse text-slate-500">Loading...</div>
    </div>
  );
}
