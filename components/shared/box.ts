import styled from 'styled-components';
import { getSharedStyles } from 'styled';
import type { SharedProps } from 'styled';

type Props = SharedProps;

export const Box = styled.div<Props>(getSharedStyles);
