import { getBoxStyles } from './box';
import { getSpacingStyles } from './spacing';
import { getDecorationStyles } from './decoration';
import type { BoxProps } from './box';
import type { SpacingProps } from './spacing';
import type { DecorationProps } from './decoration';

export type SharedProps = BoxProps & SpacingProps & DecorationProps;

export function getSharedStyles(props: SharedProps): string {
  let css = '';

  css += getBoxStyles(props);

  css += getSpacingStyles(props);

  css += getDecorationStyles(props);

  return css;
}
