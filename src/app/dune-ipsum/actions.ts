'use server';

import { openai } from '@ai-sdk/openai';
import { generateText } from 'ai';
import SYSTEM_PROMPT from 'raw-loader!./prompt.txt';

const SUBJECTS = [
  'Abomination',
  'Arrakis',
  'Atomics',
  'Baliset',
  'Bene Gesserit',
  'Baron Harkonnen',
  'Butlerian Jihad',
  'Caladan',
  'Carryall',
  'Chakobsa',
  'Chani',
  'Count Fenring',
  'Crysknife',
  'Doctor Yueh',
  'Dr. Liet-Kynes',
  'Duke Leto Atreides',
  'Duncan Idaho',
  'Emperor Shaddam IV',
  'Fremen',
  'Fedaykin',
  'Feyd-Rautha Harkonnen',
  'Giedi Prime',
  'Gom jabbar',
  'Gurney Halleck',
  'Guild navigator',
  'Harah',
  'Hunter-seeker',
  'Jamis',
  'Kwisatz Haderach',
  'Lady Fenring',
  'Lady Jessica',
  'Lisan al Gaib',
  'Mahdi',
  'Mentat',
  "Muad'Dib",
  'Other memory',
  'Ornithopter',
  'Paul Atreides',
  'Prana-bindu',
  'Princess Irulan',
  'Rabban',
  'Reverend Mother Gaius Helen Mohiam',
  'Reverend mother',
  'Salusa Secundus',
  'Sandworm',
  'Sardaukar',
  'Sayyadina',
  'Shadout Mapes',
  'Shai-Hulud',
  'Shigawire',
  'Sietch',
  'Spacing guild',
  'Spice melange',
  'Stilgar',
  'Stillsuit',
  'Thufir Hawat',
  'Thumper',
  'The Voice',
  'Truthsayer',
  'Water of Life',
];

export async function write(): Promise<string> {
  const randomSubject = SUBJECTS[Math.floor(Math.random() * SUBJECTS.length)];

  const { text } = await generateText({
    model: openai('gpt-4o'),
    system: SYSTEM_PROMPT.replace('{{subject}}', randomSubject),
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
