import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { Flex } from "../core/Flex/Flex";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../../utils/breakpoints";
import clsx from "clsx";

export default function Header() {
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.md})`,
  });
  const location = useLocation();
  const activeNav = location.pathname;

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/gallery", label: "Gallery" },
    { to: "/menus", label: "Sample Menus" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header className={styles.header}>
      <nav
        className={clsx({
          [styles.nav]: !isMobile,
          [styles.navMobile]: isMobile,
        })}
      >
        <Flex.Container direction="row" gap={isMobile ? "1rem" : "2.5rem"}>
          {navLinks.map((link) => (
            <Flex.Container direction="column">
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
      </nav>
    </header>
  );
}
