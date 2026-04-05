import { useEffect, useMemo } from "react";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";

import styles from "./Gallery.module.scss";
import { Hero } from "../../sections/Hero/Hero";

type ViteGlobModule = { default: string };

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

      {/* <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Gallery</h1>
            <p className="hero-subtitle">
              A visual journey through our culinary creations
            </p>
          </div>
        </div>
      </section>

      <section className="filter-section">
        <div className="container">
          <div className="filter-controls">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${category === cat ? "active" : ""}`}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section section">
        <div className="container">
          <div className="gallery-grid">
            {displayDishes.map((dish) => (
              <div key={dish.id} className="gallery-item">
                <div className="item-image">
                  <img src={dish.imageUrl} alt={dish.name} loading="lazy" />
                  <div className="overlay">
                    <span className="view-label">View Dish</span>
                  </div>
                </div>
                <div className="item-info">
                  <h4 className="item-title">{dish.name}</h4>
                  <p className="item-category">{dish.category}</p>
                  <p className="item-description">{dish.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="booking section">
        <div className="container">
          <div className="booking-content">
            <h2 className="section-title">Commission a Dish</h2>
            <p className="booking-text">
              Don't see exactly what you're looking for? We create custom dishes
              for private events, weddings, and special occasions. Let's
              collaborate.
            </p>
            <Link to="/contact" className="btn btn-gold">
              Inquire Now
            </Link>
          </div>
        </div>
      </section> */}

      <Footer />
    </div>
  );
}
