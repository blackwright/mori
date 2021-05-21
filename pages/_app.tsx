import Head from 'next/head';
import * as React from 'react';
import { GlobalStyle } from 'components/GlobalStyle';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Bodoni+Moda"
          rel="stylesheet"
          type="text/css"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        ></meta>
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
