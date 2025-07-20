import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, model = "gemini-2.5-flash" } = await req.json();

  const google = createGoogleGenerativeAI({
    apiKey: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  });

  const openai = createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  let selectedModel;
  switch (model) {
    case "gemini-2.5-flash":
      selectedModel = google("gemini-2.5-flash");
      break;
    case "o3-mini":
      selectedModel = openai("gpt-4o");
      break;
    default:
      selectedModel = google("gemini-2.5-flash");
  }

  const result = streamText({
    model: selectedModel,
    system: "You are a helpful assistant.",
    messages,
    onError({ error }) {
      console.error(error);
    },
  });

  return result.toDataStreamResponse();
}
