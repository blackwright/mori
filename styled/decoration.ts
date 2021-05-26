export type DecorationProps = {
  border?: string;
  outline?: string;
  boxShadow?: string;
  color?: string;
  background?: string;
  backgroundColor?: string;
  backgroundImage?: string;
};

export function getDecorationStyles(props: DecorationProps): string {
  let css = '';

  if (props.border) {
    css += `border: ${props.border};`;
  }

  if (props.outline) {
    css += `outline: ${props.outline};`;
  }

  if (props.boxShadow) {
    css += `box-shadow: ${props.boxShadow};`;
  }

  if (props.color) {
    css += `color: ${props.color};`;
  }

  if (props.background) {
    css += `background: ${props.background};`;
  }

  if (props.backgroundColor) {
    css += `background-color: ${props.backgroundColor};`;
  }

  if (props.backgroundImage) {
    css += `background-image: ${props.backgroundImage};`;
  }

  return css;
}
