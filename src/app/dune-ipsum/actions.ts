'use server';

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import SYSTEM_PROMPT from 'raw-loader!./prompt.txt';

export async function write(): Promise<string> {
  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: SYSTEM_PROMPT,
    messages: [
      {
        role: 'user',
        content: `Pick a subject randomly and write 1 sentence.`,
      },
    ],
    temperature: 1,
  });

  return text;
}
