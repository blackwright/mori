export type SpacingProps = {
  m?: number | string;
  my?: number | string;
  mx?: number | string;
  mt?: number | string;
  mr?: number | string;
  mb?: number | string;
  ml?: number | string;
  p?: number | string;
  py?: number | string;
  px?: number | string;
  pt?: number | string;
  pr?: number | string;
  pb?: number | string;
  pl?: number | string;
};

function getSpacing(value: number | string) {
  if (typeof value === 'string') {
    return value;
  }

  return `${value * 8}px`;
}

export function getSpacingStyles(props: SpacingProps): string {
  let css = '';

  if (props.m) {
    css += `margin: ${getSpacing(props.m)};`;
  }

  if (props.my) {
    css += `
      margin-top: ${getSpacing(props.my)};
      margin-bottom: ${getSpacing(props.my)};
    `;
  }

  if (props.mx) {
    css += `
      margin-left: ${getSpacing(props.mx)};
      margin-right: ${getSpacing(props.mx)};
    `;
  }

  if (props.mt) {
    css += `margin-top: ${getSpacing(props.mt)};`;
  }

  if (props.mr) {
    css += `margin-right: ${getSpacing(props.mr)};`;
  }

  if (props.mb) {
    css += `margin-bottom: ${getSpacing(props.mb)};`;
  }

  if (props.ml) {
    css += `margin-left: ${getSpacing(props.ml)};`;
  }

  if (props.p) {
    css += `padding: ${getSpacing(props.p)};`;
  }

  if (props.py) {
    css += `
      padding-top: ${getSpacing(props.py)};
      padding-bottom: ${getSpacing(props.py)};
    `;
  }

  if (props.px) {
    css += `
      padding-left: ${getSpacing(props.px)};
      padding-right: ${getSpacing(props.px)};
    `;
  }

  if (props.pt) {
    css += `padding-top: ${getSpacing(props.pt)};`;
  }

  if (props.pr) {
    css += `padding-right: ${getSpacing(props.pr)};`;
  }

  if (props.pb) {
    css += `padding-bottom: ${getSpacing(props.pb)};`;
  }

  if (props.pl) {
    css += `padding-left: ${getSpacing(props.pl)};`;
  }

  return css;
}
