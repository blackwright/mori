'use client';

import tw, { styled } from 'twin.macro';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Plus } from 'react-feather';
import { NAV_SEARCH_PARAM_KEY, NAV_SEARCH_PARAM_VALUE } from './constants';
import { MenuButton } from './MenuButton';
import { routes } from './routes';
import type { StyledNavProps } from './types';

export function Nav() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isNavOpen =
    searchParams.get(NAV_SEARCH_PARAM_KEY) === NAV_SEARCH_PARAM_VALUE;

  const handleChangeIsNavOpen = (newIsNavOpen: boolean) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (newIsNavOpen) {
      newSearchParams.set(NAV_SEARCH_PARAM_KEY, NAV_SEARCH_PARAM_VALUE);
    } else {
      newSearchParams.delete(NAV_SEARCH_PARAM_KEY);
    }

    replace(`${pathname}?${newSearchParams}`);
  };

  return (
    <>
      <Container $isNavOpen={isNavOpen}>
        <Header $isNavOpen={isNavOpen}>
          <h1>{routes.find((route) => route.path === pathname)?.title}</h1>

          <Link href="/" onClick={() => handleChangeIsNavOpen(false)}>
            About
          </Link>
        </Header>

        <MenuButton tw="absolute top-4 right-4" />

        <NavContainer $isNavOpen={isNavOpen}>
          <Grid>
            {routes.map((route) => (
              <Card key={route.path} className="group">
                <Link
                  href={route.path}
                  onClick={() => handleChangeIsNavOpen(false)}
                  tw="relative flex items-center justify-center w-full h-full p-4"
                >
                  <Image
                    src={route.img}
                    alt={route.title}
                    style={{ objectFit: 'cover' }}
                    loading="lazy"
                    fill
                  />
                  <CardTitle>{route.title}</CardTitle>
                </Link>
              </Card>
            ))}
          </Grid>
        </NavContainer>
      </Container>
    </>
  );
}

const Container = styled.div<StyledNavProps>(({ $isNavOpen }) => [
  tw`
    absolute
    top-0
    left-0
    w-screen
    h-screen
    z-10
  `,

  $isNavOpen ? tw`pointer-events-auto` : tw`pointer-events-none`,
]);

const Header = styled.header<StyledNavProps>(({ $isNavOpen }) => [
  tw`
    flex
    items-center
    justify-between
    gap-4
    bg-slate-900
    h-16
    pl-8
    pr-20
    border-b
    border-slate-800
  `,

  $isNavOpen ? tw`opacity-100` : tw`opacity-0`,
]);

const NavContainer = styled.nav<StyledNavProps>(({ $isNavOpen }) => [
  tw`
    flex
    flex-col
    flex-grow
    w-screen
    [height: calc(100% - 4rem)]
    bg-slate-900
    transition-all
  `,

  $isNavOpen ? tw`opacity-100` : tw`opacity-0`,
]);

const Grid = tw.ul`
  grid
  grid-cols-1
  [max-width: 100vw]
  overflow-y-auto
  xl:grid-cols-2
`;

const CardTitle = tw.h2`
  absolute
  top-0
  left-0
  flex
  items-center
  justify-center
  w-full
  h-full
  text-white
  text-2xl
  opacity-0
  p-4
  rounded
  border
  border-slate-100
  transition-all
  group-hover:(
    bg-slate-950/75
    opacity-100
  )
`;

const Card = tw.li`
  relative
  [height: 200px]
  bg-slate-400
  xl:[height: 350px]
`;
