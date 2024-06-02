import type { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import GlobalStyles from '@/styles/GlobalStyles';
import { Nav } from './Nav';

export const metadata: Metadata = {
  title: {
    template: '%s · blackwright',
    default: 'blackwright',
  },
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <GlobalStyles />

          {props.children}

          <Nav />
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
