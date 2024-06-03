'use client';

import 'twin.macro';
import { useState } from 'react';
import { RotateCcw } from 'react-feather';
import { Button, FullScreenMain } from '@/components';
import { Circle } from './Circle';
import { COLORS } from './colors';

export function LoadingGrid() {
  const [key, setKey] = useState(0);

  return (
    <FullScreenMain tw="flex items-center justify-center">
      <div tw="flex flex-col items-center gap-8">
        <Button onClick={() => setKey((prevKey) => prevKey + 1)}>
          <RotateCcw />
        </Button>

        <div key={key} tw="grid gap-2 [grid-template-columns: repeat(5, 3rem)]">
          {COLORS.map((color, i) => (
            <Circle key={color} color={color} index={i} />
          ))}
        </div>
      </div>
    </FullScreenMain>
  );
}
