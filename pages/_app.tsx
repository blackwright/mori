import Head from 'next/head';
import * as React from 'react';
import { GlobalStyle } from 'components/GlobalStyle';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}
