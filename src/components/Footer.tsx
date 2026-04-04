import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-section">
          <h3 className="footer-title">JASMINE CASTILLO</h3>
          <p className="footer-text">
            Crafting bespoke culinary experiences for private events and discerning guests.
          </p>
        </div>

        <div className="footer-section footer-links">
          <h4 className="footer-subtitle">EXPLORE</h4>
          <ul className="footer-nav">
            <li><a href="#home" className="footer-link">Home</a></li>
            <li><a href="#menus" className="footer-link">Menus</a></li>
            <li><a href="#gallery" className="footer-link">Gallery</a></li>
            <li><a href="#about" className="footer-link">About</a></li>
          </ul>
        </div>

        <div className="footer-section footer-links">
          <h4 className="footer-subtitle">CONNECT</h4>
          <ul className="footer-nav">
            <li><a href="mailto:jasmine@jasminecastillo.com" className="footer-link">Email</a></li>
            <li><a href="#" className="footer-link">Instagram</a></li>
            <li><a href="#" className="footer-link">LinkedIn</a></li>
          </ul>
        </div>

        <div className="footer-section footer-contact">
          <h4 className="footer-subtitle">INQUIRE</h4>
          <p className="footer-text footer-email">
            jasmine@jasminecastillo.com
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="footer copyright">
            © {currentYear} Jasmine Castillo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
