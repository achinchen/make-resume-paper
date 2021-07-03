import cx from 'clsx';
import styles from './style.module.scss';

export function AddButton({ className, label, onAdd }) {
  return (
    <button className={cx(styles.addButton, className)} onClick={onAdd}>
      + {label}
    </button>
  );
}

export function DeleteButton({ onDelete }) {
  return (
    <button className={styles.deleteButton} onClick={onDelete}>
      -
    </button>
  );
}
