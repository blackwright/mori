'use client';

import tw from 'twin.macro';
import { motion, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { Plus } from 'react-feather';
import { FullScreenMain } from '@/components';
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
      // Commented code contains only the title screen icons:
      // characterGroups: [[characters[30]], [characters[0]], [characters[15]]],
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
        <Handle animate={controls} onClick={pullHandleSequence}>
          <Plus stroke-width="1" tw="w-full h-full" />
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
  select-none
`;

const Handle = tw(motion.button)`
  relative
  bg-transparent
  cursor-pointer
  [width: 40px]
  [height: 40px]
  border
  border-slate-100
  rounded-full
  hover:bg-slate-100/20
  active:bg-slate-200/10
`;

const FontCredit = tw.a`
  absolute
  bottom-0
  right-0
`;

function shuffleCharacters() {
  return shuffle(characters);
}
