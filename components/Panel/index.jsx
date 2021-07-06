import { useResume } from 'context';
import promptDownload, { SUPPORTED_TYPES } from './utils';
import styles from './style.module.scss';
import { useState } from 'react';

const TITLE = 'Download your resume 🥑';
const ERROR_MESSAGE = 'Oops, something happened! 😔';

const Panel = () => {
  const [message, setMessage] = useState(TITLE);
  const { name, info, mainContent } = useResume();
  const disabled = message !== TITLE;
  const payload = JSON.stringify({ name, info, mainContent });

  const setGeneralError = (e) => {
    window.localStorage.setItem('__resume_error', JSON.stringify(e));
    setMessage(ERROR_MESSAGE);
    setTimeout(() => {
      setMessage(TITLE);
    }, 5000);
  };

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
      setGeneralError(e);
    }
  };

  const onPrint = async () => {
    window.print();
  };

  const onJSON = async () => {
    try {
      await promptDownload(payload, 'json');
    } catch (e) {
      setGeneralError(e);
    }
  };

  return (
    <aside className={styles.panel}>
      <div>{message}</div>
      <div>
        <button className={styles.option} disabled={disabled} onClick={onPrint}>
          pdf
        </button>
        <button className={styles.option} disabled={disabled} onClick={onHtml}>
          html
        </button>
        <button className={styles.option} disabled={disabled} onClick={onJSON}>
          json
        </button>
      </div>
    </aside>
  );
};

export default Panel;
