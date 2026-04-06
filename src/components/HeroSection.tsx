import React, { useRef, useState, useEffect } from "react";
import Navbar from "./Navbar";
import { AnimatedText } from "./AnimatedText";
import { motion, useScroll, useTransform } from "framer-motion";

type HeroSectionProps = {
  disableHeavyAnimations?: boolean;
};

const HighlightItem: React.FC<{
  title: string;
  content: string;
}> = ({ title, content }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-2 px-2 text-center">
      <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
        {title}
      </span>
      <p className="text-xl font-medium tracking-wide text-white [text-shadow:0_2px_16px_rgba(0,0,0,0.6)] md:text-2xl">
        {content}
      </p>
    </div>
  );
};

const HeroContent = ({ animateHover }: { animateHover: boolean }) => {
  return (
    <div className="relative z-20 mx-auto flex w-full max-w-[1500px] flex-col justify-end gap-10 px-4 pb-10 pt-24 sm:gap-16 sm:px-5 sm:pb-16 sm:pt-28 md:px-10 xl:px-16 xl:pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto max-w-[900px] text-center"
      >
        <span className="mb-5 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[10.5px] font-semibold uppercase tracking-[0.5em] text-white/80 [text-shadow:0_2px_12px_rgba(0,0,0,0.5)]">
          Lucid Gravity
        </span>
        <AnimatedText
          el="h1"
          text="A more cinematic electric SUV."
          className="mx-auto max-w-[14ch] text-[clamp(2rem,11vw,5.5rem)] font-medium leading-[0.98] tracking-tight text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.6)]"
          delay={0.3}
        />
        <p className="mx-auto mt-6 max-w-[34rem] text-sm leading-relaxed text-white/90 [text-shadow:0_2px_20px_rgba(0,0,0,0.6)] sm:text-base">
          Spacious enough for the long weekend, polished enough for the city,
          and quiet enough to make every mile feel intentional.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 sm:flex-row sm:gap-4">
          <motion.a
            href="#overview"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-white px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-black shadow-[0_4px_30px_rgba(255,255,255,0.15)] transition hover:bg-white/90"
            whileHover={animateHover ? { y: -2, scale: 1.02 } : undefined}
            whileTap={animateHover ? { scale: 0.98 } : undefined}
          >
            Explore Gravity
          </motion.a>
          <motion.a
            href="#reserve"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/30 bg-black/10 px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-md transition hover:border-white/50 hover:bg-white/10"
            whileHover={animateHover ? { y: -2, scale: 1.02 } : undefined}
            whileTap={animateHover ? { scale: 0.98 } : undefined}
          >
            Stay informed
          </motion.a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mx-auto mt-2 grid w-full max-w-[900px] grid-cols-2 gap-y-6 gap-x-2 sm:mt-8 sm:flex sm:flex-row sm:items-center sm:justify-between sm:gap-y-6 md:mt-12"
      >
        <HighlightItem title="Projected Range" content="Over 440 mi" />
        <div className="hidden h-10 w-px bg-white/20 sm:block" />
        <HighlightItem title="Peak Power" content="Over 800 hp" />
        <div className="hidden h-10 w-px bg-white/20 sm:block" />
        <HighlightItem title="Seating" content="Up to 7" />
        <div className="hidden h-10 w-px bg-white/20 sm:block" />
        <HighlightItem title="0-60 mph" content="Under 3.5 sec" />
      </motion.div>
    </div>
  );
};

const AnimatedHero = () => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end center"],
  });

  const videoScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.12]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  const [animateHover, setAnimateHover] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setAnimateHover(mediaQuery.matches);
  }, []);

  return (
    <div ref={wrapperRef} className="relative h-[150svh] w-full z-0">
      <section className="relative isolate z-0 flex h-[100svh] sticky top-0 w-full flex-col justify-between overflow-hidden bg-[#05080a]">
        <Navbar />
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div
            className="absolute -inset-x-[3%] -inset-y-[4%]"
            style={{ scale: videoScale, y: videoY }}
          >
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/bg-overview.jpeg"
              preload="metadata"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </motion.div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080a] via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
        </div>
        
        <motion.div style={{ y: contentY, opacity: contentOpacity }} className="relative z-10 flex h-full w-full flex-col justify-end">
          <HeroContent animateHover={animateHover} />
        </motion.div>
      </section>
    </div>
  );
};

const StaticHero = () => {
  return (
    <div className="relative h-[150svh] w-full z-0">
      <section className="relative isolate z-0 flex h-[100svh] sticky top-0 w-full flex-col justify-between overflow-hidden bg-[#05080a]">
        <Navbar />
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -inset-x-[3%] -inset-y-[4%]">
            <video
              className="h-full w-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              poster="/bg-overview.jpeg"
              preload="metadata"
            >
              <source src="/hero-video.mp4" type="video/mp4" />
            </video>
          </div>
          
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#05080a] via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_40%,rgba(0,0,0,0.5)_100%)] pointer-events-none" />
        </div>
        
        <div className="relative z-10 flex h-full w-full flex-col justify-end">
          <HeroContent animateHover={false} />
        </div>
      </section>
    </div>
  );
};

export default function HeroSection({ disableHeavyAnimations }: HeroSectionProps) {
  if (disableHeavyAnimations) {
    return <StaticHero />;
  }

  return <AnimatedHero />;
}
