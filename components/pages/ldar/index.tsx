import * as React from 'react';
import styled from 'styled-components';
import { motion, useAnimation } from 'framer-motion';
import { Link } from 'components/shared';
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
        <Handle animate={controls} onTap={pullHandleSequence} />

        <SlotWindow>
          {state.characterGroups.map((characters, i) => (
            <Slot key={String(state.key + i)} index={i}>
              {characters}
            </Slot>
          ))}
        </SlotWindow>

        <FontCredit
          href="https://uxuihero.com/love-death-robots-free-fan-iconfont/"
          fontSize="1rem"
          p={4}
        >
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
  height: 100%;
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
  position: relative;
  background: transparent;
  color: white;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  border: 3px solid white;
  width: 40px;
  height: 40px;
  margin-bottom: 48px;

  :after {
    content: '+';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    font-family: Arial, sans-serif;
    font-size: 8rem;
    padding-top: 2px;
  }
`;

const FontCredit = styled(Link)`
  position: absolute;
  bottom: 0;
  right: 0;
`;
