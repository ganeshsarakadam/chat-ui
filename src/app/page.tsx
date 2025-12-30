'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ThemeProvider } from '@/components/ThemeProvider';
import { ChatContainer } from '@/components/ChatContainer';

function ChatApp() {
  const searchParams = useSearchParams();
  const [domain, setDomain] = useState<string>('default');

  useEffect(() => {
    // Get domain from URL query parameter
    const domainParam = searchParams.get('domain');
    if (domainParam) {
      setDomain(domainParam);
    }
  }, [searchParams]);

  return (
    <ThemeProvider domainId={domain}>
      <ChatContainer domain={domain} />
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
