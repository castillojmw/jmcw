import { Link } from "react-router-dom";
import { Flex } from "../core/Flex/Flex";
import { Typography } from "../core/Typography/Typography";

import styles from "./Card.module.scss";

export type CardProps = {
  to: string;
  label: string;
  img: string;
  desc: string;
};

export const Card = ({ to, label, img, desc }: CardProps) => {
  return (
    <Flex.Container
      direction="column"
      justify="center"
      className={"core-fade-in"}
      style={{
        overflow: "hidden",
        maxWidth: "400px",
      }}
      gap="1rem"
    >
      <Link to={to}>
        <img className={styles.cardImg} src={img} />
      </Link>
      <Flex.Container direction="column" gap="1rem">
        <Typography.Body level={1}>{label}</Typography.Body>
        <p
          style={{
            textWrap: "pretty",
          }}
          className={styles.cardDesc}
        >
          {desc}
        </p>
      </Flex.Container>
      <a
        href={to}
        style={{
          fontSize: "0.8rem",
          textDecoration: "underline",
          color: "white",
        }}
      >
        Find out more here
      </a>
    </Flex.Container>
  );
};
