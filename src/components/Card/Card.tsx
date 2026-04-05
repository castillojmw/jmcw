import { Link } from "react-router-dom";
import { Flex } from "../core/Flex/Flex";
import { Typography } from "../core/Typography/Typography";

import styles from "./Card.module.scss";
import type { ReactNode } from "react";

export type CardProps = {
  to?: string;
  label: string;
  img: ReactNode;
  desc?: string;
};

export const Card = (props: CardProps) => {
  const { label, img } = props;

  const ImageWrapper = props.to ? <Link to={props.to}>{img}</Link> : img;

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
      {ImageWrapper}
      <Flex.Container direction="column" gap="1rem">
        <Typography.Body level={1}>{label}</Typography.Body>
        {props.desc && (
          <p
            style={{
              textWrap: "pretty",
            }}
            className={styles.cardDesc}
          >
            {props.desc}
          </p>
        )}
      </Flex.Container>
      {props.to && (
        <a
          href={props.to}
          style={{
            fontSize: "0.8rem",
            textDecoration: "underline",
            color: "white",
          }}
        >
          Find out more here
        </a>
      )}
    </Flex.Container>
  );
};
