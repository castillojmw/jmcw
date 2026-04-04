import type { ReactNode } from "react";
import "./Flex.less";

type FlexContainerProps = {
  direction?: "column" | "row";
  className?: string;
  justify?: "center" | "start" | "end";
  align?: "center" | "start" | "end";
  gap?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
};

const Container = ({
  direction = "row",
  justify = "start",
  align = "start",
  className = "",
  gap = "0",
  children,
  style,
}: FlexContainerProps) => {
  return (
    <div
      style={{
        gap: gap,
        ...style,
      }}
      className={`core-flex-justify-${justify} core-flex-align-${align} core-flex core-flex-${direction} ${className}`}
    >
      {children}
    </div>
  );
};

export const Flex = {
  Container,
};
