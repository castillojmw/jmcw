import { match } from "ts-pattern";
import styles from "./Typography.module.scss";

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingProps = {
  children?: React.ReactNode;
  level: HeadingLevel;
};

const Heading = (props: HeadingProps) => {
  const { children } = props;
  return match(props)
    .with({ level: 1 }, () => <h1 className={styles.headingH1}>{children}</h1>)
    .with({ level: 2 }, () => <h2 className={styles.headingH2}>{children}</h2>)
    .with({ level: 3 }, () => <h3 className={styles.headingH3}>{children}</h3>)
    .with({ level: 4 }, () => <h4 className={styles.headingH4}>{children}</h4>)
    .with({ level: 5 }, () => <h5 className={styles.headingH5}>{children}</h5>)
    .with({ level: 6 }, () => <h6 className={styles.headingH6}>{children}</h6>)
    .exhaustive();
};

type BodyProps = {
  children?: React.ReactNode;
  level: 1 | 2 | 3;
};

const Body = (props: BodyProps) => {
  const { children } = props;

  return match(props)
    .with({ level: 1 }, () => <span className={styles.body1}>{children}</span>)
    .with({ level: 2 }, () => <span className={styles.body2}>{children}</span>)
    .with({ level: 3 }, () => <span className={styles.body3}>{children}</span>)
    .exhaustive();
};

export const Typography = {
  Heading,
  Body,
};
