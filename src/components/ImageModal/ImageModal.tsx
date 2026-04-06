import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import styles from "./ImageModal.module.scss";
import { Card } from "../Card/Card";
import { Typography } from "../core/Typography/Typography";
import { Button } from "../Button/Button";

export type ImageModalProps = {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt?: string;
  label: string;
};

export const ImageModal = (props: ImageModalProps) => {
  const { isOpen, onClose, src, alt = "", label } = props;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className={styles.backdrop}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <Card
          variant="textbox"
          label={label}
          img={<img src={src} alt={alt} className={styles.image} />}
          extraContent={
            <Button className={styles.closeButton} onClick={onClose}>
              <Typography.Body underline level={6}>
                Close
              </Typography.Body>
            </Button>
          }
        />
      </div>
    </div>,
    document.body,
  );
};
