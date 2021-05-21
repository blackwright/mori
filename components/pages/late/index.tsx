import * as React from 'react';
import styled, { css } from 'styled-components';
import { motion } from 'framer-motion';
import { City } from './scene/city';
import { Rainfall } from './scene/rain';
import { Home, Cat } from './scene/home';
import { useDebouncedResize } from 'utils/react';
import { useAnimations } from './animations';

export const Late: React.FC = () => {
  const animationFrameId = React.useRef<number>(null);

  const cityCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const cityRef = React.useRef<City>(null);

  useDebouncedResize(() => {
    const cityCanvas = cityCanvasRef.current;

    const createCity = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;

      cityCanvas.width = innerWidth * devicePixelRatio;
      cityCanvas.height = innerHeight * devicePixelRatio;

      const ctx = cityCanvas.getContext('2d');
      const city = new City(ctx);
      cityRef.current = city;
      city.render();
    };

    createCity();
  }, []);

  const rainCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const rainfallRef = React.useRef<Rainfall>();

  useDebouncedResize(() => {
    const rainCanvas = rainCanvasRef.current;

    const createRain = () => {
      const { innerWidth, innerHeight, devicePixelRatio } = window;

      rainCanvas.width = innerWidth * devicePixelRatio;
      rainCanvas.height = innerHeight * devicePixelRatio;

      const ctx = rainCanvas.getContext('2d');

      let rainfall = rainfallRef.current;

      if (rainfall == null) {
        rainfallRef.current = new Rainfall(ctx);
      } else {
        rainfall = rainfallRef.current;

        rainfall.canvasWidth = innerWidth * devicePixelRatio;
        rainfall.canvasHeight = innerHeight * devicePixelRatio;
      }
    };

    createRain();

    return () => {
      if (rainfallRef.current) {
        rainfallRef.current = null;
      }
    };
  }, []);

  const homeCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const homeRef = React.useRef<Home>();
  const clockIntervalRef = React.useRef<number>();

  useDebouncedResize(() => {
    const homeCanvas = homeCanvasRef.current;

    const { innerWidth, innerHeight, devicePixelRatio } = window;

    const createHome = () => {
      homeCanvas.width = innerWidth * devicePixelRatio;
      homeCanvas.height = innerHeight * devicePixelRatio;

      const ctx = homeCanvas.getContext('2d');

      const home = new Home(ctx);
      homeRef.current = home;
      home.render();

      clockIntervalRef.current &&
        window.clearInterval(clockIntervalRef.current);
      clockIntervalRef.current = window.setInterval(
        () => home.clock.tick(),
        1_000
      );
    };

    createHome();
  }, []);

  const catCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const catRef = React.useRef<Cat>();

  useDebouncedResize(() => {
    const catCanvas = catCanvasRef.current;

    const { innerWidth, innerHeight, devicePixelRatio } = window;

    const adoptCat = () => {
      catCanvas.width = innerWidth * devicePixelRatio;
      catCanvas.height = innerHeight * devicePixelRatio;

      const ctx = catCanvas.getContext('2d');

      const cat = new Cat(ctx);
      catRef.current = cat;
      cat.render();
    };

    adoptCat();
  }, []);

  const { grayscaleFlash, outdoorFlash, indoorFlash, flashSequence } =
    useAnimations();

  React.useEffect(() => {
    flashSequence();

    const rainfall = rainfallRef.current;
    const cat = catRef.current;

    function animate() {
      rainfall.add();
      rainfall.tick();
      cat.tick();

      const rainCanvas = rainCanvasRef.current;
      const rainCtx = rainCanvas.getContext('2d');

      rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

      rainfall.render();

      window.requestAnimationFrame(animate);
    }

    animationFrameId.current = window.requestAnimationFrame(animate);

    document.addEventListener('click', flashSequence);

    return () => {
      window.cancelAnimationFrame(animationFrameId.current);
      document.removeEventListener('click', flashSequence);
    };
  }, []);

  return (
    <Wrapper animate={grayscaleFlash}>
      <CityCanvas ref={cityCanvasRef} />
      <Light animate={outdoorFlash} />
      <RainCanvas ref={rainCanvasRef} />
      <Canvas ref={homeCanvasRef} />
      <Canvas ref={catCanvasRef} />
      <Light animate={indoorFlash} />
    </Wrapper>
  );
};

const fullScreenStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Wrapper = styled(motion.main)`
  ${fullScreenStyle}
  background: #171717;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  ${fullScreenStyle}
`;

const CityCanvas = styled(Canvas)`
  filter: blur(2px);
`;

const RainCanvas = styled(Canvas)`
  transform: rotate(15deg);
`;

const Light = styled(motion.div)`
  ${fullScreenStyle}
  background-color: white;
  opacity: 0;
`;
