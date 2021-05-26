import styled from 'styled-components';
import { Typography } from './typography';
import type { StyledComponentPropsWithRef } from 'styled-components';

type Props = {
  href?: string;
} & StyledComponentPropsWithRef<typeof Typography>;

export const Link = styled(Typography).attrs({
  as: 'a',
  rel: 'noopener'
})<Props>``;
