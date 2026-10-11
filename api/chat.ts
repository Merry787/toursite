import { handleChat } from '../lib/chat.js';

// Vercel serverless function for POST /api/chat
export async function POST(request: Request): Promise<Response> {
  let payload: unknown = null;
  try {
    payload = await request.json();
  } catch {
    // Invalid JSON is treated as a missing message by handleChat
  }

  const { status, body } = await handleChat(payload);
  return Response.json(body, { status });
}
