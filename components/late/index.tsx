import * as React from 'react';
import styled from 'styled-components';
import { City } from './scene/city';
import { Rainfall } from './scene/rain';
import { Home, Cat } from './scene/home';
import { useDebouncedResize } from 'utils/react';
import { randomNumberBetween } from 'utils/numbers';

export const Late: React.FC = () => {
  const animationFrameId = React.useRef<number>(null);

  const cityCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const cityRef = React.useRef<City>(null);

  useDebouncedResize(() => {
    const cityCanvas = cityCanvasRef.current;

    const createCity = (width: number, height: number, dpi: number) => {
      cityCanvas.width = width * dpi;
      cityCanvas.height = height * dpi;

      const ctx = cityCanvas.getContext('2d');
      const city = new City(ctx);
      cityRef.current = city;
      city.render();
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;

    createCity(innerWidth, innerHeight, devicePixelRatio);
  }, []);

  const rainCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const rainfallRef = React.useRef<Rainfall>();

  useDebouncedResize(() => {
    const rainCanvas = rainCanvasRef.current;

    const createRain = (width: number, height: number, dpi: number) => {
      rainCanvas.width = width * dpi;
      rainCanvas.height = height * dpi;

      const ctx = rainCanvas.getContext('2d');

      ctx.rotate(0.2);

      let rainfall = rainfallRef.current;

      if (rainfall == null) {
        rainfallRef.current = new Rainfall(ctx);
      } else {
        rainfall = rainfallRef.current;

        rainfall.canvasWidth = width * dpi;
        rainfall.canvasHeight = height * dpi;
      }
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;

    createRain(innerWidth, innerHeight, devicePixelRatio);

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

    const createHome = (width: number, height: number, dpi: number) => {
      homeCanvas.width = width * dpi;
      homeCanvas.height = height * dpi;

      const ctx = homeCanvas.getContext('2d');

      const home = new Home(ctx);
      homeRef.current = home;
      home.render();

      clockIntervalRef.current && window.clearTimeout(clockIntervalRef.current);
      clockIntervalRef.current = window.setInterval(
        () => home.clock.tick(),
        1000
      );
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;

    createHome(innerWidth, innerHeight, devicePixelRatio);
  }, []);

  const catCanvasRef = React.useRef<HTMLCanvasElement>(null);
  const catRef = React.useRef<Cat>();

  useDebouncedResize(() => {
    const catCanvas = catCanvasRef.current;

    const adoptCat = (width: number, height: number, dpi: number) => {
      catCanvas.width = width * dpi;
      catCanvas.height = height * dpi;

      const ctx = catCanvas.getContext('2d');

      const cat = new Cat(ctx);
      catRef.current = cat;
      cat.render();
    };

    const { innerWidth, innerHeight, devicePixelRatio } = window;

    adoptCat(innerWidth, innerHeight, devicePixelRatio);
  }, []);

  React.useEffect(() => {
    const rainfall = rainfallRef.current;
    const cat = catRef.current;

    function animate() {
      const raindropsToAdd = randomNumberBetween(2, 8);

      for (let i = 0; i < raindropsToAdd; i++) {
        rainfall.add();
      }

      rainfall.tick();
      cat.tick();

      const rainCanvas = rainCanvasRef.current;
      const rainCtx = rainCanvas.getContext('2d');

      rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);

      rainfall.render();

      window.requestAnimationFrame(animate);
    }

    animationFrameId.current = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(animationFrameId.current);
    };
  }, []);

  return (
    <Wrapper>
      <Canvas ref={cityCanvasRef} />
      <Canvas ref={rainCanvasRef} />
      <Canvas ref={homeCanvasRef} />
      <Canvas ref={catCanvasRef} />
    </Wrapper>
  );
};

const Wrapper = styled.main`
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
`;

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
