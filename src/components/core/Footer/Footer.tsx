import { Typography } from "../Typography/Typography";

import styles from "./Footer.module.scss";

const EXPLORE = [
  { label: "Home", link: "/" },
  { label: "Menus", link: "/menus" },
  { label: "Gallery", link: "/gallery" },
  { label: "About", link: "/about" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerLinksGrid}>
          <div className={styles.footerBrand}>
            <Typography.Heading level={4}>JMCW</Typography.Heading>
            <Typography.Body className={styles.footerText} level={5}>
              Crafting bespoke culinary experiences for private events and
              discerning guests.
            </Typography.Body>
          </div>

          <div className={styles.footerSection}>
            <Typography.Heading level={6}>Explore</Typography.Heading>
            {EXPLORE.map(({ label, link }) => (
              <a key={link} href={link}>
                <Typography.Body className={styles.footerLinks} level={5}>
                  {label}
                </Typography.Body>
              </a>
            ))}
          </div>

          <div className={styles.footerSection}>
            <Typography.Heading level={6}>Inquire</Typography.Heading>
            <Typography.Body level={5} className={styles.footerLinks}>
              jasmine@jasminecastillo.com
            </Typography.Body>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <Typography.Body className={styles.copyright} level={5}>
          © {currentYear} Jasmine Castillo. All rights reserved.
        </Typography.Body>
      </div>
    </footer>
  );
}
