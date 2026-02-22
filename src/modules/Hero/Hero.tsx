import styles from "./Hero.module.scss";
import useAnimateHero from "./useAnimateHero";

function Hero() {
  const { counterRef } = useAnimateHero();

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles["nav-logo"]}>
          <a href="#">COLDEST</a>
        </div>
        <div className={styles["nav-items"]}>
          <a href="#">Products</a>
          <a href="#">Showcase</a>
          <a href="#">History</a>
          <a href="#">Connect</a>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles["hero-overlay"]}>
          <div className={styles.counter}>
            <h1 ref={counterRef}>0</h1>
          </div>

          <div className={styles["overlay-text-container"]}>
            <div className={styles["overlay-text"]}>
              <p>Stun</p>
              <p>Shine</p>
              <p>Dream</p>
            </div>
          </div>
        </div>

        <div className={styles["hero-images"]}>
          <div className={styles.img}>
            <img
              className={styles["hero-images-showcase"]}
              src="/img-1.png"
              alt="1"
            />
          </div>
          <div className={styles.img}>
            <img
              className={styles["hero-images-showcase"]}
              src="/img-2.png"
              alt="2"
            />
          </div>
          <div className={`${styles.img} ${styles["hero-img"]}`}>
            <img
              className={styles["hero-images-showcase"]}
              src="/img-3.png"
              alt="3"
            />
          </div>
          <div className={styles.img}>
            <img
              className={styles["hero-images-showcase"]}
              src="/img-4.png"
              alt="4"
            />
          </div>
          <div className={styles.img}>
            <img
              className={styles["hero-images-showcase"]}
              src="/img-5.png"
              alt="5"
            />
          </div>
        </div>

        <div className={styles["hero-header"]}>
          <h1>Too cool for weird Kids!</h1>
        </div>
      </section>
    </>
  );
}

export default Hero;
