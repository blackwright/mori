import { theme } from './theme';
import { addMediaQuery } from './utils';
import type { BreakpointName, WithBreakpoints } from './theme';

type SpacingValue = WithBreakpoints<number | string> | number | string;

export type SpacingProps = {
  m?: SpacingValue;
  my?: SpacingValue;
  mx?: SpacingValue;
  mt?: SpacingValue;
  mr?: SpacingValue;
  mb?: SpacingValue;
  ml?: SpacingValue;
  p?: SpacingValue;
  py?: SpacingValue;
  px?: SpacingValue;
  pt?: SpacingValue;
  pr?: SpacingValue;
  pb?: SpacingValue;
  pl?: SpacingValue;
};

function getSpacing(property: string | string[], value: SpacingValue) {
  let css = '';

  if (typeof value === 'object') {
    Object.entries(value).forEach(([themeBreakpoint, breakpointValue]) => {
      const mediaQuery = theme.breakpoints[themeBreakpoint as BreakpointName];

      const queryContent = Array.isArray(property)
        ? property.map((prop) => getSpacing(prop, breakpointValue)).join('\n')
        : getSpacing(property, breakpointValue);

      css += addMediaQuery(mediaQuery, queryContent);
    });
  } else {
    const cssValue = typeof value === 'number' ? `${value * 8}px` : value;

    css += Array.isArray(property)
      ? property.map((prop) => `${prop}: ${cssValue};`).join('')
      : `${property}: ${cssValue};`;
  }

  return css;
}

export function getSpacingStyles(props: SpacingProps): string {
  let css = '';

  if (props.m) {
    css += getSpacing('margin', props.m);
  }

  if (props.my) {
    css += getSpacing(['margin-top', 'margin-bottom'], props.my);
  }

  if (props.mx) {
    css += getSpacing(['margin-left', 'margin-right'], props.mx);
  }

  if (props.mt) {
    css += getSpacing('margin-top', props.mt);
  }

  if (props.mr) {
    css += getSpacing('margin-right', props.mr);
  }

  if (props.mb) {
    css += getSpacing('margin-bottom', props.mb);
  }

  if (props.ml) {
    css += getSpacing('margin-left', props.ml);
  }

  if (props.p) {
    css += getSpacing('padding', props.p);
  }

  if (props.py) {
    css += getSpacing(['padding-top', 'padding-bottom'], props.py);
  }

  if (props.px) {
    css += getSpacing(['padding-left', 'padding-right'], props.px);
  }

  if (props.pt) {
    css += getSpacing('padding-top', props.pt);
  }

  if (props.pr) {
    css += getSpacing('padding-right', props.pr);
  }

  if (props.pb) {
    css += getSpacing('padding-bottom', props.pb);
  }

  if (props.pl) {
    css += getSpacing('padding-left', props.pl);
  }

  return css;
}
