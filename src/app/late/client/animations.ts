import { useCallback, useMemo } from 'react';
import { useAnimation } from 'framer-motion';

const LIGHTNING_ENTER_DURATION = 0.025;
const LIGHTNING_EXIT_DURATION = 0.4;

export function useAnimations() {
  const grayscaleFlash = useAnimation();
  const outdoorFlash = useAnimation();
  const indoorFlash = useAnimation();

  const grayscaleFlashSequence = useCallback(async () => {
    await grayscaleFlash.start(
      { filter: 'grayscale(0%)' },
      { duration: LIGHTNING_ENTER_DURATION },
    );

    await grayscaleFlash.start(
      { filter: 'grayscale(100%)' },
      { duration: LIGHTNING_EXIT_DURATION },
    );
  }, [grayscaleFlash]);

  const outdoorFlashSequence = useCallback(async () => {
    await outdoorFlash.start(
      { opacity: 0.25 },
      { duration: LIGHTNING_ENTER_DURATION },
    );

    await outdoorFlash.start(
      { opacity: 0 },
      { duration: LIGHTNING_EXIT_DURATION },
    );
  }, [outdoorFlash]);

  const indoorFlashSequence = useCallback(async () => {
    await indoorFlash.start(
      { opacity: 0.02 },
      { duration: LIGHTNING_ENTER_DURATION },
    );

    await indoorFlash.start(
      { opacity: 0 },
      { duration: LIGHTNING_EXIT_DURATION },
    );
  }, [indoorFlash]);

  const flashSequence = useCallback(async () => {
    grayscaleFlashSequence();
    outdoorFlashSequence();
    indoorFlashSequence();
  }, [grayscaleFlash, outdoorFlashSequence, indoorFlashSequence]);

  return useMemo(
    () => ({ grayscaleFlash, outdoorFlash, indoorFlash, flashSequence }),
    [grayscaleFlash, outdoorFlash, indoorFlash, flashSequence],
  );
}
