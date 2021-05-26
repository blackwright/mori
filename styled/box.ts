export type BoxProps = {
  boxSizing?: string;
  display?: string;
  width?: string;
  minWidth?: string;
  maxWidth?: string;
  height?: string;
  minHeight?: string;
  maxHeight?: string;
  flex?: string;
  flexFlow?: string;
  flexDirection?: string;
  flexWrap?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  textAlign?: string;
  alignItems?: string;
  justifyContent?: string;
  alignSelf?: string;
  justifySelf?: string;
  overflow?: string;
  overflowY?: string;
  overflowX?: string;
};

export function getBoxStyles(props: BoxProps): string {
  let css = '';

  if (props.boxSizing) {
    css += `box-sizing: ${props.boxSizing};`;
  }

  if (props.display) {
    css += `display: ${props.display};`;
  }

  if (props.width) {
    css += `width: ${props.width};`;
  }

  if (props.minWidth) {
    css += `min-width: ${props.minWidth};`;
  }

  if (props.maxWidth) {
    css += `max-width: ${props.maxWidth};`;
  }

  if (props.height) {
    css += `height: ${props.height};`;
  }

  if (props.minHeight) {
    css += `min-height: ${props.minHeight};`;
  }

  if (props.maxHeight) {
    css += `max-height: ${props.maxHeight};`;
  }

  if (props.display === 'flex') {
    if (props.flex) {
      css += `flex: ${props.flex};`;
    }

    if (props.flexFlow) {
      css += `flex-flow: ${props.flexFlow};`;
    }

    if (props.flexDirection) {
      css += `flex-direction: ${props.flexDirection};`;
    }

    if (props.flexWrap) {
      css += `flex-wrap: ${props.flexWrap};`;
    }

    if (props.alignItems) {
      css += `align-items: ${props.alignItems};`;
    }

    if (props.justifyContent) {
      css += `justify-content: ${props.justifyContent};`;
    }
  }

  if (props.textAlign) {
    css += `text-align: ${props.textAlign};`;
  }

  if (props.flexGrow != null) {
    css += `flex-grow: ${props.flexGrow};`;
  }

  if (props.flexShrink != null) {
    css += `flex-shrink: ${props.flexShrink};`;
  }

  if (props.flexBasis) {
    css += `flex-basis: ${props.flexBasis};`;
  }

  if (props.alignSelf) {
    css += `align-self: ${props.alignSelf};`;
  }

  if (props.justifySelf) {
    css += `justify-self: ${props.justifySelf};`;
  }

  if (props.overflow) {
    css += `overflow: ${props.overflow};`;
  }

  if (props.overflowY) {
    css += `overflow-y: ${props.overflowY};`;
  }

  if (props.overflowX) {
    css += `overflow-x: ${props.overflowX};`;
  }

  return css;
}
