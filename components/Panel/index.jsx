import { useResume } from 'context';
import promptDownload, { SUPPORTED_TYPES } from './utils';
import styles from './style.module.scss';

const Panel = () => {
  const { name, info, mainContent } = useResume();
  const payload = JSON.stringify({ name, info, mainContent });

  const onHtml = async () => {
    try {
      const result = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
          Accept: SUPPORTED_TYPES.html
        },
        body: payload
      });
      const body = await result.text();

      await promptDownload(body, 'html');
    } catch (e) {
      console.log(e);
    }
  };

  const onPrint = async () => {
    window.print();
  };

  const onJSON = async () => {
    try {
      await promptDownload(payload, 'json');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <aside className={styles.panel}>
      <div>Download your resume 🥑</div>
      <div>
        <button className={styles.option} onClick={onPrint}>
          pdf
        </button>
        <button className={styles.option} onClick={onHtml}>
          html
        </button>
        <button className={styles.option} onClick={onJSON}>
          json
        </button>
      </div>
    </aside>
  );
};

export default Panel;
