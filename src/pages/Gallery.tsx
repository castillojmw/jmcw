import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import "./Gallery.css";

interface Dish {
  id: number;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

const dishes: Dish[] = [
  {
    id: 1,
    name: "Saffron Prawn Paella",
    description:
      "Traditional Valencian-style paella with fresh prawns, saffron-infused rice",
    category: "Main",
    imageUrl: "https://placehold.co/600x400/1a1a1a/2a2a2a?text=paella",
  },
  {
    id: 2,
    name: "Braised Short Rib",
    description:
      "Wagyu short rib, red wine reduction, garlic mash, roasted carrots",
    category: "Main",
    imageUrl: "https://placehold.co/600x400/1a1a1a/2a2a2a?text=short+rib",
  },
  {
    id: 3,
    name: "Seared Scallops",
    description:
      "Double cut scallops, brown butter sauce, crispy pancetta, lemon",
    category: "Starter",
    imageUrl: "https://placehold.co/600x400/1a1a1a/2a2a2a?text=scallops",
  },
  {
    id: 4,
    name: "Dark Chocolate Tart",
    description: "Belgian dark chocolate, sea salt, fresh berries, gold dust",
    category: "Dessert",
    imageUrl: "https://placehold.co/600x400/1a1a1a/2a2a2a?text=chocolate+tart",
  },
  {
    id: 5,
    name: "Lobster Bisque",
    description: "Rich seafood bisque, crème fraîche, chives, caviar",
    category: "Starter",
    imageUrl: "https://placehold.co/600x400/1a1a1a/2a2a2a?text=lobster+bisque",
  },
  {
    id: 6,
    name: "Lamb Rack with Mint",
    description: "Herb-crusted rack of lamb, mint sauce, seasonal vegetables",
    category: "Main",
    imageUrl: "https://placehold.co/600x400/1a1a1a/2a2a2a?text=lamb+rack",
  },
  {
    id: 7,
    name: "Crème Brûlée",
    description: "Vanilla bean crème brûlée, fresh berries, mint",
    category: "Dessert",
    imageUrl: "https://placehold.co/600x400/1a1a1a/2a2a2a?text=creme+brulee",
  },
  {
    id: 8,
    name: "Oysters Rockefeller",
    description: "Fresh oysters, spinach, Parmesan crust, Pernod butter",
    category: "Starter",
    imageUrl: "https://placehold.co/600x400/1a1a1a/2a2a2a?text=oysters",
  },
];

const categories = ["All", "Main", "Starter", "Dessert"];

export default function GalleryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [category, setCategory] = useState("All");

  const displayDishes =
    category === "All"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <div className="page gallery-page">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Gallery</h1>
            <p className="hero-subtitle">
              A visual journey through our culinary creations
            </p>
          </div>
        </div>
      </section>

      {/* Filter Section */}
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

      {/* Gallery Grid */}
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

      {/* Booking Section */}
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
      </section>

      <Footer />
    </div>
  );
}
