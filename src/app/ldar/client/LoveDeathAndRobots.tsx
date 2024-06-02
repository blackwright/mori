'use client';

import tw from 'twin.macro';
import { motion, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { FullScreenMain } from '@/components/FullScreenMain';
import { shuffle } from '@/utils/numbers';
import { characters } from './characters';
import { GlobalStyles } from './GlobalStyles';
import { Slot } from './Slot';

type State = {
  key: number;
  characterGroups: string[][];
};

export function LoveDeathAndRobots() {
  const [state, setState] = useState<State>({
    key: 0,
    characterGroups: [],
  });

  const runSlots = useCallback(() => {
    setState((prevState) => ({
      key: prevState.key + 1,
      characterGroups: [...new Array(3)].map(shuffleCharacters),
    }));
  }, [setState]);

  useEffect(() => {
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
      <GlobalStyles />

      <FullScreenMain tw="flex flex-col gap-12 items-center justify-center">
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

        <FontCredit
          href="https://uxuihero.com/love-death-robots-free-fan-iconfont/"
          tw="p-2 lg:p-4"
        >
          Icons by Michael Chernayk + Ofer Ariel
        </FontCredit>
      </FullScreenMain>
    </>
  );
}

const SlotWindow = tw.div`
  flex
  [width: 300px]
  [height: 100px]
  overflow-hidden
`;

const Handle = tw(motion.button)`
  flex
  items-center
  justify-center
  bg-transparent
  cursor-pointer
  rounded-full
  [border-width: 3px]
  border-white
  [width: 40px]
  [height: 40px]
  [font-family: Arial, sans-serif]
  [font-size: 8rem]
`;

const FontCredit = tw.a`
  absolute
  bottom-0
  right-0
`;

function shuffleCharacters() {
  return shuffle(characters);
}
