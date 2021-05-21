import * as React from 'react';
import Head from 'next/head';
import { Nav } from './nav';

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>
          blackwright
          {!!title && ' · '}
          {title}
        </title>
      </Head>

      {children}

      <Nav title={title} />
    </>
  );
};
