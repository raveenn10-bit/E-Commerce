"use client";

import { motion, Transition, Variants } from "framer-motion";

interface TextProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  transition?: Transition;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  repeatDelay?: number;
  className?: string;
  onClick?: () => void;
}

const BreathingText = ({
  label,
  fromFontVariationSettings,
  toFontVariationSettings,
  transition = {
    duration: 0.8,
    ease: "easeInOut",
  },
  staggerDuration = 0.03,
  staggerFrom = "first",
  repeatDelay = 0.05,
  className = "",
  onClick,
  ...props
}: TextProps) => {
  const fromMatch = fromFontVariationSettings.match(/'wght'\s+(\d+)/);
  const toMatch = toFontVariationSettings.match(/'wght'\s+(\d+)/);
  const fromWeight = fromMatch ? parseInt(fromMatch[1], 10) : 400;
  const toWeight = toMatch ? parseInt(toMatch[1], 10) : 800;

  const letterVariants: Variants = {
    initial: {
      fontVariationSettings: fromFontVariationSettings,
      fontWeight: fromWeight,
    },
    animate: (i: number) => ({
      fontVariationSettings: toFontVariationSettings,
      fontWeight: toWeight,
      transition: {
        ...transition,
        repeat: Infinity,
        repeatType: "mirror",
        delay: i * staggerDuration,
        repeatDelay: repeatDelay,
      },
    }),
  };

  const getCustomIndex = (index: number, total: number) => {
    if (typeof staggerFrom === "number") {
      return Math.abs(index - staggerFrom);
    }
    switch (staggerFrom) {
      case "first":
        return index;
      case "last":
        return total - 1 - index;
      case "center":
      default:
        return Math.abs(index - Math.floor(total / 2));
    }
  };

  const lines = label.split("\n");
  let globalIndex = 0;

  return (
    <span className={`${className}`} onClick={onClick} {...props}>
      {lines.map((line, lineIdx) => {
        const words = line.split(" ");
        return (
          <span key={lineIdx} className="block">
            {words.map((word, wordIdx) => {
              const letters = word.split("");
              return (
                <span key={wordIdx} className="inline-block whitespace-nowrap">
                  {letters.map((letter) => {
                    const currentIndex = globalIndex++;
                    return (
                      <motion.span
                        key={currentIndex}
                        className="inline-block whitespace-pre"
                        aria-hidden="true"
                        variants={letterVariants}
                        initial="initial"
                        animate="animate"
                        custom={getCustomIndex(currentIndex, label.length)}
                      >
                        {letter}
                      </motion.span>
                    );
                  })}
                  {wordIdx < words.length - 1 && (
                    <span className="inline-block whitespace-pre"> </span>
                  )}
                </span>
              );
            })}
          </span>
        );
      })}
      <span className="sr-only">{label}</span>
    </span>
  );
};

export { BreathingText };
