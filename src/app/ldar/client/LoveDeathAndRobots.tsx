'use client';

import { useDetailsSearchParams } from '@/app/hooks';
import { Drawer, FullScreenMain } from '@/components';
import { cn } from '@/utils/cn';
import { shuffle } from '@/utils/numbers';
import { AnimatePresence, motion, useAnimation } from 'motion/react';
import { useCallback, useEffect, useState } from 'react';
import { Plus, PlusCircle } from 'react-feather';
import { Slot } from './Slot';
import { characters } from './characters';
import styles from './love-death-and-robots.module.css';

type State = {
  key: number;
  characterGroups: string[][];
};

type HandleProps = React.ComponentProps<typeof motion.button> & {
  className?: string;
};

function Handle({ className, ...props }: HandleProps) {
  return (
    <motion.button
      className={cn(
        'relative cursor-pointer rounded-full border-2 border-slate-100 bg-transparent hover:bg-slate-100/20 active:bg-slate-200/10',
        styles.handle,
        className,
      )}
      {...props}
    />
  );
}

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
  }, [runSlots]);

  const controls = useAnimation();

  async function pullHandleSequence() {
    window.setTimeout(runSlots, 150);

    await controls.start({ rotateZ: 180 });

    await controls.start({ rotateZ: 0 });
  }

  return (
    <FullScreenMain
      className={cn(
        'flex flex-col items-center justify-center gap-12',
        styles.root,
      )}
    >
      <Handle animate={controls} onClick={pullHandleSequence}>
        <Plus strokeWidth={1} className="h-full w-full" />
      </Handle>

      <div
        className={cn('flex overflow-hidden select-none', styles.slotWindow)}
      >
        {state.characterGroups.map((characters, i) => (
          <Slot key={String(state.key + i)} index={i}>
            {characters}
          </Slot>
        ))}
      </div>

      <AnimatePresence>
        {areDetailsOpen && (
          <Drawer>
            <p>
              A recreation of the slot machine-style icon animation from the
              series <em>Love Death + Robots</em> &mdash; click the{' '}
              <PlusCircle className="inline" /> to pull.
            </p>
            <p>
              Icons by{' '}
              <a
                href="https://dribbble.com/shots/6227334-Love-Death-Robots-Icons-Font"
                target="_blank"
              >
                Michael Chernayk + Ofer Ariel
              </a>
              .
            </p>
          </Drawer>
        )}
      </AnimatePresence>
    </FullScreenMain>
  );
}

function shuffleCharacters() {
  return shuffle(characters);
}
