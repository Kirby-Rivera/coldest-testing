import { imageItems } from "@/constants/hero";
import styles from "./Products.module.scss";
import useAnimateProducts from "./useAnimateProducts";

function Products() {
  const {
    spotlightRef,
    projectIndexRef,
    projectImgsRef,
    projectImagesContainerRef,
    projectNamesRef,
    projectNamesContainerRef,
  } = useAnimateProducts();

  return (
    <section id="products-section" className={styles["products-section"]}>
      <div className={styles["intro"]}>
        <p>Products Showcase</p>
      </div>
      <div ref={spotlightRef} className={styles["spotlight"]}>
        <div className={styles["project-index"]}>
          <h1 ref={projectIndexRef}>01/05</h1>
        </div>
        <div
          ref={projectImagesContainerRef}
          className={styles["project-images"]}
        >
          {imageItems.map((img, index) => (
            <div
              key={index}
              ref={(el) => {
                projectImgsRef.current[index] = el;
              }}
              className={styles["project-img"]}
            >
              <img src={img.src} alt={`${index + 1}`} />
            </div>
          ))}
        </div>
        <div ref={projectNamesContainerRef} className={styles["project-names"]}>
          {[
            "Release 1",
            "Release 2",
            "Release 3",
            "Release 4",
            "Release 6",
          ].map((name, index) => (
            <p
              key={index}
              ref={(el) => {
                projectNamesRef.current[index] = el;
              }}
            >
              {name}
            </p>
          ))}
        </div>
      </div>
      <div className={styles["outro"]}>
        <p>End of Showcase</p>
      </div>
    </section>
  );
}

export default Products;
