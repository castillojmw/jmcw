import { useEffect } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import { Hero } from "../../sections/Hero/Hero";
import { Flex } from "../../components/core/Flex/Flex";
import { Card } from "../../components/Card/Card";
import { Typography } from "../../components/core/Typography/Typography";

import KULTURA_IMG from "./assets/kultura.webp";
import HANGUK_IMG from "./assets/hanguk.webp";

import styles from "./Menus.module.scss";

export default function MenusPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page menus-page">
      <Header />
      <Hero
        override={
          <Flex.Container
            direction="column"
            justify="center"
            align="center"
            style={{ alignContent: "center" }}
            gap="4rem"
          >
            <Flex.Container direction="column" align="center" gap="0rem">
              <Typography.Heading level={1}>Sample Menus</Typography.Heading>
              <Typography.Body level={1}>
                A journey in cultural heritage expressed through food from
                kitchen to plate
              </Typography.Body>
            </Flex.Container>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                columnGap: "2rem",
              }}
            >
              <Card
                label="Kultura"
                img={<img className={styles.cardImg} src={KULTURA_IMG} />}
              />
              <Card
                label="Hanguk"
                img={<img className={styles.cardImg} src={HANGUK_IMG} />}
              />
            </div>
          </Flex.Container>
        }
      />

      <Footer />
    </div>
  );
}
