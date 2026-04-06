import { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";

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
  const isProd = import.meta.env.PROD;
  return Object.entries(images).map(([, mod]) => {
    const fileName = mod.default.split("/").at(-1);
    if (fileName) {
      const name = fileName.split(".webp")[0];
      const parts = name.split("-");
      const cleanName = isProd ? parts.slice(0, -1).join("-") : parts.join("-");
      const nameWithSpaces = cleanName
        .replaceAll("-", " ")
        .replaceAll(" , ", ", ");

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

type LazyImageProps = {
  src: string;
  className?: string;
  onClick?: () => void;
  priority?: boolean;
};

const LazyImage = ({ src, className, onClick, priority = false }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      // Load immediately for above-the-fold images
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const img = new Image();
          img.src = src;
          img.onload = () => setLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [src, priority]);

  return (
    <img
      ref={imgRef}
      className={className}
      src={loaded ? src : undefined}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      onClick={onClick}
      style={{ opacity: loaded ? 1 : 0, transition: "opacity 0.3s ease" }}
    />
  );
};

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<{
    src: string;
    label: string;
  } | null>(null);
  const [headerBlurred, setHeaderBlurred] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  const imageList = [...BRASSERIE_IMAGE_LIST, ...NORMAL_IMAGE_LIST];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setHeaderBlurred(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="page gallery-page">
      <Header blur={headerBlurred} />
      <div ref={heroRef}>
        <Hero
          heading="Gallery"
          subheading="A small collection of my culinary work"
        />
      </div>

      <section className={`${styles.gallerySection} section`}>
        <Masonry
          breakpointCols={{ default: 3, 768: 2, 480: 1 }}
          className={styles.galleryContainer}
          columnClassName={styles.galleryColumn}
        >
          {imageList.map(({ src, label }, index) => (
            <Card
              key={src}
              label={`Photo ${index + 1}`}
              img={
                <LazyImage
                  src={src}
                  className={styles.galleryCard}
                  onClick={() => setSelectedImage({ src, label })}
                  priority={index < 6}
                />
              }
              onClick={() => setSelectedImage({ src, label })}
              showLabelOnCard={false}
              maxWidth="100%"
            />
          ))}
        </Masonry>
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
