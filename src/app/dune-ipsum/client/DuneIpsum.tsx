'use client';

import { Canvas } from '@react-three/fiber';
import { useCallback, useState } from 'react';
import { MathUtils } from 'three';
import { FullScreenMain } from '@/components/FullScreenMain';
import { Scene } from './scene';
import { InterfaceWrapper } from './styled';
import { Controls } from './ui/controls';
import { Generator } from './ui/generator';
import { getRandomQuote } from './ui/generator/words';
import { ImageData } from './ui/image-data';

export function DuneIpsum() {
  const [count, setCount] = useState(1);

  const [text, setText] = useState(getRandomQuote());

  const [position, setPosition] = useState<Float32Array | null>(null);

  const [isRendering, setIsRendering] = useState(true);

  const handleImageData = useCallback(
    (imageData: ImageData, particleGap: number) => {
      // canvas image data is a one-dimensional array of RGBA values per pixel
      const pointCoords: number[] = [];

      let i = 0;

      while (i < imageData.data.length) {
        const alpha = imageData.data[i + 3];

        if (alpha > 0) {
          const x = ((i / 4) % imageData.width) - imageData.width / 2;
          const y = -((i / 4 - x) / imageData.width - imageData.height / 2);

          pointCoords.push(x, y - 25, 0);
        }

        i += MathUtils.randInt(1, particleGap) * 4;
      }

      setPosition(Float32Array.from(pointCoords));
    },
    [],
  );

  const handleComplete = useCallback(() => {
    setIsRendering(false);
  }, []);

  const handleChange = (newText: string) => {
    if (isRendering) {
      return;
    }

    setIsRendering(true);

    setText(newText);
  };

  return (
    <FullScreenMain>
      {position && (
        <Canvas
          orthographic={true}
          camera={{ position: [0, 0, 1], far: 500 }}
          resize={{ scroll: true, debounce: { scroll: 50, resize: 0 } }}
        >
          <Scene
            position={position}
            isRendering={isRendering}
            onComplete={handleComplete}
          />
        </Canvas>
      )}
      <Generator
        paragraphs={count}
        minSentences={1}
        maxSentences={2}
        onChange={handleChange}
      >
        {(handleGenerate) => (
          <InterfaceWrapper>
            <Controls
              text={text}
              count={count}
              onChangeCount={setCount}
              onGenerate={handleGenerate}
              disabled={isRendering}
            />

            <ImageData text={text} onChange={handleImageData} />
          </InterfaceWrapper>
        )}
      </Generator>
    </FullScreenMain>
  );
}
