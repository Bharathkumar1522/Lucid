import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

type AnimatedTextProps = {
  text: string;
  el?: React.ElementType;
  className?: string;
  once?: boolean;
  delay?: number;
  isReady?: boolean;
};

const defaultAnimations: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.16, 1, 0.3, 1], // Cinematic ultra-smooth easing
    },
  },
};

export const AnimatedText = ({
  text,
  el: Wrapper = "span",
  className,
  once = false,
  delay = 0,
  isReady = true,
}: AnimatedTextProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.2, once });

  // Split by words, preserving natural breaks.
  const wordArray = text.split(" ");

  return (
    <Wrapper className={className}>
      <motion.span
        ref={ref}
        initial="hidden"
        animate={isInView && isReady ? "visible" : "hidden"}
        variants={{
          visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
          hidden: {},
        }}
        aria-hidden
      >
        {wordArray.map((word, wordIndex) => (
          <span className="inline-block whitespace-nowrap" key={`${word}-${wordIndex}`}>
            <motion.span
              variants={defaultAnimations}
              className="inline-block origin-bottom transform-gpu will-change-transform"
            >
              {word}
            </motion.span>
            <span className="inline-block">&nbsp;</span>
          </span>
        ))}
      </motion.span>
      <span className="sr-only">{text}</span>
    </Wrapper>
  );
};
