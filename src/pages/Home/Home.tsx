import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Flex } from "../../components/core/Flex/Flex";

import Header from "../../components/Header/Header";
import Footer from "../../components/core/Footer/Footer";

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

// Card Assets
import SAMPLE_MENUS_IMG from "./assets/sample-menus.webp";
import GALLERY_IMG from "./assets/gallery.webp";
import ABOUT_IMG from "./assets/about.webp";

// Styling
import styles from "./Home.module.scss";
import { Card, type CardProps } from "../../components/Card/Card";
import { Hero } from "../../sections/Hero/Hero";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const containerRef = useRef(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const cardSectionRef = useRef<HTMLDivElement | null>(null);
  const [headerBlurred, setHeaderBlurred] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const heroBottom = heroRef.current.getBoundingClientRect().bottom;
        setHeaderBlurred(heroBottom < 0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
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
      to: "/menus",
      img: <img src={SAMPLE_MENUS_IMG} className={styles.cardImg} />,
    },
    {
      label: "Dining exhibition",
      desc: "An archive of moments across three worlds: the comfort of home kitchen, the intimacy of private dining, the precision of fine dining. Each dish, a story.",
      to: "/gallery",
      img: <img src={GALLERY_IMG} className={styles.cardImg} />,
    },
    {
      label: "Culinary journey",
      desc: "A chef whose palate and discipline were forged in elite kitchens, now refined at The Balmoral's French brasserie. At private events, that foundation becomes connection, food designed as a conversation between my cultural roots and the people gathered at the table.",
      to: "/about",
      img: <img src={ABOUT_IMG} className={styles.cardImg} />,
    },
  ];

  return (
    <div className="page home-page">
      <Header blur={headerBlurred} />

      <div ref={heroRef}>
        <Hero
          extraContent={
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
          }
        />
      </div>

      <section
        ref={cardSectionRef}
        style={{
          paddingTop: "8rem",
          paddingLeft: "1rem",
          paddingRight: "1rem",
          marginBottom: "16rem",
        }}
        className="w-100"
      >
        <Flex.Container direction="column" justify="center" align="center">
          <div ref={containerRef} className={styles.cardContainer}>
            {cards.map((item) => (
              <Card {...item} key={item.to} className={styles.card} />
            ))}
          </div>
        </Flex.Container>
      </section>
      <Footer />
    </div>
  );
}
