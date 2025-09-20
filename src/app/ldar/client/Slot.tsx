import { cn } from '@/utils/cn';
import { motion } from 'motion/react';
import { Icon } from './Icon';
import styles from './slot.module.css';

type Props = {
  index: number;
  children: string[];
  className?: string;
};

const MotionIcon = motion(Icon);

export function Slot({ index, children, className }: Props) {
  return (
    <div className={cn('relative', styles.container, className)}>
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
