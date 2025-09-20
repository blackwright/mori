import { motion } from 'motion/react';
import { Icon } from './Icon';

type Props = {
  index: number;
  children: string[];
};

const MotionIcon = motion(Icon);

export function Slot({ index, children }: Props) {
  return (
    <div className="relative [height:100px] [width:100px] [perspective:1000cm]">
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
    </div>
  );
}
