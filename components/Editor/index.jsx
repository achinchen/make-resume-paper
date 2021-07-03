import Preview from './Preview';
import DataCollection from './DataCollection';
import styles from './style.module.scss';

export default function Editor() {
  return (
    <div className={styles.editor}>
      <Preview />
      <DataCollection />
    </div>
  );
}
