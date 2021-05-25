import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: 'Futura PT';
  src: url('./fonts/futura-pt-book.woff') format('woff');
}

@font-face {
  font-family: 'Bodoni';
  src: url('./fonts/bodoni-webfont.woff') format('woff');
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

h1,
h2,
h3,
h4,
h5 {
  font-family: 'Futura PT', Arial, sans-serif;
}

body {
  font-family: Bodoni, 'Times New Roman', Times, serif;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
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

body {
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  line-height: 1.5;
}

ul[class],
ol[class] {
  list-style: none;
}

a:not([class]) {
  text-decoration-skip-ink: auto;
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

a {
  text-decoration: none;
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
