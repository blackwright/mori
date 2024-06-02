import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'ldr-ofer-michael';
    src: url('/ld+r/ldr-ofer-michael.eot');
    src: url('/ld+r/ldr-ofer-michael.eot') format('embedded-opentype'),
        url('/ld+r/ldr-ofer-michael.woff2') format('woff2'),
        url('/ld+r/ldr-ofer-michael.woff') format('woff'),
        url('/ld+r/ldr-ofer-michael.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    background-color: #010010;
  }
`;
