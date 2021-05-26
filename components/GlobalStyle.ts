import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-ThinItalic.ttf') format('truetype');
  font-weight: 100;
  font-style: italic;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-LightItalic.ttf') format('truetype');
  font-weight: 300;
  font-style: italic;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-Italic.ttf') format('truetype');
  font-weight: 400;
  font-style: italic;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-BoldItalic.ttf') format('truetype');
  font-weight: 700;
  font-style: italic;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

@font-face {
  font-family: 'Lato';
  src: url('./fonts/Lato-BlackItalic.ttf') format('truetype');
  font-weight: 900;
  font-style: italic;
}

@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-Thin.ttf') format('truetype');
  font-weight: 100;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-ExtraLight.ttf') format('truetype');
  font-weight: 200;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-Light.ttf') format('truetype');
  font-weight: 300;
  font-style: normal;
}


@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-Regular.ttf') format('truetype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-Medium.ttf') format('truetype');
  font-weight: 500;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-SemiBold.ttf') format('truetype');
  font-weight: 600;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-Bold.ttf') format('truetype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-ExtraBold.ttf') format('truetype');
  font-weight: 800;
  font-style: normal;
}

@font-face {
  font-family: 'Roboto Slab';
  src: url('./fonts/RobotoSlab-Black.ttf') format('truetype');
  font-weight: 900;
  font-style: normal;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-size: 16px;
}

h1,
h2,
h3,
h4,
h5,
header a {
  font-family: 'Lato', Arial, sans-serif;
  text-transform: uppercase;
  font-size: 0.85rem;
  line-height: 1rem;
  font-weight: 800;
  color: white;
  letter-spacing: 1.25px;
}

body {
  color: rgba(255, 255, 255, 0.85);
  font-family: 'Roboto Slab', 'Times New Roman', Times, serif;
  overflow: hidden;
  text-rendering: optimizeSpeed;
  -webkit-font-smoothing: antialiased;
  background-color: #282c35;
  scroll-behavior: smooth;
}

html,
body,
#__next,
#__next > div {
  height: 100%;
}

ul,
ol {
  padding: 0;
  list-style: none;
}

body,
h1,
h2,
h3,
h4,
p,
ul,
ol,
li,
figure,
figcaption,
blockquote,
dl,
dd {
  margin: 0;
}

a {
  color: white;
  text-decoration: underline;
  cursor: pointer;

  :hover,
  :visited,
  :active,
  :focus {
    color: white;
  }
}

header a {
  text-decoration: none;
}

ul[class],
ol[class] {
  list-style: none;
}

img {
  max-width: 100%;
  display: block;
}

article > * + * {
  margin-top: 1em;
}

input,
button,
textarea,
select {
  font: inherit;
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
