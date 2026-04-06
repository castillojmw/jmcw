import type { ReactNode } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
type ButtonProps = {
  children?: ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "tertiary";
  onClick?: () => void;
};
export const Button = ({
  children,
  className = "",
  variant = "primary",
  onClick = () => {},
}: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={clsx({
        [styles.button]: true,
        [styles.primaryButton]: variant === "primary",
        [styles.secondaryButton]: variant === "secondary",
        [styles.tertiaryButton]: variant === "tertiary",
        [className]: true,
      })}
    >
      {children}
    </button>
  );
};
