import { Link } from "react-router-dom";
import { Flex } from "../core/Flex/Flex";
import { Typography } from "../core/Typography/Typography";

import styles from "./Card.module.scss";
import type { ReactNode } from "react";
import clsx from "clsx";

export type CardProps = {
  variant?: "default" | "textbox";
  to?: string;
  label: string;
  img: ReactNode;
  desc?: string;
  className?: string;
  onClick?: () => void;
  showLabelOnCard?: boolean;
  maxWidth?: string;
  style?: React.CSSProperties;
  extraContent?: ReactNode;
};

export const Card = (props: CardProps) => {
  const {
    label,
    img,
    className,
    onClick,
    showLabelOnCard = true,
    maxWidth = "400px",
    style,
    variant = "default",
    extraContent,
  } = props;

  const ImageWrapper = onClick ? (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
        display: "contents",
      }}
    >
      {img}
    </button>
  ) : props.to ? (
    <Link to={props.to}>{img}</Link>
  ) : (
    img
  );

  return (
    <Flex.Container
      direction="column"
      justify="center"
      className={`core-fade-in ${className ?? ""}`}
      style={{
        overflow: "hidden",
        maxWidth,
        ...style,
      }}
      gap={variant === "default" ? "1rem" : "0rem"}
    >
      {ImageWrapper}
      {showLabelOnCard && (
        <Flex.Container
          className={clsx({
            [styles.defaultLabel]: variant === "default",
            [styles.textboxLabel]: variant === "textbox",
          })}
          direction="column"
          gap="1rem"
        >
          <Typography.Body level={variant === "default" ? 1 : 3}>
            {label}
          </Typography.Body>
          {props.desc && <p className={styles.cardDesc}>{props.desc}</p>}
          {variant === "textbox" && extraContent}
        </Flex.Container>
      )}
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
