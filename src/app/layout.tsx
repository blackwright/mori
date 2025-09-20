import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Nav } from './Nav';
import { robotoSlab } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s · blackwright',
    default: 'blackwright',
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en" className={robotoSlab.className}>
      <body>
        {props.children}

        <Suspense fallback={null}>
          <Nav />
        </Suspense>
      </body>
    </html>
  );
}
