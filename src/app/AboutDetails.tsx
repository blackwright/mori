'use client';

import { Drawer } from '@/components';
import { AnimatePresence } from 'motion/react';
import { useDetailsSearchParams } from './hooks';

export function AboutDetails() {
  const [areDetailsOpen] = useDetailsSearchParams();

  return (
    <AnimatePresence>
      {areDetailsOpen && (
        <Drawer>
          <p>
            When viewing a code experiment, this drawer will share more details
            about it.
          </p>
          <p>
            Since this is the <strong>About</strong> page, here are some details
            about me:
          </p>
          <ul className="list-inside list-disc">
            <li>Grew up in the suburbs of Boston, MA</li>
            <li>Met my wife teaching English in China</li>
            <li>Learned to code because I wanted to make designs come alive</li>
            <li>
              I like PC gaming, currently getting sucked into a WH40K rabbit
              hole
            </li>
            <li>
              Will usually order the burger, even if a questionable choice for
              the restaurant
            </li>
          </ul>
        </Drawer>
      )}
    </AnimatePresence>
  );
}
