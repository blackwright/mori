import * as React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { GlobalStyle } from './GlobalStyle';
import { Slot } from './slot';
import { shuffleCharacters } from './utils';

type State = {
  key: number;
  characterGroups: string[][];
};

export const LDaR = () => {
  const [state, setState] = React.useState<State>({
    key: 0,
    characterGroups: []
  });

  const runSlots = React.useCallback(() => {
    setState((prevState) => ({
      key: prevState.key + 1,
      characterGroups: [...new Array(3)].map(shuffleCharacters)
    }));
  }, [setState]);

  React.useEffect(() => {
    runSlots();
  }, []);

  const controls = useAnimation();

  async function pullHandleSequence() {
    window.setTimeout(runSlots, 150);

    await controls.start({ rotateZ: 180 });

    await controls.start({ rotateZ: 0 });
  }

  return (
    <>
      <GlobalStyle />
      <Container>
        <Handle animate={controls} onTap={pullHandleSequence}>
          +
        </Handle>

        <SlotWindow>
          {state.characterGroups.map((characters, i) => (
            <Slot key={String(state.key + i)} index={i}>
              {characters}
            </Slot>
          ))}
        </SlotWindow>

        <FontCredit href="https://uxuihero.com/love-death-robots-free-fan-iconfont/">
          Icons by Michael Chernayk + Ofer Ariel
        </FontCredit>
      </Container>
    </>
  );
};

const Container = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const SlotWindow = styled.div`
  display: flex;
  width: 300px;
  height: 100px;
  overflow: hidden;
`;

const Handle = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: white;
  border-radius: 50%;
  font-family: Arial, sans-serif;
  font-size: 3rem;
  padding-top: 2px;
  cursor: pointer;
  outline: 0;
  border: 3px solid white;
  width: 48px;
  height: 48px;
  margin-bottom: 48px;
`;

const FontCredit = styled.a`
  font-family: 'Source Sans Pro', Arial, Helvetica, sans-serif;
  color: white;
  position: absolute;
  bottom: 24px;
  right: 16px;
  color: white;
  text-decoration: underline;

  @media screen and (min-width: 600px) {
    right: 24px;
  }
`;
