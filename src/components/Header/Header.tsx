import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { Flex } from "../core/Flex/Flex";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../../utils/breakpoints";
import clsx from "clsx";

const mail = (
  <a
    href="mailto:castillojmw.ph@gmail.com"
    className={styles.emailIcon}
    aria-label="Send email"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  </a>
);

type HeaderProps = {
  blur?: boolean;
};

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/gallery", label: "Gallery" },
  { to: "/menus", label: "Sample Menus" },
  { to: "/about", label: "About" },
];

export default function Header({ blur = false }: HeaderProps) {
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.md})`,
  });
  const location = useLocation();
  const activeNav = location.pathname;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={clsx({ [styles.header]: true, [styles.overrideBlur]: blur })}
    >
      <nav
        className={clsx(styles.nav, {
          [styles.mobileMenuOpen]: isMobile && mobileMenuOpen,
        })}
      >
        <div className={styles.navInner}>
          {!isMobile && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Flex.Container direction="row" gap="2.5rem">
                {navLinks.map((link) => (
                  <Flex.Container direction="column" key={link.to}>
                    <Link to={link.to} className={styles.navLink}>
                      {link.label}
                    </Link>
                    {link.to === activeNav && (
                      <div
                        className="core-width-100"
                        style={{
                          top: "5px",
                          height: "1px",
                          backgroundColor: "white",
                        }}
                      />
                    )}
                  </Flex.Container>
                ))}
              </Flex.Container>
              <div className={styles.emailIconMobile}>{mail}</div>
            </div>
          )}
          {isMobile && (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <button
                className={styles.hamburger}
                onClick={toggleMobileMenu}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="4" y1="6" x2="20" y2="6" />
                    <line x1="4" y1="12" x2="20" y2="12" />
                    <line x1="4" y1="18" x2="20" y2="18" />
                  </svg>
                )}
              </button>
              {mobileMenuOpen && (
                <div className={styles.mobileMenu}>
                  {navLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      className={clsx(styles.navLink, styles.mobileNavLink, {
                        [styles.active]: link.to === activeNav,
                      })}
                      onClick={closeMobileMenu}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
              <div className={styles.emailIconMobile}>{mail}</div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}
