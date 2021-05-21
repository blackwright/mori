import Head from 'next/head';
import * as React from 'react';
import { Dune } from 'components/pages/dune';
import type { NextPage } from 'next/types';

const Page: NextPage = () => {
  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css?family=Bodoni+Moda"
          rel="stylesheet"
          type="text/css"
        />
      </Head>
      <Dune />
    </>
  );
};

export default Page;
