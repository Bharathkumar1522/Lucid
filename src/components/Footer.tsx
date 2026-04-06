import React from "react";
import Logo from "@/../public/logo.svg";

const Footer = () => {
  return (
    <footer className="relative z-10 w-full bg-[#030507] py-12 sm:py-16 md:py-20 border-t border-white/5">
      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-8 md:px-12 xl:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 md:gap-0">
          
          <div className="flex flex-col items-center md:items-start">
            <Logo className="w-32 sm:w-40 md:w-48 text-white mb-6" />
            <p className="text-white/40 text-[10px] md:text-xs uppercase tracking-[0.2em] max-w-[280px] text-center md:text-left leading-relaxed">
              Experience the pinnacle of electric luxury, engineered for the driver.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-16 text-center sm:text-left">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Vehicles</span>
              <a href="#overview" className="text-xs md:text-sm text-white/50 hover:text-white transition">Lucid Gravity</a>
              <a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition">Lucid Air</a>
              <a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition">Sapphire</a>
            </div>
            
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Company</span>
              <a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition">Our Story</a>
              <a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition">Careers</a>
              <a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition">Investors</a>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/80">Connect</span>
              <a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition">Instagram</a>
              <a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition">Twitter / X</a>
              <a href="#" className="text-xs md:text-sm text-white/50 hover:text-white transition">YouTube</a>
            </div>
          </div>
        </div>

        <div className="mt-16 sm:mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
          <p className="text-[10px] md:text-xs text-white/40 tracking-wider">
            &copy; {new Date().getFullYear()} Lucid Motors. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-[10px] md:text-xs text-white/40 hover:text-white transition uppercase tracking-wider">Legal</a>
            <a href="#" className="text-[10px] md:text-xs text-white/40 hover:text-white transition uppercase tracking-wider">Privacy</a>
            <a href="#" className="text-[10px] md:text-xs text-white/40 hover:text-white transition uppercase tracking-wider">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
