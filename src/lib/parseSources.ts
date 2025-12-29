import { SourceCitation } from '@/types/chat';

/**
 * Parses markdown-formatted sources from the backend response
 * Format: *   [Parva, Ch X](source:id) (Confidence: XX%)
 */
export function parseSources(text: string): {
  content: string;
  sources: SourceCitation[];
} {
  try {
    const sourcesMarker = '\n\n---\n\n**Sources:**\n';
    const markerIndex = text.indexOf(sourcesMarker);

    if (markerIndex === -1) {
      return { content: text, sources: [] };
    }

    const content = text.substring(0, markerIndex).trim();
    const sourcesText = text.substring(markerIndex + sourcesMarker.length);

    const sources: SourceCitation[] = [];
    const sourceRegex = /\*\s+\[([^\]]+)\]\(source:([^)]+)\)\s+\(Confidence:\s+([\d.]+)%\)/g;

    let match;
    while ((match = sourceRegex.exec(sourcesText)) !== null) {
      sources.push({
        location: match[1],
        id: match[2],
        confidence: parseFloat(match[3]),
      });
    }

    return { content, sources };
  } catch (error) {
    console.error('Source parsing failed:', error);
    // Return original text without sources on error
    return { content: text, sources: [] };
  }
}
