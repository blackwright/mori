'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import tw, { styled } from 'twin.macro';
import { routes } from './routes';

export function Nav() {
  const pathname = usePathname();

  const [isNavOpen, setIsNavOpen] = useState(false);

  const handleClickMenuButton = () => {
    setIsNavOpen(prevIsOpen => !prevIsOpen);
  };

  return (
    <>
      <Container $isNavOpen={isNavOpen}>
        <Header $isNavOpen={isNavOpen}>
          <h1>{routes.find(route => route.path === pathname)?.title}</h1>

          <Link href="/" onClick={() => setIsNavOpen(false)}>
            About
          </Link>
        </Header>

        <MenuButton onClick={handleClickMenuButton} $isNavOpen={isNavOpen}>
          <Cross>&#x2b;</Cross>
        </MenuButton>

        <NavContainer $isNavOpen={isNavOpen}>
          <Grid>
            {routes.map(route => (
              <Card key={route.path} className="group">
                <Link
                  href={route.path}
                  onClick={() => setIsNavOpen(false)}
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

type StyledNavProps = {
  $isNavOpen: boolean;
};

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

const MenuButton = styled.button<StyledNavProps>(({ $isNavOpen }) => [
  tw`
    absolute
    top-4
    right-4
    flex
    items-center
    justify-center
    cursor-pointer
    pointer-events-auto
    w-8
    h-8
    bg-rose-950
    p-0
    transition-all
  `,

  $isNavOpen && tw`rotate-45`,
]);

const Cross = tw.div`
  text-slate-50
  text-xl
  mb-0.5
`;

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
  transition-all
  group-hover:(
    bg-rose-950
    opacity-90
  )
`;

const Card = tw.li`
  relative
  [height: 200px]
  bg-slate-400
  xl:[height: 350px]
`;
