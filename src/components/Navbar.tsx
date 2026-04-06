import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Logo from "@/../public/logo.svg";
import Link from "next/link";

const NAV_LINKS = [
  { href: "#overview", label: "Overview" },
  { href: "#interior", label: "Interior" },
  { href: "#technology", label: "Technology" },
  { href: "#safety", label: "Safety" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="absolute inset-x-0 top-0 z-30">
      <div className="mx-auto flex h-20 w-full max-w-[1600px] items-center justify-between px-4 sm:px-5 md:px-10 xl:px-16">
        <Link href="#" className="flex items-center">
          <Logo className="w-28 sm:w-32 md:w-44 xl:w-52" />
        </Link>
        <div className="hidden items-center gap-7 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/70 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative transition duration-300 hover:text-white after:absolute after:-bottom-2 after:left-0 after:h-px after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#reserve"
            className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-black"
          >
            Reserve
          </a>
        </div>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
          className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85 backdrop-blur-md transition hover:border-white/35 hover:text-white md:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          Menu
          <span className="relative h-3.5 w-3.5">
            <span
              className={`absolute left-0 top-1/2 h-px w-full -translate-y-[4px] bg-current transition ${
                isOpen ? "translate-y-0 rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-1/2 h-px w-full translate-y-[4px] bg-current transition ${
                isOpen ? "-translate-y-0 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="px-4 sm:px-5 md:hidden"
          >
            <div className="mx-auto max-w-[1600px]">
              <div className="overflow-hidden rounded-[1.5rem] border border-white/15 bg-[rgba(6,10,12,0.9)] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl">
                <div className="grid gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/78">
                  {NAV_LINKS.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="rounded-full border border-white/10 px-4 py-3 transition hover:border-white/35 hover:text-white"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <a
                  href="#reserve"
                  onClick={closeMenu}
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-black transition hover:bg-white/90"
                >
                  Reserve
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
