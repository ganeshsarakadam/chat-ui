const KNOWLEDGE_SERVICE_URL = process.env.KNOWLEDGE_SERVICE_URL;

export async function POST(req: Request) {
  try {
    const { question, mode = 'detailed' } = await req.json();

    if (!question || typeof question !== 'string') {
      return new Response('Invalid question format', { status: 400 });
    }

    if (!KNOWLEDGE_SERVICE_URL) {
      throw new Error('KNOWLEDGE_SERVICE_URL is not configured');
    }

    // Call the knowledge-service backend
    const response = await fetch(`${KNOWLEDGE_SERVICE_URL}/api/ask`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        question,
        mode,
      }),
    });

    if (!response.ok) {
      throw new Error(`Backend error: ${response.statusText}`);
    }

    // The backend streams plain text with sources appended
    // We'll pass this stream directly to the client
    return new Response(response.body, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });

  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
