'use client';

import tw, { css, styled } from 'twin.macro';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Drawer, FullScreenMain } from '@/components';
import { useDebouncedResize } from '@/utils/react';
import { AnimatePresence } from 'framer-motion';
import { useAnimations } from './animations';
import { useDetailsSearchParams } from '@/app/hooks';
import { City } from './scene/city';
import { Cat, Home } from './scene/home';
import { Rainfall } from './scene/rain';

export function Late() {
  const animationFrameId = useRef<number | null>(null);
  const cityCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const cityRef = useRef<City | null>(null);

  const [areDetailsOpen] = useDetailsSearchParams();

  useDebouncedResize(() => {
    const createCity = () => {
      const cityCanvas = cityCanvasRef.current;

      if (cityCanvas) {
        const { innerWidth, innerHeight, devicePixelRatio } = window;

        cityCanvas.width = innerWidth * devicePixelRatio;
        cityCanvas.height = innerHeight * devicePixelRatio;

        const ctx = cityCanvas.getContext('2d')!;
        const city = new City(ctx);
        cityRef.current = city;
        city.render();
      }
    };

    createCity();
  }, []);

  const rainCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const rainfallRef = useRef<Rainfall | null>(null);

  useDebouncedResize(() => {
    const createRain = () => {
      const rainCanvas = rainCanvasRef.current;

      if (rainCanvas) {
        const { innerWidth, innerHeight, devicePixelRatio } = window;

        rainCanvas.width = innerWidth * devicePixelRatio;
        rainCanvas.height = innerHeight * devicePixelRatio;

        const ctx = rainCanvas.getContext('2d')!;

        let rainfall = rainfallRef.current;

        if (rainfall) {
          rainfall.canvasWidth = innerWidth * devicePixelRatio;
          rainfall.canvasHeight = innerHeight * devicePixelRatio;
        } else {
          rainfallRef.current = new Rainfall(ctx);
        }
      }

      return () => {
        if (rainfallRef.current) {
          rainfallRef.current = null;
        }
      };
    };

    return createRain();
  }, []);

  const homeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const homeRef = useRef<Home | null>(null);
  const clockIntervalRef = useRef<number | null>(null);

  useDebouncedResize(() => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;

    if (clockIntervalRef.current) {
      window.clearInterval(clockIntervalRef.current);
    }

    const createHome = () => {
      const homeCanvas = homeCanvasRef.current;

      if (homeCanvas) {
        homeCanvas.width = innerWidth * devicePixelRatio;
        homeCanvas.height = innerHeight * devicePixelRatio;

        const ctx = homeCanvas.getContext('2d')!;

        const home = new Home(ctx);
        homeRef.current = home;
        home.render();

        clockIntervalRef.current = window.setInterval(
          () => home.clock.tick(),
          1_000,
        );
      }
    };

    createHome();
  }, []);

  const catCanvasRef = useRef<HTMLCanvasElement>(null);
  const catRef = useRef<Cat | null>(null);

  useDebouncedResize(() => {
    const { innerWidth, innerHeight, devicePixelRatio } = window;

    const adoptCat = () => {
      const catCanvas = catCanvasRef.current;

      if (catCanvas) {
        catCanvas.width = innerWidth * devicePixelRatio;
        catCanvas.height = innerHeight * devicePixelRatio;

        const ctx = catCanvas.getContext('2d')!;

        const cat = new Cat(ctx);
        catRef.current = cat;
        cat.render();
      }
    };

    adoptCat();
  }, []);

  const { grayscaleFlash, outdoorFlash, indoorFlash, flashSequence } =
    useAnimations();

  useEffect(() => {
    flashSequence();

    function animate() {
      const rainfall = rainfallRef.current;
      const cat = catRef.current;
      const rainCanvas = rainCanvasRef.current;

      if (rainfall && cat && rainCanvas) {
        rainfall.add();
        rainfall.tick();
        cat.tick();

        const rainCtx = rainCanvas.getContext('2d')!;

        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

        rainfall.render();

        window.requestAnimationFrame(animate);
      }
    }

    animationFrameId.current = window.requestAnimationFrame(animate);

    document.addEventListener('click', flashSequence);

    return () => {
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }

      document.removeEventListener('click', flashSequence);

      grayscaleFlash.stop();
      outdoorFlash.stop();
      indoorFlash.stop();
    };
  }, []);

  return (
    <MotionBackground animate={grayscaleFlash} tw="cursor-pointer">
      <CityCanvas ref={cityCanvasRef} />
      <Light animate={outdoorFlash} />
      <RainCanvas ref={rainCanvasRef} />
      <Canvas ref={homeCanvasRef} />
      <Canvas ref={catCanvasRef} />
      <Light animate={indoorFlash} />

      <AnimatePresence>
        {areDetailsOpen && (
          <Drawer>
            <p>An exercise in drawing on HTML canvas &mdash; click for lightning.</p>
            <p>The scene is built with layers of canvas &mdash; the city buildings, the window, the rain, the home interior, and the cat are all rendered on separate canvas elements to make animating through repaints possible.</p>
            <p>Everything is sized based on relative measurements, and everything will attempt to repaint itself whenever the screen size changes.</p>
            <p>Certain elements, such as the buildings and the artwork in the home, are rendered with a degree of randomization so they appear differently on each page load.</p>
            <p>I learned that drawing shapes with math is fun to figure out, but very time-consuming.</p>
          </Drawer>
        )}
      </AnimatePresence>
    </MotionBackground>
  );
}

const fullScreenStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const MotionBackground = motion(FullScreenMain);

const Canvas = styled.canvas`
  ${fullScreenStyle}
`;

const CityCanvas = styled(Canvas)`
  filter: blur(2px);
`;

const RainCanvas = styled(Canvas)`
  transform: rotate(15deg);
`;

const Light = styled(motion.div)(() => [
  fullScreenStyle,

  tw`
    bg-white
    opacity-0
  `,
]);
