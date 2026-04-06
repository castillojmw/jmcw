import { useEffect, useCallback } from "react";
import { createPortal } from "react-dom";

import styles from "./ImageModal.module.scss";

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
    [onClose]
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
      <div
        className={styles.content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.imageWrapper}>
          <img
            src={src}
            alt={alt}
            className={styles.image}
          />
        </div>
        <div className={styles.footer}>
          <p className={styles.label}>{label}</p>
          <button
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close modal"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
