import { motion } from 'motion/react';
import { useMemo } from 'react';

type Props = {
  children: string;
  stagger?: number;
  onComplete?: () => void;
  className?: string;
};

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
};

export function Typewriter({
  stagger = 0.01,
  children,
  onComplete,
  className,
}: Props) {
  const sentenceVariants = useMemo(
    () => ({
      hidden: {},
      visible: { opacity: 1, transition: { staggerChildren: stagger } },
    }),
    [stagger],
  );

  return (
    <motion.div
      variants={sentenceVariants}
      initial="hidden"
      className={className}
      onAnimationComplete={onComplete}
      animate="visible"
    >
      {children.split('').map((char, i) => (
        <motion.span key={`${char}-${i}`} variants={letterVariants}>
          {char}
        </motion.span>
      ))}
    </motion.div>
  );
}
