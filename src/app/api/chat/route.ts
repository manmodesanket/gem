import { createGoogleGenerativeAI } from '@ai-sdk/google';
import { streamText } from 'ai';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    const google = createGoogleGenerativeAI({
        apiKey: process.env.GOOGLE_API_KEY,
    });

    const result = streamText({
        model: google('gemini-2.5-flash-preview-04-17'),
        system: 'You are a helpful assistant.',
        messages,
    });

    return result.toDataStreamResponse();
}