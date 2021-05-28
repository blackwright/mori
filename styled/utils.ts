export function addMediaQuery(mediaQuery: string, styles: string) {
  return `@media ${mediaQuery} {
    ${styles}
  }`;
}
