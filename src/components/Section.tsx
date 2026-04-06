import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";
import Image, { StaticImageData } from "next/image";
import { AnimatedText } from "./AnimatedText";

type SectionProps = {
  id: string;
  image: StaticImageData;
  tag: string;
  label: string;
  title: string;
  description: string;
  details: string[];
  align?: "left" | "right";
  focus?: string;
  disableHeavyAnimations?: boolean;
  priority?: boolean;
};

type SectionPanelProps = {
  tag: string;
  label: string;
  title: string;
  description: string;
  details: string[];
  align?: "left" | "right";
  animateDetailCards: boolean;
};

const SectionPanel = ({
  tag,
  label,
  title,
  description,
  details,
  align = "left",
  animateDetailCards,
}: SectionPanelProps) => {
  const isRight = align === "right";

  return (
    <div className="relative z-20 mx-auto flex min-h-[100svh] w-full max-w-[1600px] items-end px-4 py-4 sm:px-5 sm:py-6 md:items-center md:px-10 md:py-8 xl:px-16">
      <motion.div
        initial={{ y: 22 }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="grid w-full gap-6 md:gap-10 lg:grid-cols-12"
      >
        <div
          className={`lg:col-span-7 ${isRight ? "lg:col-start-6 lg:ml-auto" : ""}`}
        >
          <div className="relative w-full max-w-[680px] py-10 md:py-16 text-left">
            <div className="relative z-10">
              <span className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.24em] text-white [text-shadow:0_1px_20px_rgba(0,0,0,0.55)] sm:text-[11px] sm:tracking-[0.28em]">
                {tag}
                <span className="h-px w-10 bg-white/70" />
                <span className="text-white/90">{label}</span>
              </span>
              <AnimatedText
                el="h2"
                text={title}
                className="mt-5 max-w-[13ch] text-[clamp(1.8rem,11vw,4rem)] font-medium leading-[0.98] tracking-tight text-white [text-shadow:0_4px_40px_rgba(0,0,0,0.5)]"
                once={false}
                delay={0.4}
              />
              <p className="mt-5 max-w-[35rem] text-sm leading-relaxed text-white/90 [text-shadow:0_2px_20px_rgba(0,0,0,0.6)] sm:text-base">
                {description}
              </p>
              <div className="mt-7 grid gap-3 border-t border-white/30 pt-6 text-sm leading-[1.5] text-white sm:grid-cols-2 sm:text-base lg:grid-cols-3 md:gap-4">
                {details.map((detail: string, index: number) => (
                  <motion.div
                    key={detail}
                    initial={{ y: 10 }}
                    whileInView={{ y: 0 }}
                    viewport={{ once: true, amount: 0.8 }}
                    transition={{
                      duration: 0.45,
                      ease: "easeOut",
                      delay: animateDetailCards ? 0.7 + 0.1 * index : 0,
                    }}
                    whileHover={
                      animateDetailCards
                        ? { y: -3, color: "rgba(255,255,255,1)" }
                        : undefined
                    }
                    className="flex min-h-[64px] items-start border-l border-white/30 pl-5 pr-2 transition-colors"
                  >
                    <span className="font-semibold text-white/90 [text-shadow:0_1px_20px_rgba(0,0,0,0.5)]">
                      {detail}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const getOverlayClasses = (align: "left" | "right") => {
  if (align === "right") {
    return {
      horizontal:
        "bg-[linear-gradient(180deg,rgba(4,6,8,0.16)_0%,rgba(4,6,8,0.54)_65%,rgba(4,6,8,0.78)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,6,8,0.72)_0%,rgba(4,6,8,0.44)_28%,rgba(4,6,8,0.14)_58%,rgba(4,6,8,0.08)_72%,rgba(4,6,8,0.38)_100%)]",
      spotlight:
        "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_34%)] lg:bg-[radial-gradient(circle_at_72%_52%,rgba(255,255,255,0.12),transparent_28%)]",
    };
  }

  return {
    horizontal:
      "bg-[linear-gradient(180deg,rgba(4,6,8,0.16)_0%,rgba(4,6,8,0.54)_65%,rgba(4,6,8,0.78)_100%)] lg:bg-[linear-gradient(90deg,rgba(4,6,8,0.38)_0%,rgba(4,6,8,0.08)_28%,rgba(4,6,8,0.14)_42%,rgba(4,6,8,0.44)_72%,rgba(4,6,8,0.72)_100%)]",
    spotlight:
      "bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.1),transparent_34%)] lg:bg-[radial-gradient(circle_at_28%_52%,rgba(255,255,255,0.12),transparent_28%)]",
  };
};

const AnimatedSection = ({
  id,
  image,
  tag,
  label,
  title,
  description,
  details,
  align,
  focus = "50% 50%",
  priority = false,
}: SectionProps) => {
  const sectionAlign = align ?? "left";
  const overlays = getOverlayClasses(sectionAlign);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-3.5%", "3.5%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.14, 1.06, 1.14]);
  const panelY = useTransform(scrollYProgress, [0, 1], ["12px", "-18px"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.85, 0.58, 0.85]);

  return (
    <div ref={wrapperRef} className="relative h-[150svh] z-0">
      <section
        id={id}
        className="relative isolate z-0 h-[100svh] w-full scroll-mt-24 sticky top-0 overflow-hidden bg-transparent"
      >
        <motion.div
          className="absolute inset-[3%] z-0 origin-bottom overflow-hidden rounded-[1.5rem] sm:inset-[3%] sm:rounded-[2.2rem] will-change-transform transform-gpu"
          initial={{ opacity: 0.6, y: "8%", scale: 0.96 }}
          whileInView={{ opacity: 1, y: "0%", scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: false, amount: 0.15 }}
        >
          <motion.div
            className="absolute -inset-x-[6%] -inset-y-[12%] sm:-inset-x-[8%] sm:-inset-y-[14%]"
            style={{ y, scale }}
          >
            <Image
              src={image}
              alt={tag}
              fill
              className="object-cover"
              style={{ objectPosition: focus }}
              sizes="100vw"
              quality={priority ? 85 : 72}
              priority={priority}
            />
          </motion.div>
        </motion.div>
        <motion.div
          style={{ opacity: overlayOpacity }}
          className={`absolute inset-0 z-10 ${overlays.horizontal}`}
        />
        <div className={`absolute inset-0 z-10 ${overlays.spotlight}`} />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,6,8,0.18)_0%,rgba(4,6,8,0.58)_100%)]" />
        <motion.div className="relative z-20" style={{ y: panelY }}>
          <SectionPanel
            tag={tag}
            label={label}
            title={title}
            description={description}
            details={details}
            align={align}
            animateDetailCards
          />
        </motion.div>
      </section>
    </div>
  );
};

const StaticSection = ({
  id,
  image,
  tag,
  label,
  title,
  description,
  details,
  align,
  focus = "50% 50%",
  priority = false,
}: SectionProps) => {
  const sectionAlign = align ?? "left";
  const overlays = getOverlayClasses(sectionAlign);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);

  return (
    <div ref={wrapperRef} className="relative h-[150svh] z-0">
      <section
        id={id}
        className="relative isolate z-0 h-[100svh] w-full scroll-mt-24 sticky top-0 overflow-hidden bg-transparent"
      >
        <motion.div className="absolute inset-[4%] z-0 overflow-hidden rounded-[1.5rem] sm:inset-[5%] sm:rounded-[2.2rem]">
          <motion.div className="absolute -inset-x-[4%] -inset-y-[10%]" style={{ y }}>
            <Image
              src={image}
              alt={tag}
              fill
              className="object-cover"
              style={{ objectPosition: focus }}
              sizes="100vw"
              quality={72}
              priority={priority}
            />
          </motion.div>
        </motion.div>
        <div className={`absolute inset-0 z-10 ${overlays.horizontal}`} />
        <div className={`absolute inset-0 z-10 ${overlays.spotlight}`} />
        <div className="absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(4,6,8,0.25)_0%,rgba(4,6,8,0.62)_100%)]" />
        <SectionPanel
          tag={tag}
          label={label}
          title={title}
          description={description}
          details={details}
          align={align}
          animateDetailCards={false}
        />
      </section>
    </div>
  );
};

export default function Section(props: SectionProps) {
  if (props.disableHeavyAnimations) {
    return <StaticSection {...props} />;
  }

  return <AnimatedSection {...props} />;
}
