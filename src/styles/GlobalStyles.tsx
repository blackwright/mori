'use client';

import { GlobalStyles as BaseStyles } from 'twin.macro';
import { createGlobalStyle } from 'styled-components';

const CustomStyles = createGlobalStyle`
  body {
    color: rgba(255, 255, 255, 0.85);
    font-size: 16px;
    overflow: hidden;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    background-color: #282c35;
    scroll-behavior: smooth;
    line-height: 1.6rem;
  }

  a {
    text-decoration: underline;
  }

  button svg {
    width: 0.75rem;
    height: 0.75rem;
  }

  @media (prefers-reduced-motion: reduce) {
    * {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

const GlobalStyles = () => (
  <>
    <BaseStyles />
    <CustomStyles />
  </>
);

export default GlobalStyles;
