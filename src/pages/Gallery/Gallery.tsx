import { useEffect, useState } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/core/Footer/Footer";
import { Card } from "../../components/Card/Card";
import { ImageModal } from "../../components/ImageModal/ImageModal";

import styles from "./Gallery.module.scss";
import { Hero } from "../../sections/Hero/Hero";

export type ViteGlobModule = { default: string };

const NORMAL_IMAGES = import.meta.glob<ViteGlobModule>(
  "@/assets/NORMAL_WEBP/*.webp",
  {
    eager: true,
  },
);

const BRASSERIE_WEBP = import.meta.glob<ViteGlobModule>(
  "@/assets/BRASSERIE_WEBP/*.webp",
  {
    eager: true,
  },
);

const generateImageList = (images: Record<string, ViteGlobModule>) => {
  return Object.entries(images).map(([, mod]) => {
    const fileName = mod.default.split("/").at(-1);
    if (fileName) {
      const name = fileName.split(".webp")[0];
      console.log({ name });
      const nameWithSpaces = name
        .replaceAll("-", " ")
        .replaceAll(" , ", ", ")
        .replace(/\d+/g, "");

      const formattedLabel = `${nameWithSpaces.charAt(0).toUpperCase()}${nameWithSpaces.slice(1)}`;
      return {
        src: mod.default,
        label: formattedLabel,
      };
    }
    return {
      src: mod.default,
      label: "",
    };
  });
};

const NORMAL_IMAGE_LIST = generateImageList(NORMAL_IMAGES);
const BRASSERIE_IMAGE_LIST = generateImageList(BRASSERIE_WEBP);

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    label: string;
  } | null>(null);

  const imageList = [...BRASSERIE_IMAGE_LIST, ...NORMAL_IMAGE_LIST];

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
          {imageList.map(({ src, label }, index) => (
            <Card
              key={src}
              label={`Photo ${index + 1}`}
              img={
                <img
                  className={styles.galleryCard}
                  src={src}
                  loading="lazy"
                  decoding="async"
                />
              }
              onClick={() => setSelectedImage({ src, label })}
              showLabelOnCard={false}
              maxWidth="100%"
            />
          ))}
        </div>
      </section>

      <ImageModal
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        src={selectedImage?.src ?? ""}
        label={selectedImage?.label ?? ""}
      />

      <Footer />
    </div>
  );
}
