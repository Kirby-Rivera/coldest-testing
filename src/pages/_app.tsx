import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import gsap from "gsap";
import { CustomEase, SplitText } from "gsap/all";

gsap.registerPlugin(CustomEase, SplitText);
CustomEase.create("hop", "0.85, 0, 0.15, 1");

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
