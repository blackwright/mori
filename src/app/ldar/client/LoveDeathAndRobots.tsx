'use client';

import tw from 'twin.macro';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import { PlusCircle } from 'react-feather';
import { Plus } from 'react-feather';
import { useDetailsSearchParams } from '@/app/hooks';
import { FullScreenMain, Drawer } from '@/components';
import { shuffle } from '@/utils/numbers';
import { characters } from './characters';
import { GlobalStyles } from './GlobalStyles';
import { Slot } from './Slot';

type State = {
  key: number;
  characterGroups: string[][];
};

export function LoveDeathAndRobots() {
  const [areDetailsOpen] = useDetailsSearchParams();

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
  }, []);

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

          <AnimatePresence>
            {areDetailsOpen && (
              <Drawer>
                <p>A recreation of the slot machine-style icon animation from the series <em>Love Death + Robots</em> &mdash; click the <PlusCircle tw="inline" /> to pull.</p>
                <p>
                  Icons by <a href="https://dribbble.com/shots/6227334-Love-Death-Robots-Icons-Font" target="_blank">Michael Chernayk + Ofer Ariel</a>.
                </p>
              </Drawer>
            )}
          </AnimatePresence>
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
  border-2
  border-slate-100
  rounded-full
  hover:bg-slate-100/20
  active:bg-slate-200/10
`;

function shuffleCharacters() {
  return shuffle(characters);
}
