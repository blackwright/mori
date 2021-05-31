import * as React from 'react';
import NextImage from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { slides } from './slides';

export const Josemily: React.FC = () => {
  const [index, setIndex] = React.useState(0);

  React.useEffect(() => {
    slides.forEach((slide) => {
      new Image().src = slide.src;
    });
  }, []);

  const goToPreviousSlide = () => {
    if (index < 1) {
      return;
    }

    setIndex((prevIndex) => prevIndex - 1);
  };

  const goToNextSlide = () => {
    if (index >= slides.length - 1) {
      return;
    }

    setIndex((prevIndex) => prevIndex + 1);
  };

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          return goToNextSlide();
        case 'ArrowLeft':
        case 'ArrowUp':
          return goToPreviousSlide();
        default:
          return;
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [goToNextSlide, goToPreviousSlide]);

  return (
    <Background>
      <TopLeft />
      <TopRight />
      <AnimatePresence>
        <Slide
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <NextImage
            src={slides[index].src}
            layout="fill"
            objectFit="contain"
            unoptimized={true}
          />

          {!!slides[index].date && (
            <DateContainer>
              <Date>{slides[index].date}</Date>
            </DateContainer>
          )}
        </Slide>
      </AnimatePresence>
    </Background>
  );
};

const Background = styled.div`
  position: relative;
  width: 100vw;
  height: 100%;
  background-color: #f8f6f4;
`;

const TopLeft = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-image: url('/josemily/background/confetti-topleft.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top left;
  width: 50%;
  height: 600px;
`;

const TopRight = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background-image: url('/josemily/background/confetti-topright.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top right;
  width: 50%;
  height: 600px;
`;

const Slide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
`;

const DateContainer = styled.div`
  position: absolute;
  top: 24px;
  width: 100vw;
  text-align: center;
`;

const Date = styled.span`
  font-size: 2rem;
  background-color: black;
  padding: 8px 16px;
  border-radius: 8px;
`;
