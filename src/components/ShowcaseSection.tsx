import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { AnimatedText } from "./AnimatedText";
import Image from "next/image";

import BgPerformance from "../../public/bg-overview.jpeg";
import BgDesign from "../../public/bg-interior.jpeg";
import BgCharging from "../../public/bg-charging.jpeg";

const ShowcaseSection = ({ disableHeavyAnimations }: { disableHeavyAnimations?: boolean }) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const shouldDisableParallax = disableHeavyAnimations || (hasMounted && isMobile);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const y2 = useTransform(scrollYProgress, [0, 1], ["6%", "-16%"]);

  return (
    <div ref={containerRef} className="relative z-10 w-full h-auto md:h-[150svh]">
      <section 
        className="relative md:sticky top-0 flex min-h-screen md:h-[100svh] w-full flex-col items-center justify-center overflow-hidden bg-transparent py-20 px-0"
      >
      <div className="absolute inset-0 z-0 bg-transparent" />
      
      {/* Studio lighting gradient replacing the hard image backgrounds */}
      <div className="absolute inset-[3%] z-0 rounded-[1.5rem] bg-[radial-gradient(circle_at_40%_30%,rgba(28,34,45,0.85)_0%,rgba(5,8,10,1)_75%)] shadow-2xl ring-1 ring-white/5 sm:rounded-[2.2rem]" />
      <div className="absolute inset-[3%] z-0 rounded-[1.5rem] bg-[linear-gradient(180deg,transparent_0%,rgba(3,4,6,0.9)_100%)] sm:rounded-[2.2rem]" />
      
      <div className="relative z-10 mx-auto w-full max-w-[1300px] px-5 sm:px-8 md:px-12">
        <div className="mb-6 md:mb-10 lg:mb-14 flex flex-col items-center text-center mt-8 lg:mt-0">
          <span className="mb-3 lg:mb-5 inline-flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[9px] md:text-[10px] font-semibold uppercase tracking-[0.4em] text-white/50">
            Uncompromising Identity
          </span>
          {!disableHeavyAnimations ? (
            <AnimatedText
              el="h2"
              text="Engineering that outpaces the expected."
              className="max-w-[18ch] text-[clamp(1.9rem,11vw,4.8rem)] font-medium leading-[1.05] tracking-tight text-white [text-shadow:0_4px_32px_rgba(0,0,0,0.5)]"
              once={false}
            />
          ) : (
            <h2 className="max-w-[18ch] text-[clamp(1.9rem,11vw,4.8rem)] font-medium leading-[1.05] tracking-tight text-white">
              Engineering that outpaces the expected.
            </h2>
          )}
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6 pb-6">
          <motion.div 
            style={{ y: !shouldDisableParallax ? y1 : 0 }}
            initial={!shouldDisableParallax ? { opacity: 0, scale: 0.95 } : false}
            whileInView={!shouldDisableParallax ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="group relative flex h-[28vh] min-h-[260px] max-h-[460px] flex-col justify-end overflow-hidden rounded-[1.5rem] md:rounded-[1.8rem] shadow-[0_16px_40px_rgba(0,0,0,0.4)]"
          >
            <div className="absolute inset-0 z-0">
               <Image src={BgPerformance} alt="Aerodynamic Mastery" fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105" sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 group-hover:from-black/80 transition-colors duration-700" />
            </div>
            
            <div className="relative z-10 px-5 pb-6 pt-16 sm:px-8 sm:pb-8 pointer-events-none">
              <div className="mb-3 h-8 w-8 md:h-10 md:w-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center">
                 <span className="text-white/60 text-[9px] font-semibold">01</span>
              </div>
              <h3 className="mb-2 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white drop-shadow-md">Aerodynamic</h3>
              <p className="text-xs md:text-sm leading-relaxed text-white/70">
                Sculpted purposefully to cheat the wind, increasing efficiency without sacrificing interior volume.
              </p>
            </div>
          </motion.div>
          
          <motion.div 
            style={{ y: !shouldDisableParallax ? y2 : 0 }}
            initial={!shouldDisableParallax ? { opacity: 0, scale: 0.95 } : false}
            whileInView={!shouldDisableParallax ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.25, ease: "easeOut" }}
            className="group relative flex h-[28vh] min-h-[260px] max-h-[460px] flex-col justify-end overflow-hidden rounded-[1.5rem] md:rounded-[1.8rem] shadow-[0_16px_40px_rgba(0,0,0,0.4)] lg:mt-10"
          >
            <div className="absolute inset-0 z-0">
               <Image src={BgDesign} alt="Advanced Architecture" fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 object-right" sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 group-hover:from-black/80 transition-colors duration-700" />
            </div>

            <div className="relative z-10 px-5 pb-6 pt-16 sm:px-8 sm:pb-8 pointer-events-none">
               <div className="mb-3 h-8 w-8 md:h-10 md:w-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center">
                 <span className="text-white/60 text-[9px] font-semibold">02</span>
              </div>
              <h3 className="mb-2 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white drop-shadow-md">Architecture</h3>
              <p className="text-xs md:text-sm leading-relaxed text-white/70">
                A miniaturized drivetrain expands passenger space, proving premium luxury lies entirely in what you don&apos;t feel.
              </p>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: !shouldDisableParallax ? y1 : 0 }}
            initial={!shouldDisableParallax ? { opacity: 0, scale: 0.95 } : false}
            whileInView={!shouldDisableParallax ? { opacity: 1, scale: 1 } : undefined}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="group relative flex h-[28vh] min-h-[260px] max-h-[460px] flex-col justify-end overflow-hidden rounded-[1.5rem] md:rounded-[1.8rem] shadow-[0_16px_40px_rgba(0,0,0,0.4)] sm:col-span-2 lg:col-span-1 lg:mt-20"
          >
             <div className="absolute inset-0 z-0">
               <Image src={BgCharging} alt="Intelligently Driven" fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-105 object-left" sizes="(max-width: 768px) 100vw, 33vw" placeholder="blur" />
               <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 group-hover:from-black/80 transition-colors duration-700" />
            </div>

            <div className="relative z-10 px-5 pb-6 pt-16 sm:px-8 sm:pb-8 pointer-events-none">
             <div className="mb-3 h-8 w-8 md:h-10 md:w-10 rounded-full border border-white/20 bg-black/40 backdrop-blur-md flex items-center justify-center">
               <span className="text-white/60 text-[9px] font-semibold">03</span>
            </div>
              <h3 className="mb-2 text-xl md:text-2xl lg:text-3xl font-medium tracking-tight text-white drop-shadow-md">Intelligence</h3>
              <p className="text-xs md:text-sm leading-relaxed text-white/70">
                Computational dynamics continually learning and recalculating to predict range optimization actively in real-time.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      </section>
    </div>
  );
};

export default ShowcaseSection;
