import * as React from "react";
import styles from "./Layered.module.scss";
/**
 * Layered.Background - A separate layer for the background image
 * Apply opacity to this without affecting content
 */
function Background({
  className = "",
  children,
  style,
}: {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`${styles.background} ${className}`} style={style}>
      {children}
    </div>
  );
}

/**
 * Layered.Content - The content layer sits on top of background
 * Uses flexbox for centering
 */
function Content({
  className = "",
  children,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  return (
    <div style={style} className={`${styles.content} ${className}`}>
      {children}
    </div>
  );
}

/**
 * Layered.Container - A wrapper that positions background and content together
 */
function Container({
  className = "",
  children,
  style,
}: {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div style={style} className={`${styles.container} ${className}`}>
      {children}
    </div>
  );
}

export const Layered = {
  Container,
  Content,
  Background,
};
