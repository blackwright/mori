export const theme = {
  breakpoints: {
    phone: '(max-width: 599px)',
    tablet: '(min-width: 600px)',
    desktop: '(min-width: 1200px)'
  }
};

export type Theme = typeof theme;

export type BreakpointName = keyof typeof theme.breakpoints;

export type WithBreakpoints<T> = Partial<Record<BreakpointName, T>>;
