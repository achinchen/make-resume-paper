import NameGroup from './NameGroup';
import InfoGroup from './InfoGroup';
import MainGroup from './MainGroup';
import { useSaveStorage } from 'context';

import styles from './style.module.scss';

export default function DataCollection() {
  useSaveStorage();

  return (
    <div className={styles.collection}>
      <NameGroup />
      <InfoGroup />
      <MainGroup />
    </div>
  );
}
