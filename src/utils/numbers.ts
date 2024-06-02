export type Clamp = [number, number];

export type ClampRanges = {
  input: Clamp;
  output: Clamp;
};

export function clamp(value: number, [min, max]: Clamp): number {
  if (min > max) {
    let temp = min;
    min = max;
    max = temp;
  }

  return Math.min(Math.max(value, min), max);
}

export function clampNumberRange(
  value: number,
  { input, output }: ClampRanges
) {
  const mappedValue =
    ((value - input[0]) * (output[1] - output[0])) / (input[1] - input[0]) +
    output[0];

  return clamp(mappedValue, [output[0], output[1]]);
}

export function modulo(number1: number, number2: number): number {
  return ((number1 % number2) + number2) % number2;
}

export function isInteger(number: number) {
  return modulo(number, 1) === 0;
}

export function randomNumberBetween(
  min: number,
  max: number,
  decimalPrecision = 1
) {
  if (isInteger(min) && isInteger(max)) {
    return min + Math.floor(Math.random() * (max - min));
  }

  const randomFloat = min + Math.random() * (max - min);
  return Number(randomFloat.toPrecision(decimalPrecision));
}

export function shuffle<T>(array: T[]): T[] {
  const copy = [...array];

  for (let i = array.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = copy[i];
    copy[i] = copy[randomIndex];
    copy[randomIndex] = temp;
  }

  return copy;
}
