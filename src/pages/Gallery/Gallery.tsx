import { useEffect, useMemo, useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import { Card } from "../../components/Card/Card";
import { ImageModal } from "../../components/ImageModal/ImageModal";

import styles from "./Gallery.module.scss";
import { Hero } from "../../sections/Hero/Hero";

export type ViteGlobModule = { default: string };

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
          {imageList.map((src, index) => (
            <Card
              key={src}
              label={`Photo ${index + 1}`}
              img={
                <img className={styles.galleryCard} src={src} loading="lazy" />
              }
              onClick={() => setSelectedImage(src)}
              showLabelOnCard={false}
            />
          ))}
        </div>
      </section>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        src={selectedImage ?? ""}
        label={""}
      />

      <Footer />
    </div>
  );
}
