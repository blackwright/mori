import styled from 'styled-components';
import { getSharedStyles } from 'styled';
import type { SharedProps } from 'styled';

type Props = {
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: number;
  lineHeight?: string;
  textDecoration?: string;
  letterSpacing?: string;
} & SharedProps;

export const Typography = styled.p<Props>((props) => {
  let css = '';

  if (props.fontFamily) {
    css += `font-family: ${props.fontFamily};`;
  }

  if (props.fontSize) {
    css += `font-size: ${props.fontSize};`;
  }

  if (props.fontWeight) {
    css += `font-weight: ${props.fontWeight};`;
  }

  if (props.lineHeight) {
    css += `line-height: ${props.lineHeight};`;
  }

  if (props.textDecoration) {
    css += `text-decoration: ${props.textDecoration}`;
  }

  if (props.letterSpacing) {
    css += `letter-spacing: ${props.letterSpacing};`;
  }

  css += getSharedStyles(props);

  return css;
});
