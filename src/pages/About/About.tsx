import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Header from "../../components/Header/Header";
import Footer from "../../components/core/Footer/Footer";
import "./About.css";
import { Hero } from "../../sections/Hero/Hero";

gsap.registerPlugin(ScrollToPlugin);

import styles from "./About.module.scss";
import { Flex } from "@/components/core/Flex/Flex";
import { Typography } from "@/components/core/Typography/Typography";
import { Button } from "@/components/Button/Button";

const EXPERIENCE = [
  {
    year: "Jun 2025 - Present",
    title: "Chef - The Balmoral Hotel, Rocco Forte (Brasserie Prince)",
    location: "Edinburgh, UK",
    description:
      "Working across Pastry, Larder and Bar sections in a French brasserie within a 5-star luxury hotel. Executing classic French dishes and fusion plates in an elite fine-dining environment continuously evaluated by Forbes Travel Guide, AA Rosette assessors and Michelin Guide representatives. Represented the hotel at the Master Chefs of G.B conference, engaging with renowned executive chefs and industry leaders. Consistently deliver precision during 12-hour shifts in high-pressure, elite kitchen environments.",
  },
  {
    year: "2023 - Present",
    title: "Part Time Event Catering & Private Chef",
    location: "Edinburgh, UK",
    description:
      "Collaborate with clients to develop tailored culinary concepts for events and private kitchen projects, offering consultancy in menu design, logistics, event management, and presentation. Led culinary teams for small and large-scale events serving up to 100 HNW international guests, ensuring seamless client satisfaction. Produce engaging culinary content for a growing online community, focusing on approachable quality recipes, cuisine exploration, and recipe development.",
  },
  {
    year: "Jul 2022 - Present",
    title: "Founder & Head Chef - AsiaWithYou",
    location: "Edinburgh, UK",
    description:
      "Founded and developed an Asian meal kit service offering authentic Chinese, Korean, Japanese, Viet, Thai, Filipino and South Asian recipes with a focus on cultural authenticity, ease of preparation, and gourmet quality. Lead recipe development, ingredient sourcing, and instructional design, successfully scaling to accommodate diverse dietary preferences including customisable meal kits. Maintain compliance with food safety, allergen management, and labelling regulations.",
  },
  {
    year: "Sep 2022 - 2023",
    title: "Head of Events - Filipino Society",
    location: "Edinburgh, UK",
    description:
      "Led planning and execution of cultural events with the committee, managing logistics and operations. Secured sponsorships from food vendors and cultural businesses, and coordinated food-related elements such as catering and traditional cuisine showcases. Collaborated with other cultural societies for joint events and developed culturally engaging programs promoting heritage while managing budgets.",
  },
  {
    year: "Education",
    title: "BEng Structural Engineering and Architecture",
    location: "The University of Edinburgh",
    description:
      "Combined degree programme integrating structural engineering principles with architectural design and spatial thinking.",
  },
  {
    year: "Certifications",
    title: "Level 3 Food Safety & Hygiene",
    location: "Eversley Training",
    description:
      "Level 3 Food Safety & Hygiene Certificate (No: 1694435265) — Valid Sept 2023-2026",
  },
  {
    year: "Jun 2025",
    title: "Professional Training — Rocco Forte Hotels",
    location: "The Balmoral Hotel",
    description:
      "GDPR, Fire and Safety Prevention, Global Safety Manual Handling, Food Safety Level 2, Food Allergens, COSHH: Working with Hazardous Substances, First Aid Awareness",
  },
];

export default function AboutPage() {
  const [headerBlurred, setHeaderBlurred] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const experienceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleExperienceClick = () => {
    if (experienceRef.current) {
      gsap.to(window, {
        duration: 0.6,
        scrollTo: { y: experienceRef.current, offsetY: 100 },
        ease: "none",
      });
    }
  };

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

  return (
    <div className="page about-page">
      <Header blur={headerBlurred} />
      <div ref={heroRef}>
        <Hero
          heading="About the chef"
          subheading="Passion, precision, and a lifelong journey through flavor"
          extraContent={
            <Flex.Container
              style={{ paddingTop: "2rem" }}
              className={styles.heroCtas}
            >
              <Button className={styles.button}>
                <a href="/cv.pdf" target="_blank" rel="noopener noreferrer">
                  <Typography.Body level={5}>View my CV</Typography.Body>
                </a>
              </Button>
              <Button
                variant="tertiary"
                className={styles.button}
                onClick={handleExperienceClick}
              >
                <Typography.Body underline level={5}>
                  See my experience
                </Typography.Body>
              </Button>
            </Flex.Container>
          }
        />
      </div>

      <section ref={experienceRef} className={`${styles.experienceSection}`}>
        <Flex.Container direction="column" gap="2rem" align="center">
          <Typography.Heading level={4}>
            Experience & Training
          </Typography.Heading>

          <div className="timeline">
            {EXPERIENCE.map((item, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-year">{item.year}</div>
                <div className="timeline-content">
                  <h4 className="timeline-title">{item.title}</h4>
                  {item.location && (
                    <p className="timeline-location">{item.location}</p>
                  )}
                  <p className="timeline-desc">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Flex.Container>
      </section>

      <Footer />
    </div>
  );
}
