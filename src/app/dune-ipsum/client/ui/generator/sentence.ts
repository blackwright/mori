import { structures } from './structures';
import { capitalize, randomElement } from './utils';
import { getRandomWord, WordType } from './words';

export default class Sentence {
  private value: string;

  constructor() {
    const randomStructure = randomElement(structures);
    this.value = this.build(randomStructure);
  }

  private build(structure: string) {
    const words = (Array.from(structure) as WordType[]).map((wordType) =>
      getRandomWord(wordType),
    );

    const sentence = words.join(' ').replace(/\s,\s/g, ',');
    return capitalize(sentence) + '.';
  }

  toString() {
    return this.value;
  }
}
