import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Outfit, Inter } from "next/font/google";

const displayFont = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700"],
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${displayFont.variable} ${bodyFont.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
