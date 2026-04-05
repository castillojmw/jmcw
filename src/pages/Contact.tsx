import { useEffect } from "react";
import Header from "../components/Header/Header";
import Footer from "../components/core/Footer/Footer";
import "./Contact.css";

export default function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page contact-page">
      <Header />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">Get in Touch</h1>
            <p className="hero-subtitle">
              Let's create a culinary experience together
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h2 className="section-title">Inquire About Services</h2>
              <p className="contact-intro">
                Whether you're planning an intimate dinner, a celebration, or
                exploring the possibilities of private chef services, I'd love
                to hear from you. Fill out the form and I'll get back to you
                within 24 hours.
              </p>

              <div className="contact-details">
                <div className="detail-item">
                  <h4 className="detail-title">Email</h4>
                  <a
                    href="mailto:jasmine@jasminecastillo.com"
                    className="detail-value"
                  >
                    jasmine@jasminecastillo.com
                  </a>
                </div>

                <div className="detail-item">
                  <h4 className="detail-title">Location</h4>
                  <p className="detail-value">
                    Available for private events in [City/Region]
                  </p>
                </div>

                <div className="detail-item">
                  <h4 className="detail-title">Hours</h4>
                  <p className="detail-value">
                    consultations by appointment Monday through Saturday
                  </p>
                </div>
              </div>

              <div className="social-links">
                <h4 className="social-title">Follow & Connect</h4>
                <div className="social-buttons">
                  <a href="#" className="social-btn">
                    Instagram
                  </a>
                  <a href="#" className="social-btn">
                    LinkedIn
                  </a>
                  <a href="#" className="social-btn">
                    Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper">
              <form
                className="contact-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-input"
                    placeholder="Your name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone" className="form-label">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    className="form-input"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="interest" className="form-label">
                    Interest
                  </label>
                  <select id="interest" className="form-select">
                    <option value="">Select an option</option>
                    <option value="private-event">
                      Private Event / Dinner Party
                    </option>
                    <option value="wedding">Wedding</option>
                    <option value="corporate">Corporate Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-textarea"
                    rows={5}
                    placeholder="Tell me about your event..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-gold btn-block">
                  Send Inquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <div className="container">
          <div className="map-placeholder">
            <div className="map-content">
              <span className="map-icon">📍</span>
              <span className="map-text">Map Location Placeholder</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
