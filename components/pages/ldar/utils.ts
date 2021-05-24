import { shuffle } from 'utils/numbers';
import { characters } from './characters';

export function shuffleCharacters(): string[] {
  return shuffle(characters);
}
