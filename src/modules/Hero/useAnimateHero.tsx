import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import styles from "./Hero.module.scss";

function useAnimateHero() {
  const counterRef = useRef<HTMLHeadingElement>(null);
  const counter = { value: 0 };

  useGSAP(() => {
    let split = new SplitText(".hero-header h1", {
      type: "words",
      mask: "words",
      wordsClass: "word",
    });

    const counterTl = gsap.timeline({ delay: 0.5 });
    const overlayTextTl = gsap.timeline({ delay: 0.75 });
    const revealTl = gsap.timeline({ delay: 0.5 });

    counterTl.to(counter, {
      value: 100,
      duration: 5,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.floor(counter.value).toString();
        }
      },
    });

    overlayTextTl
      .to(`.${styles["overlay-text"]}`, {
        y: "0",
        duration: 0.75,
        ease: "hop",
      })
      .to(`.${styles["overlay-text"]}`, {
        y: "-2rem",
        duration: 0.75,
        ease: "hop",
        delay: 0.75,
      })
      .to(`.${styles["overlay-text"]}`, {
        y: "-4rem",
        duration: 0.75,
        ease: "hop",
        delay: 0.75,
      })
      .to(`.${styles["overlay-text"]}`, {
        y: "-6rem",
        duration: 0.75,
        ease: "hop",
        delay: 1,
      });

    revealTl
      .to(`.${styles.img}`, {
        y: 0,
        opacity: 1,
        stagger: 0.05,
        duration: 1,
        ease: "hop",
      })
      .to(`.${styles["hero-images"]}`, {
        gap: "0.75vw",
        duration: 1,
        delay: 0.5,
        ease: "hop",
      })
      .to(
        `.${styles.img}`,
        {
          scale: 1,
          duration: 1,
          ease: "hop",
        },
        "<",
      )
      .to(`.${styles.img}:not(.${styles["hero-img"]})`, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        stagger: 0.1,
        ease: "hop",
      })
      .to(`.${styles["hero-img"]}`, {
        scale: 2,
        duration: 1,
        ease: "hop",
      })
      .to(`.${styles["hero-overlay"]}`, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 1,
        ease: "hop",
      })
      .to(
        `.${styles["hero-header"]} h1 .${styles["word"]}`,
        {
          y: "0",
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.5",
      );
  }, []);

  return {
    counterRef,
  };
}

export default useAnimateHero;
