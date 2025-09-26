import { motion } from 'motion/react';

type Props = {
  children: string;
  onComplete?: () => void;
  className?: string;
};

const sentenceVariants = {
  hidden: {},
  visible: { opacity: 1, transition: { staggerChildren: 0.03 } },
};

export const letterVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { opacity: { duration: 0 } } },
};

export function Typewriter({ children, onComplete, className }: Props) {
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
