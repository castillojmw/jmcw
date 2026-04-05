import { useEffect, useRef, useState } from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer";
import { Hero } from "../../sections/Hero/Hero";
import { Flex } from "../../components/core/Flex/Flex";
import { Card } from "../../components/Card/Card";
import { Typography } from "../../components/core/Typography/Typography";

import KULTURA_IMG from "./assets/kultura.webp";
import KULTURA_MENU from "./assets/kultura/menu-classic.png";
import KULTURA_MENU_VG from "./assets/kultura/menu-vegetarian.png";

import HANGUK_IMG from "./assets/hanguk.webp";
import HANGUK_MENU from "./assets/hanguk/menu-classic.jpg";
import HANGUK_MENU_VG from "./assets/hanguk/menu-vegetarian.png";

import styles from "./Menus.module.scss";
import type { ViteGlobModule } from "../Gallery/Gallery";

const KULTURA_IMAGES = import.meta.glob<ViteGlobModule>(
  "./assets/kultura/eg/*.jpg",
  {
    eager: true,
  },
);

const HANGUK_IMAGES = import.meta.glob<ViteGlobModule>(
  "./assets/hanguk/eg/*.jpg",
  {
    eager: true,
  },
);

const MenuMap: Record<Menus, Record<string, ViteGlobModule>> = {
  Hanguk: HANGUK_IMAGES,
  Kultura: KULTURA_IMAGES,
};

const generateImageList = (images: Record<string, ViteGlobModule>) =>
  Object.entries(images).map(([, mod]) => mod.default);

type Menus = "Kultura" | "Hanguk";

export default function MenusPage() {
  const [menu, setMenu] = useState<Menus>("Kultura");
  const [imageList, setImageList] = useState(generateImageList(KULTURA_IMAGES));
  const menuSectionRef = useRef<HTMLDivElement>(null);

  const handleMenuChange = (menu: Menus) => {
    setMenu(menu);
    setImageList(generateImageList(MenuMap[menu]));
    menuSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

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
            <div className={styles.heroGrid}>
              <Card
                onClick={() => handleMenuChange("Kultura")}
                className={styles.heroCard}
                label="Kultura"
                img={<img className={styles.cardImg} src={KULTURA_IMG} />}
              />
              <Card
                onClick={() => handleMenuChange("Hanguk")}
                className={styles.heroCard}
                label="Hanguk"
                img={<img className={styles.cardImg} src={HANGUK_IMG} />}
              />
            </div>
          </Flex.Container>
        }
      />
      <section ref={menuSectionRef} className="section">
        <Flex.Container
          direction="row"
          gap="4rem"
          align="center"
          style={{ paddingBottom: "6rem" }}
        >
          <div
            onClick={() => handleMenuChange("Kultura")}
            style={{ cursor: "pointer" }}
          >
            {menu === "Kultura" ? (
              <Flex.Container direction="column">
                <Typography.Heading level={1}>Kultura</Typography.Heading>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "white",
                  }}
                />
              </Flex.Container>
            ) : (
              <Typography.Heading level={3}>Kultura</Typography.Heading>
            )}
          </div>
          <div
            onClick={() => handleMenuChange("Hanguk")}
            style={{ cursor: "pointer" }}
          >
            {menu === "Hanguk" ? (
              <Flex.Container direction="column">
                <Typography.Heading level={1}>Hanguk</Typography.Heading>
                <div
                  style={{
                    width: "100%",
                    height: "1px",
                    backgroundColor: "white",
                  }}
                />
              </Flex.Container>
            ) : (
              <Typography.Heading level={3}>Hanguk</Typography.Heading>
            )}
          </div>
        </Flex.Container>

        <Flex.Container
          className={styles.menuBody}
          // direction="column"
          gap="2rem"
        >
          <Flex.Container
            direction="column"
            align="center"
            className={`core-width-100 ${styles.menuContainer}`}
            gap="4rem"
          >
            <Card
              label="Classic Menu"
              img={
                <img
                  className={styles.cardImg}
                  src={menu === "Kultura" ? KULTURA_MENU : HANGUK_MENU}
                />
              }
            />
            <Card
              label="Vegetarian Menu"
              img={
                <img
                  className={styles.cardImg}
                  src={menu === "Kultura" ? KULTURA_MENU_VG : HANGUK_MENU_VG}
                />
              }
            />
          </Flex.Container>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridColumnGap: "2rem",
              gridRowGap: "2rem",
              width: "fit-content",
            }}
          >
            {imageList.map((image) => (
              <div className="core-overflow-hidden">
                <img
                  style={{
                    aspectRatio: "1/1",
                    width: "100%",
                    objectFit: "cover",
                  }}
                  src={image}
                  key={image}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </Flex.Container>
      </section>

      <Footer />
    </div>
  );
}
