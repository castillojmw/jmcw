import { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/core/Footer/Footer";
import "./About.css";

export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page about-page">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">About the Chef</h1>
            <p className="hero-subtitle">
              Passion, precision, and a lifelong journey through flavor
            </p>
          </div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="bio-section section">
        <div className="container">
          <div className="bio-content">
            <div className="bio-image">
              <div className="image-placeholder">chef portrait placeholder</div>
            </div>
            <div className="bio-text">
              <h2 className="section-title">My Journey</h2>
              <div className="bio-intro">
                <p>
                  My journey in the kitchen began not in a culinary school, but
                  at my grandmother's stove—a warm, sunlit kitchen in [Hometown]
                  where the air always smelled of garlic, herbs, and something
                  special waiting to become dinner.
                </p>
                <p>
                  That early connection to food as more than sustenance—food as
                  memory, as love, as story—has shaped everything I do. After
                  formal training at the [Culinary School] and years in the
                  demanding environment of Michelin-starred restaurants, I found
                  my way to private chef work, where I could focus on what
                  matters most: creating meaningful dining experiences for the
                  people who matter most.
                </p>
                <p>
                  Today, I bring that same intensity and reverence for
                  ingredients to private events, weddings, and intimate
                  gatherings. My philosophy remains simple: treat every dish as
                  if it's for someone you love, because often, it is.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="experience-section section">
        <div className="container">
          <h2 className="section-title">Experience & Training</h2>

          <div className="timeline">
            {[
              {
                year: "2018 - Present",
                title: "Private Chef",
                description:
                  "Creating bespoke culinary experiences for private clients and events",
              },
              {
                year: "2015 - 2018",
                title: "Sous Chef, The Grand Hotel",
                description:
                  "Led the kitchen in Michelin-starred restaurant, managed service operations",
              },
              {
                year: "2012 - 2015",
                title: "Commis Chef, Le Jardin",
                description:
                  "Formal training in classical French techniques and seasonal cooking",
              },
              {
                year: "2010",
                title: "Culinary Arts Diploma",
                description:
                  "Certified from the International Culinary Institute",
              },
            ].map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{item.title}</h4>
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="philosophy-section section">
        <div className="container">
          <h2 className="section-title">My Philosophy</h2>

          <div className="philosophy-grid">
            {[
              {
                title: "Seasonality",
                description:
                  "I cook with what the earth provides in its proper season. This means constantly evolving menus and dishes that truly taste like their moment in time.",
              },
              {
                title: "Simplicity",
                description:
                  "The best ingredients need only thoughtful preparation. I trust the quality of what I use and let each component shine without unnecessary complexity.",
              },
              {
                title: "Storytelling",
                description:
                  "Every meal tells a story—from the farm to your table. I aim to create experiences that linger in memory, not just on the palate.",
              },
            ].map((item, idx) => (
              <div key={idx} className="philosophy-card">
                <h4 className="philosophy-title">{item.title}</h4>
                <p className="philosophy-desc">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section section">
        <div className="container">
          <div className="cta-content">
            <h2 className="section-title">Let\'s Create Something Memorable</h2>
            <p className="cta-text">
              Whether you\'re planning an intimate dinner, a celebration, or
              exploring the possibilities of private chef services, I\'d love to
              hear from you.
            </p>
            <Link to="/contact" className="btn btn-gold">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
