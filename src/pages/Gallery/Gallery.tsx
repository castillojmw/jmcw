import { useEffect, useMemo } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";

import styles from "./Gallery.module.scss";
import { Hero } from "../../sections/Hero/Hero";

export type ViteGlobModule = { default: string };

export default function GalleryPage() {
  const images = import.meta.glob<ViteGlobModule>(
    "./assets/compressed_images/thumbs/*.jpg",
    {
      eager: true,
    },
  );

  const imageList = useMemo(
    () =>
      Object.entries(images)
        .sort(([pathA], [pathB]) => {
          const getNum = (path: string) => {
            const match = path.match(/(\d+)\.jpg$/);
            return match ? parseInt(match[1], 10) : 0;
          };
          return getNum(pathA) - getNum(pathB);
        })
        .map(([, mod]) => mod.default),
    [images],
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page gallery-page">
      <Header />
      <Hero
        heading="Gallery"
        subheading="A small collection of my culinary work"
      />

      <section className="section">
        <div className={styles.galleryContainer}>
          {imageList.map((src) => (
            <div className="core-overflow-hidden">
              <img className={styles.galleryCard} src={src} loading="lazy" />
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
