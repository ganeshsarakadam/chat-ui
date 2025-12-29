'use client';

import { SourceCitation as SourceCitationType } from '@/types/chat';
import { ExternalLink } from 'lucide-react';

interface SourceCitationProps {
  sources: SourceCitationType[];
}

export function SourceCitation({ sources }: SourceCitationProps) {
  if (!sources || sources.length === 0) return null;

  return (
    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Sources:
      </h4>
      <ul className="space-y-1">
        {sources.map((source, index) => (
          <li key={source.id || index} className="flex items-start gap-2 text-sm">
            <ExternalLink className="w-3 h-3 mt-1 flex-shrink-0 text-gray-400" />
            <span className="text-gray-600 dark:text-gray-400">
              {source.location}
              <span className="ml-2 text-xs text-gray-500">
                ({source.confidence.toFixed(1)}% confidence)
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
