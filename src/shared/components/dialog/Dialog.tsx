import {memo, type ReactNode} from "react";
import styles from './Dialog.module.scss';

type DialogProps = {
    title: string;
    open: boolean; 
    onClose: () => void;
    children: ReactNode;
};

export const Dialog = memo(({ open, title, onClose, children }: DialogProps) => {
  if (!open) return null;

  return (
    <div className={styles['dialog-backdrop']} onClick={onClose} role='presentation'>
      <div
        className={styles['dialog-container']}
        role='presentation'
        aria-modal='true'
        aria-labelledby='dialog-title'
        onClick={(e) => e.stopPropagation()}
      >
        <header className={styles['dialog-header']}>
          <h2 id='dialog-title' className={styles['dialog-title']}>{title}</h2>
          <button
            className={styles['dialog-close']}
            onClick={onClose}
            aria-label="Close dialog"
          >
            &#x2715;
          </button>
        </header>
        <hr />
        <main className={styles['dialog-content']}>
          {children}
        </main>
      </div>
    </div>
  );
})
