import { useEffect, useState, useRef } from "react";
import Masonry from "react-masonry-css";

import Header from "../../components/Header/Header";
import Footer from "../../components/core/Footer/Footer";
import { Card } from "../../components/Card/Card";
import { ImageModal } from "../../components/ImageModal/ImageModal";

import styles from "./Gallery.module.scss";
import { Hero } from "../../sections/Hero/Hero";
import { ALL_MEDIA } from "@/utils/imageExtraction";

export type ViteGlobModule = { default: string };

type LazyImageProps = {
  src: string;
  className?: string;
  onClick?: () => void;
  shouldLoad: boolean;
};

const LazyImage = ({ src, className, onClick, shouldLoad }: LazyImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (shouldLoad) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
    }
  }, [src, shouldLoad]);

  return (
    <img
      ref={imgRef}
      className={className}
      src={loaded ? src : undefined}
      loading={shouldLoad ? "eager" : "lazy"}
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
  const [galleryVisible, setGalleryVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  console.log({ ALL_MEDIA });

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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setGalleryVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" },
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => observer.disconnect();
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
        <div ref={galleryRef}>
          <Masonry
            breakpointCols={{ default: 3, 768: 2, 480: 1 }}
            className={styles.galleryContainer}
            columnClassName={styles.galleryColumn}
          >
            {ALL_MEDIA.map(({ src, label }, index) => (
              <Card
                key={src}
                label={`Photo ${index + 1}`}
                img={
                  <LazyImage
                    src={src}
                    className={styles.galleryCard}
                    onClick={() => setSelectedImage({ src, label })}
                    shouldLoad={galleryVisible || index < 20}
                  />
                }
                onClick={() => setSelectedImage({ src, label })}
                showLabelOnCard={false}
                maxWidth="100%"
              />
            ))}
          </Masonry>
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
