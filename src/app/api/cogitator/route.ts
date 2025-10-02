import { openai } from '@ai-sdk/openai';
import {
  consumeStream,
  convertToModelMessages,
  streamText,
  type UIMessage,
} from 'ai';
import SYSTEM_PROMPT from 'raw-loader!./prompt.txt';

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: openai('gpt-4o'),
    system: SYSTEM_PROMPT,
    messages: convertToModelMessages(messages),
    abortSignal: req.signal,
  });

  return result.toUIMessageStreamResponse({
    onError: formatError,
    consumeSseStream: consumeStream,
  });
}

function formatError(error: unknown): string {
  let errorMessage = 'Unknown error';

  if (typeof error === 'string') {
    errorMessage = error;
  } else if (error instanceof Error) {
    errorMessage = error.message;
  } else {
    errorMessage = JSON.stringify(error);
  }

  return `By the Omnissiah's will, your request cannot be fulfilled: ${errorMessage}. The machine spirits require appeasement.`;
}
