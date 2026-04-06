import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.scss";
import { Flex } from "../core/Flex/Flex";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../../utils/breakpoints";
import clsx from "clsx";

const mail = (
  <a
    href="mailto:jasmine@jasminecastillo.com"
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
  { to: "/jmcw/", label: "Home" },
  { to: "/jmcw/gallery", label: "Gallery" },
  { to: "/jmcw/menus", label: "Sample Menus" },
  { to: "/jmcw/about", label: "About" },
];

export default function Header({ blur = false }: HeaderProps) {
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.md})`,
  });
  const location = useLocation();
  const activeNav = location.pathname;

  return (
    <header
      className={clsx({ [styles.header]: true, [styles.overrideBlur]: blur })}
    >
      <nav className={styles.nav}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
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
          {mail}
        </div>
      </nav>
    </header>
  );
}
