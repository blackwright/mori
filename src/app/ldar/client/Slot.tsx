import tw from 'twin.macro';
import { motion } from 'framer-motion';
import { Icon } from './Icon';

type Props = {
  index: number;
  children: string[];
};

export function Slot({ index, children }: Props) {
  return (
    <Container>
      {children.map((code, i) => {
        const initialRotateX = (i * 360) / children.length;

        return (
          <MotionIcon
            key={code + i}
            style={{ originZ: -750, rotateX: initialRotateX }}
            animate={{ rotateX: -360 * (index + 1) + initialRotateX }}
            transition={{ type: 'tween', duration: 1 + index / 2 }}
          >
            {code}
          </MotionIcon>
        );
      })}
    </Container>
  );
}

const Container = tw.div`
  relative
  [width: 100px]
  [height: 100px]
  [perspective: 1000cm]
`;

const MotionIcon = motion(Icon);
