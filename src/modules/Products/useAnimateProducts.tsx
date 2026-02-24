import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import Lenis from "lenis";
import styles from "./Products.module.scss";

function useAnimateProducts() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const projectIndexRef = useRef<HTMLHeadingElement>(null);
  const projectImgsRef = useRef<(HTMLDivElement | null)[]>([]);
  const projectImagesContainerRef = useRef<HTMLDivElement>(null);
  const projectNamesRef = useRef<(HTMLParagraphElement | null)[]>([]);
  const projectNamesContainerRef = useRef<HTMLDivElement>(null);

  const totalProjectCount = 5;

  useGSAP(() => {
    const spotlightSection = spotlightRef.current;
    const projectIndex = projectIndexRef.current;
    const projectNamesContainer = projectNamesContainerRef.current;
    const projectImagesContainer = projectImagesContainerRef.current;
    const projectImgs = projectImgsRef.current;
    const projectNames = projectNamesRef.current;

    if (
      !spotlightSection ||
      !projectIndex ||
      !projectNamesContainer ||
      !projectImagesContainer
    ) {
      return;
    }

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    const spotlightSectionHeight = spotlightSection.offsetHeight;
    const spotlightSectionPadding = parseFloat(
      getComputedStyle(spotlightSection).paddingTop
    );
    const projectIndexHeight = projectIndex.offsetHeight;
    const containerHeight = projectNamesContainer.offsetHeight;
    const imagesHeight = projectImagesContainer.offsetHeight;

    const moveDistanceIndex =
      spotlightSectionHeight - spotlightSectionPadding * 2 - projectIndexHeight;
    const moveDistanceNames =
      spotlightSectionHeight - spotlightSectionPadding * 2 - containerHeight;
    const moveDistanceImages = window.innerHeight - imagesHeight;

    const imgActivationThreshold = window.innerHeight / 2;

    ScrollTrigger.create({
      trigger: `.${styles["spotlight"]}`,
      start: "top top",
      end: `+=${window.innerHeight * 5}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        const currentIndex = Math.min(
          Math.floor(progress * totalProjectCount) * 1 + 1,
          totalProjectCount
        );

        projectIndex.textContent = `${String(currentIndex).padStart(
          2,
          "0"
        )}/${String(totalProjectCount).padStart(2, "0")}`;

        gsap.set(projectIndex, {
          y: progress * moveDistanceIndex,
        });

        gsap.set(projectImagesContainer, {
          y: progress * moveDistanceImages,
        });

        projectImgs.forEach((img) => {
          if (!img) return;

          const imgRect = img.getBoundingClientRect();
          const imgTop = imgRect.top;
          const imgBottom = imgRect.bottom;

          if (
            imgTop <= imgActivationThreshold &&
            imgBottom >= imgActivationThreshold
          ) {
            gsap.set(img, {
              opacity: 1,
            });
          } else {
            gsap.set(img, {
              opacity: 0.5,
            });
          }
        });

        projectNames.forEach((p, index) => {
          const startProgress = index / totalProjectCount;
          const endProgress = (index + 1) / totalProjectCount;
          const projectProgress = Math.max(
            0,
            Math.min(
              1,
              (progress - startProgress) / (endProgress - startProgress)
            )
          );

          gsap.set(p, {
            y: -projectProgress * moveDistanceNames,
          });

          if (projectProgress > 0 && projectProgress < 1) {
            gsap.set(p, {
              color: "#fff",
            });
          } else {
            gsap.set(p, {
              color: "#4a4a4a",
            });
          }
        });
      },
    });
  }, []);

  return {
    spotlightRef,
    projectIndexRef,
    projectImgsRef,
    projectImagesContainerRef,
    projectNamesRef,
    projectNamesContainerRef,
  };
}

export default useAnimateProducts;
