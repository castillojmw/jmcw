import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Layered } from "../../components/Layered";
import { Flex } from "../../components/core/Flex/Flex";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../../utils/breakpoints";
import { Typography } from "../../components/core/Typography/Typography";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";

// Chevron SVG component
const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    fill="currentColor"
    className={styles.chevronArrow}
    viewBox="0 0 16 16"
  >
    <path
      fill-rule="evenodd"
      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
    />
  </svg>
);

// Hero Assets
import HERO_BACKGROUND_IMG from "./assets/hero.jpg";
import HERO_BACKGROUND_IMG_MOBILE from "./assets/mobile-hero.png";

// Card Assets
import SAMPLE_MENUS_IMG from "./assets/sample-menus.png";
import GALLERY_IMG from "./assets/gallery.png";
import ABOUT_IMG from "./assets/about.png";

// Styling
import styles from "./Home.module.scss";
import { Card, type CardProps } from "../../components/Card/Card";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const cardSectionRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.md})`,
  });

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      gsap.from(".core-fade-in", {
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 30,
        duration: 3.5,
        stagger: 0.2,
        ease: "power2.out",
      });
    }, containerRef);
    return () => context.revert();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Hide scroll indicator after first scroll interaction
  useEffect(() => {
    const handleScroll = () => {
      if (indicatorRef.current) {
        indicatorRef.current.classList.add("hidden");
      }
    };

    if (indicatorRef.current) {
      indicatorRef.current.addEventListener("click", handleScroll);
    }

    return () => {
      if (indicatorRef.current) {
        indicatorRef.current.removeEventListener("click", handleScroll);
      }
    };
  }, []);

  // Smooth scroll handler
  const handleIndicatorClick = () => {
    if (cardSectionRef.current) {
      cardSectionRef.current.scrollIntoView({ behavior: "smooth" });
      // Also hide the indicator after clicking
      if (indicatorRef.current) {
        indicatorRef.current.classList.add("hidden");
      }
    }
  };

  const cards: CardProps[] = [
    {
      label: "Menu Development",
      desc: "Seasonal menus rooted in cultrual heritage with a focus on bold flavors, respectful tradition, and personal expression.",
      to: "/jmcw/menus",
      img: SAMPLE_MENUS_IMG,
    },
    {
      label: "Dining exhibition",
      desc: "An archive of moments across three worlds: the comfort of home kitchen, the intimacy of private dining, the precision of fine dining. Each dish, a story.",
      to: "/jmcw/gallery",
      img: GALLERY_IMG,
    },
    {
      label: "Culinary journey",
      desc: "A chef whose palate and discipline were forged in elite kitchens, now refined at The Balmoral's French brasserie. At private events, that foundation becomes connection, food designed as a conversation between my cultural roots and the people gathered at the table.",
      to: "/jmcw/about",
      img: ABOUT_IMG,
    },
  ];

  return (
    <div className="page home-page">
      <Header />

      <section className={styles.hero}>
        <Layered.Container className={styles.layerContainer}>
          <Layered.Background className={styles.layerBackground}>
            <img
              src={isMobile ? HERO_BACKGROUND_IMG_MOBILE : HERO_BACKGROUND_IMG}
            />
          </Layered.Background>
          <Layered.Background></Layered.Background>
          <Layered.Content className={styles.layerContent}>
            <Typography.Heading level={1}>JMCW Portfolio</Typography.Heading>
            <p className={styles.heroSubtitle}>Jasmine Miles Castilo Walker</p>
          </Layered.Content>
        </Layered.Container>

        <div
          ref={indicatorRef}
          className={styles.chevronWrapper}
          onClick={handleIndicatorClick}
          title="Scroll to explore"
        >
          <div
            style={{
              backgroundColor: "#1f1f1f",
              width: "100px",
              color: "white",
              border: "none",
              textAlign: "center",
              borderRadius: "1rem",
              paddingTop: "5px",
              paddingBottom: "5px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            My work
          </div>
          <ChevronDownIcon />
        </div>
      </section>

      <section
        ref={cardSectionRef}
        style={{
          marginTop: "16rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          marginBottom: "16rem",
        }}
        className="w-100"
      >
        <Flex.Container direction="column" justify="center" align="center">
          <div ref={containerRef} className={styles.cardContainer}>
            {cards.map((item) => (
              <Card {...item} key={item.to} />
            ))}
          </div>
        </Flex.Container>
      </section>
      <Footer />
    </div>
  );
}
