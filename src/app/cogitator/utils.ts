const UP_ZALGO_CHARS = [
  ...Array.from({ length: 0x036f - 0x0300 }, (_, i) =>
    String.fromCharCode(0x0300 + i),
  ),
];

const DOWN_ZALGO_CHARS = [
  ...Array.from({ length: 0x1aff - 0x1ab0 }, (_, i) =>
    String.fromCharCode(0x1ab0 + i),
  ),
  ...Array.from({ length: 0x1dff - 0x1dc0 }, (_, i) =>
    String.fromCharCode(0x1dc0 + i),
  ),
];

const MID_ZALGO_CHARS = [
  ...Array.from({ length: 0x20ff - 0x20d0 }, (_, i) =>
    String.fromCharCode(0x20d0 + i),
  ),
];

const ALL_ZALGO_CHARS = UP_ZALGO_CHARS.concat(
  DOWN_ZALGO_CHARS,
  MID_ZALGO_CHARS,
);

export function zalgoize(text: string, intensity: number): string {
  return text
    .split(' ')
    .map((char) => {
      const probability = 0.5 + (0.5 * (intensity - 1)) / 9;
      const shouldZalgoize = Math.random() < probability;

      if (!shouldZalgoize) {
        return char;
      }

      let zalgoChars = '';

      const count = Math.floor(Math.random() * intensity) + 1;

      for (let i = 0; i < count; i++) {
        zalgoChars +=
          ALL_ZALGO_CHARS[Math.floor(Math.random() * ALL_ZALGO_CHARS.length)];
      }

      return char + zalgoChars;
    })
    .join(' ');
}
