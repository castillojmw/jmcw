import type { ReactNode } from "react";
import { Layered } from "../../components/Layered";
import styles from "./Hero.module.scss";
import { useMediaQuery } from "react-responsive";
import { BREAKPOINTS } from "../../utils/breakpoints";
import { Typography } from "../../components/core/Typography/Typography";

// Hero Assets
import HERO_BACKGROUND_IMG from "./assets/hero.jpg";
import HERO_BACKGROUND_IMG_MOBILE from "./assets/mobile-hero.jpg";

type HeroProps = {
  heading?: string;
  subheading?: string;
  extraContent?: ReactNode;
  override?: ReactNode | null;
};

export const Hero = ({
  heading = "JMCW Portfolio",
  subheading = "Jasmine Miles Castilo Walker",
  extraContent,
  override,
}: HeroProps) => {
  const isMobile = useMediaQuery({
    query: `(max-width: ${BREAKPOINTS.md})`,
  });

  return (
    <section className={styles.hero}>
      <Layered.Container className={styles.layerContainer}>
        <Layered.Background className={styles.layerBackground}>
          <img
            src={isMobile ? HERO_BACKGROUND_IMG_MOBILE : HERO_BACKGROUND_IMG}
          />
        </Layered.Background>
        <Layered.Content className={styles.layerContent}>
          {override ? (
            override
          ) : (
            <>
              <Typography.Heading level={1}>{heading}</Typography.Heading>
              <Typography.Body level={4}>{subheading}</Typography.Body>
            </>
          )}
        </Layered.Content>
      </Layered.Container>
      {extraContent ?? null}
    </section>
  );
};
