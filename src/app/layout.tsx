import type { Metadata } from 'next';
import { Suspense } from 'react';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { robotoSlab } from './fonts';
import { Nav } from './Nav';

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
        <StyledComponentsRegistry>
          <GlobalStyles />

          {props.children}

          <Suspense fallback={null}>
            <Nav />
          </Suspense>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
