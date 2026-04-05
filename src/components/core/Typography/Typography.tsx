import clsx from "clsx";
import { match } from "ts-pattern";
import styles from "./Typography.module.scss";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  children?: React.ReactNode;
  level: HeadingLevel;
  className?: string;
};

const Heading = (props: HeadingProps) => {
  const { children, className } = props;
  return match(props)
    .with({ level: 1 }, () => <h1 className={clsx(styles.headingH1, className)}>{children}</h1>)
    .with({ level: 2 }, () => <h2 className={clsx(styles.headingH2, className)}>{children}</h2>)
    .with({ level: 3 }, () => <h3 className={clsx(styles.headingH3, className)}>{children}</h3>)
    .with({ level: 4 }, () => <h4 className={clsx(styles.headingH4, className)}>{children}</h4>)
    .with({ level: 5 }, () => <h5 className={clsx(styles.headingH5, className)}>{children}</h5>)
    .with({ level: 6 }, () => <h6 className={clsx(styles.headingH6, className)}>{children}</h6>)
    .exhaustive();
};

type BodyLevel = 1 | 2 | 3 | 4 | 5 | 6;

type BodyProps = {
  children?: React.ReactNode;
  level: BodyLevel;
  italic?: boolean;
  underline?: boolean;
  className?: string;
};

const Body = (props: BodyProps) => {
  const { children, level, italic, underline, className } = props;

  return (
    <span
      className={clsx(
        styles[`body${level}`],
        italic && styles.italic,
        underline && styles.underline,
        className,
      )}
    >
      {children}
    </span>
  );
};

export const Typography = {
  Heading,
  Body,
};
