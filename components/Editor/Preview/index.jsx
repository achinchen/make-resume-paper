import React from 'react';
import CV from 'components/CV';
import { useResume } from 'context';
import styles from './style.module.scss';

export default React.memo(function Preview() {
  const { name, info, mainContent } = useResume();
  return (
    <div className={styles.preview}>
      <CV name={name} info={info} mainContent={mainContent} preview />
    </div>
  );
});
