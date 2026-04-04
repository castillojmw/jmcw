import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import "./Menus.css";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  category: string;
}

const menuItems: MenuItem[] = [
  {
    id: 1,
    name: "Oysters with Champagne Mignonette",
    description: "Fresh Coast Oysters, Champagne Vinaigrette, Lemon Zest",
    price: "$24",
    category: "Starters",
  },
  {
    id: 2,
    name: "Heirloom Tomato Burrata",
    description:
      "Burrata Cheese, Basil Oil, Balsamic Gastrique, Toasted Pine Nuts",
    price: "$22",
    category: "Starters",
  },
  {
    id: 3,
    name: "Wagyu Beef Carpaccio",
    description: "Thinly Sliced Wagyu, Arugula, Parmesan Shavings, Capers",
    price: "$28",
    category: "Starters",
  },
  {
    id: 4,
    name: "Truffle Wild Mushroom Risotto",
    description:
      "Arborio Rice, Mixed Wild Mushrooms, Black Truffle Oil, Parmesan",
    price: "$34",
    category: "Mains",
  },
  {
    id: 5,
    name: "Pan-Seared Scallops",
    description: "Double Cut Scallops, Brown Butter, Sage, Crispy Pancetta",
    price: "$42",
    category: "Mains",
  },
  {
    id: 6,
    name: "Herb-Crusted Lamb Rack",
    description:
      "Lamb Rack, Potato Galette, Seasonal Vegetables, Red Wine Reduction",
    price: "$48",
    category: "Mains",
  },
  {
    id: 7,
    name: "Dark Chocolate Pot de Crème",
    description: "Belgian Dark Chocolate, Whipped Cream, Gold Flakes, Sea Salt",
    price: "$16",
    category: "Desserts",
  },
  {
    id: 8,
    name: "Lemon Basil Tart",
    description: "Lemon Curd, Basil Pesto Swirl, Meringue, Edible Flowers",
    price: "$15",
    category: "Desserts",
  },
];

const menuByCategory: Record<string, MenuItem[]> = {
  Starters: menuItems.filter((m) => m.category === "Starters"),
  Mains: menuItems.filter((m) => m.category === "Mains"),
  Desserts: menuItems.filter((m) => m.category === "Desserts"),
};

export default function MenusPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page menus-page">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Curated Menus</h1>
            <p className="hero-subtitle">
              Thoughtfully crafted dining experiences for every occasion
            </p>
          </div>
        </div>
      </section>

      {/* Menu Introduction */}
      <section className="intro section">
        <div className="container">
          <div className="intro-content">
            <h2 className="section-title">Our Menu Philosophy</h2>
            <div className="intro-text">
              <p>
                Our menus are designed to tell a story—one of seasonality,
                locality, and culinary artistry. Each dish represents a moment
                of balance, where technique meets tradition and ingredients
                speak for themselves.
              </p>
              <p>
                Whether you're hosting an intimate gathering or a grand
                celebration, we create menus that reflect your vision while
                showcasing the best of what the season has to offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Sections */}
      <section className="menu-sections section">
        <div className="container">
          {Object.entries(menuByCategory).map(([category, items]) => (
            <div key={category} className="menu-category">
              <div className="category-header">
                <h3 className="category-title">{category}</h3>
                <div className="category-line"></div>
              </div>

              <div className="menu-grid">
                {items.map((item) => (
                  <div key={item.id} className="menu-item">
                    <div className="item-content">
                      <div className="item-header">
                        <h4 className="item-name">{item.name}</h4>
                        <span className="item-price">{item.price}</span>
                      </div>
                      <p className="item-description">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking Section */}
      <section className="booking section">
        <div className="container">
          <div className="booking-content">
            <h2 className="section-title">Request a Menu</h2>
            <p className="booking-text">
              Interested in working together? We offer custom menu creation for
              private events, weddings, and special occasions. Let's create
              something memorable.
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
