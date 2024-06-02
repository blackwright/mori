'use client';

import { GlobalStyles as BaseStyles } from 'twin.macro';
import { createGlobalStyle } from 'styled-components';

const CustomStyles = createGlobalStyle`
  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-ThinItalic.ttf') format('truetype');
    font-weight: 100;
    font-style: italic;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-LightItalic.ttf') format('truetype');
    font-weight: 300;
    font-style: italic;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-Italic.ttf') format('truetype');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-BoldItalic.ttf') format('truetype');
    font-weight: 700;
    font-style: italic;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }

  @font-face {
    font-family: 'Lato';
    src: url('/fonts/Lato-BlackItalic.ttf') format('truetype');
    font-weight: 900;
    font-style: italic;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-Thin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-ExtraLight.ttf') format('truetype');
    font-weight: 200;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-Light.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
  }


  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-Regular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-Medium.ttf') format('truetype');
    font-weight: 500;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-SemiBold.ttf') format('truetype');
    font-weight: 600;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-Bold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-ExtraBold.ttf') format('truetype');
    font-weight: 800;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto Slab';
    src: url('/fonts/RobotoSlab-Black.ttf') format('truetype');
    font-weight: 900;
    font-style: normal;
  }

  body {
    color: rgba(255, 255, 255, 0.85);
    font-family: 'Roboto Slab', 'Times New Roman', Times, serif;
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
