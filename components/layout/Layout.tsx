import * as React from 'react';
import Head from 'next/head';
import { AppContext } from './AppContext';
import { Nav } from './nav';

type Props = {
  title?: string;
};

export const Layout: React.FC<Props> = ({ title, children }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const toggleNavOpen = React.useCallback(
    (isOpen?: boolean) => {
      setIsNavOpen((prevOpen) => isOpen ?? !prevOpen);
    },
    [setIsNavOpen]
  );

  return (
    <AppContext.Provider value={{ isNavOpen, toggleNavOpen }}>
      <Head>
        <title>
          blackwright
          {title ? ` · ${title}` : ''}
        </title>
      </Head>

      {children}

      <Nav title={title} />
    </AppContext.Provider>
  );
};
