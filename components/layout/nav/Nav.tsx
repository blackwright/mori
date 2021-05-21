import * as React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { routes } from './routes';

type Props = {
  title: string;
};

export const Nav: React.FC<Props> = ({ title }) => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  const { pathname } = useRouter();

  const handleClickMenuButton = () => {
    setIsNavOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };

  return (
    <Container isNavOpen={isNavOpen}>
      <Header>
        <Title>{title}</Title>
        <MenuButton onClick={handleClickMenuButton}>
          <Cross>&#x2b;</Cross>
        </MenuButton>
      </Header>

      <NavContainer>
        <Grid>
          {routes
            .filter((route) => route.path !== pathname)
            .map((route) => (
              <Card key={route.path}>
                <Link href={route.path}>
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
  height: 100vh;

  * {
    transition: all 150ms linear;
  }

  ${Header} {
    background-color: ${isNavOpen ? 'white' : 'transparent'};
  }

  ${Title} {
    opacity: ${isNavOpen ? 1 : 0};
  }

  ${MenuButton} {
    transform: rotate(${isNavOpen ? '45deg' : '0deg'});
  }

  ${NavContainer} {
    overflow-y: ${isNavOpen ? 'auto' : 'hidden'};
  }

  ${Grid} {
    opacity: ${isNavOpen ? 1 : 0};
    pointer-events: ${isNavOpen ? 'auto' : 'none'};
  }
`
);

const Header = styled.header`
  display: flex;
  padding: 16px;
  align-items: center;
  justify-content: space-between;

  @media screen and (min-width: 600px) {
    padding: 16px 24px;
  }
`;

const MenuButton = styled.button`
  cursor: pointer;
  font-family: Arial, sans-serif;
  width: 32px;
  height: 32px;
  border: 0;
  outline: 0;
  background: lightgray;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  line-height: 2rem;
`;

const Cross = styled.div`
  font-size: 1.5rem;
  line-height: 2rem;
`;

const NavContainer = styled.nav`
  display: flex;
  width: 100vw;
  height: calc(100vh - 64px);
  flex-direction: column;
  flex-grow: 1;
`;

const Grid = styled.ul`
  display: grid;
  grid-gap: 24px;
  max-width: 100vw;

  @media screen and (min-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CardTitle = styled.h2`
  color: white;
  font-size: 1.25rem;
  line-height: 1.75rem;
  opacity: 0;
`;

const Card = styled.li`
  position: relative;
  height: 300px;
  background: gray;

  :hover {
    color: #333;
    background: #ccc;

    ${CardTitle} {
      color: #333;
      opacity: 1;
    }
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
