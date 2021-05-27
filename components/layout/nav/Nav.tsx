import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Box, Typography } from 'components/shared';
import { AppContext } from '../AppContext';
import { routes } from './routes';

type Props = {
  title: string;
};

export const Nav: React.FC<Props> = ({ title }) => {
  const { pathname } = useRouter();

  const { isNavOpen, toggleNavOpen } = React.useContext(AppContext);

  const handleClickMenuButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleNavOpen();
  };

  const handleNavigate = (
    e: React.MouseEvent<HTMLAnchorElement>,
    path: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    window.location.href = path;
  };

  return (
    <Container isNavOpen={isNavOpen}>
      <Box
        as="header"
        display="flex"
        p={4}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography as="h1" color="white">
          {title}
        </Typography>

        <Box display="flex" alignItems="center">
          <Typography as="a" href="/" mr={3}>
            About
          </Typography>

          <MenuButton onClick={handleClickMenuButton}>
            <Cross>&#x2b;</Cross>
          </MenuButton>
        </Box>
      </Box>

      <NavContainer>
        <Grid>
          {routes
            .filter((route) => route.path !== pathname)
            .map((route) => (
              <Card key={route.path}>
                <Link
                  href={route.path}
                  onClick={(e) => handleNavigate(e, route.path)}
                >
                  <Image
                    src={route.img}
                    layout="fill"
                    objectFit="cover"
                    loading="lazy"
                  />
                  <CardTitle>{route.title}</CardTitle>
                </Link>
              </Card>
            ))}
        </Grid>
      </NavContainer>
    </Container>
  );
};

const Container = styled.div<{ isNavOpen: boolean }>(
  ({ isNavOpen }) => `
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  pointer-events: none;

  * {
    transition: all 150ms linear;
  }

  ${Box} {
    background-color: ${isNavOpen ? '#282c35' : 'transparent'};
  }

  ${Typography} {
    opacity: ${isNavOpen ? 1 : 0};
    pointer-events: ${isNavOpen ? 'auto' : 'none'};
  }

  ${MenuButton} {
    transform: rotate(${isNavOpen ? '45deg' : '0deg'});
  }

  ${NavContainer} {
    background-color: ${isNavOpen ? '#282c35' : 'transparent'};
  }

  ${Grid} {
    opacity: ${isNavOpen ? 1 : 0};
    pointer-events: ${isNavOpen ? 'auto' : 'none'};
  }
`
);

const MenuButton = styled.button`
  pointer-events: auto;
  cursor: pointer;
  font-family: 'Futura PT', Arial, sans-serif;
  width: 32px;
  height: 32px;
  border: 0;
  outline: 0;
  background: #6d0e18;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Cross = styled.div`
  color: #eee;
  font-size: 1.5rem;
  line-height: 2rem;
`;

const NavContainer = styled.nav`
  display: flex;
  width: 100vw;
  height: calc(100% - 64px);
  flex-direction: column;
  flex-grow: 1;
`;

const Grid = styled.ul`
  display: grid;
  max-width: 100vw;
  overflow-y: auto;

  @media screen and (min-width: 901px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardTitle = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  color: white;
  font-size: 1.25rem;
  line-height: 1.75rem;
  opacity: 0;
`;

const Card = styled.li`
  position: relative;
  height: 200px;
  background: gray;

  :hover {
    ${CardTitle} {
      color: #eee;
      background: #6d0e18;
      opacity: 0.95;
    }
  }

  @media screen and (min-width: 901px) {
    height: 350px;
  }
`;

const Link = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  width: 100%;
  height: 100%;

  @media screen and (min-width: 600px) {
    padding: 24px;
  }
`;
