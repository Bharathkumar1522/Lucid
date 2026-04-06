import { useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Lenis from "@studio-freight/lenis";
import { motion } from "framer-motion";
import Section from "@/components/Section";
import { usePerformanceMode } from "@/hooks/usePerformanceMode";
import { AnimatedText } from "@/components/AnimatedText";
import ShowcaseSection from "@/components/ShowcaseSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

import BgOverview from "@/../public/bg-overview.jpeg";
import BgInterior from "@/../public/bg-interior.jpeg";
import BgCharging from "@/../public/bg-charging.jpeg";
import BgConnectivity from "@/../public/bg-connectivity.jpeg";
import BgSafety from "@/../public/bg-safety.jpeg";
import HeroSection from "@/components/HeroSection";

// Pre-resolved image src strings for preload hints
const IMAGE_SRCS = [
  BgOverview.src,
  BgInterior.src,
  BgCharging.src,
  BgConnectivity.src,
  BgSafety.src,
];

const SECTIONS = [
  {
    id: "overview",
    image: BgOverview,
    tag: "Overview",
    label: "Design language",
    title: "A sculpted silhouette that feels calm in motion.",
    description:
      "Gravity pairs architectural lines with fluid proportions, delivering a vehicle that looks poised from every angle while remaining ready for the demands of everyday life.",
    details: [
      "Confident stance with refined aerodynamics",
      "Premium detailing that reads clean and modern",
      "Three-row capability without visual bulk",
    ],
    focus: "50% 46%",
  },
  {
    id: "interior",
    image: BgInterior,
    tag: "Interior",
    label: "Crafted comfort",
    title: "Space that breathes, materials that soothe.",
    description:
      "From panoramic light to wrapped surfaces and modular seating, the cabin is engineered to keep every trip effortless, elegant, and deeply comfortable.",
    details: [
      "Lounge-inspired seating for up to seven",
      "Flexible rows for cargo-heavy weekends",
      "Quiet acoustics tuned for long drives",
    ],
    align: "right" as const,
    focus: "52% 40%",
  },
  {
    id: "technology",
    image: BgCharging,
    tag: "Charging",
    label: "Range performance",
    title: "Charge fast, roam farther, stop less.",
    description:
      "Ultra-fast charging and intelligent range management keep your route fluid, so long distances feel less like logistics and more like freedom.",
    details: [
      "Rapid-charge capability built for travel days",
      "Range confidence across city and highway",
      "Smart charging guidance in real time",
    ],
    focus: "50% 52%",
  },
  {
    id: "connectivity",
    image: BgConnectivity,
    tag: "Connectivity",
    label: "Immersive systems",
    title: "A digital layer that feels elegantly invisible.",
    description:
      "Displays, wellness scenes, and contextual controls move in sync, letting technology support the journey without stealing attention from the road.",
    details: [
      "Unified audio, light, and climate scenes",
      "Cleaner interfaces with fewer distractions",
      "Personalized profiles that adapt instantly",
    ],
    align: "right" as const,
    focus: "50% 47%",
  },
  {
    id: "safety",
    image: BgSafety,
    tag: "Safety",
    label: "Protected by design",
    title: "Awareness built into every mile.",
    description:
      "An advanced suite of sensors, radar, and assistive systems continuously interprets your surroundings so driving feels more confident in every condition.",
    details: [
      "360-degree sensing with predictive awareness",
      "Assistive features tuned to feel natural",
      "Designed to support every passenger on board",
    ],
    focus: "50% 44%",
  },
];

export default function Home() {
  const { disableHeavyAnimations } = usePerformanceMode();

  useEffect(() => {
    if (disableHeavyAnimations) return;

    const lenis = new Lenis({
      smoothWheel: true,
      lerp: 0.08,
    });

    let rafId = 0;

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest('a[href^="#"]');
      if (!(link instanceof HTMLAnchorElement)) {
        return;
      }

      const href = link.getAttribute("href");
      if (!href || href === "#") {
        return;
      }

      const destination = document.querySelector(href);
      if (!destination) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(destination, {
        offset: -24,
        duration: 1.2,
      });
    };

    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    document.addEventListener("click", handleAnchorClick);
    rafId = requestAnimationFrame(raf);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      cancelAnimationFrame(rafId);
      lenis.stop();
      lenis.destroy();
    };
  }, [disableHeavyAnimations]);

  return (
    <>
      <Head>
        {/* Preload all section images so they are decoded and ready before user scrolls */}
        {IMAGE_SRCS.map((src) => (
          <link
            key={src}
            rel="preload"
            as="image"
            href={src}
          />
        ))}
      </Head>
      <main id="top" className="min-h-screen overflow-x-clip bg-[var(--color-ink)]">
      <BackToTop />
      <HeroSection disableHeavyAnimations={disableHeavyAnimations} />
      {SECTIONS.map((section, index) => (
        <Section
          key={section.id}
          {...section}
          priority={index < 2}
          disableHeavyAnimations={disableHeavyAnimations}
        />
      ))}
      <ShowcaseSection disableHeavyAnimations={disableHeavyAnimations} />
      <div className="relative h-[150svh] w-full z-0">
        <section
          id="reserve"
          className="relative scroll-mt-24 sticky top-0 h-[100svh] w-full flex items-center justify-center overflow-hidden border-t border-white/10 bg-black"
        >
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <Image 
            src={BgOverview} 
            alt="Gravity Exterior" 
            fill 
            className="object-cover object-[50%_60%] opacity-40 mix-blend-lighten" 
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_70%)]" />
        </div>
        <div className="relative z-10 mx-auto flex min-h-[60vh] w-full max-w-[1600px] items-center px-4 py-16 sm:px-5 sm:py-[4.5rem] md:min-h-[70vh] md:px-10 md:py-20 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.75, ease: "easeOut" }}
            className="max-w-[860px]"
          >
            <span className="text-[11px] font-semibold uppercase tracking-[0.34em] text-white/55">
              Stay informed
            </span>
            <AnimatedText
              el="h2"
              text="Reserve first access to Gravity."
              className="mt-5 max-w-[12ch] text-[clamp(2.1rem,11vw,4.75rem)] leading-[0.94] text-white"
              once={false}
            />
            <p className="mt-6 max-w-[38rem] text-sm leading-7 text-white/72 md:text-base">
              Be first in line for updates, launch availability, and curated
              first-drive events as the next generation of electric touring
              arrives.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <motion.a
                href="#"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-black shadow-[0_0_30px_rgba(255,255,255,0.2)] transition hover:bg-white/90"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Join the list
              </motion.a>
              <motion.a
                href="#top"
                className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-md px-6 py-4 text-[11px] font-semibold uppercase tracking-[0.26em] text-white/90 transition hover:border-white/40 hover:bg-white/10 hover:text-white"
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Revisit the highlights
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
      </div>
      <Footer />
    </main>
    </>
  );
}
