import GlobalStyles from '@/styles/GlobalStyles';
import StyledComponentsRegistry from '@/lib/registry';
import { Nav } from './Nav';
import type { Metadata } from 'next';

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
