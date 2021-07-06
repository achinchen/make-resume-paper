import Head from 'next/head';
import Link from 'next/link';
import Editor from 'components/Editor';
import styles from 'styles/Home.module.scss';
import { useResume } from 'context';

export default function Home() {
  const { setupResume } = useResume();

  const onImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      setupResume(evt.target.result);
    };
    reader.readAsText(file);
  };
  return (
    <div className={styles.container}>
      <Head>
        <title>Create your resume!</title>
        <meta
          name="description"
          content="Create your resume with simple but classic style"
        />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Make Your Resume Paper!</h1>
        <nav className={styles.nav}>
          <label className={styles.label}>
            Import json
            <input
              className={styles.input}
              type="file"
              accept=".json"
              onInput={onImport}
            />
          </label>
          <Link href="/cv" passHref>
            <a className={styles.link}>Download</a>
          </Link>
        </nav>
      </header>
      <main className={styles.main}>
        <Editor />
      </main>
      <footer className={styles.footer}>
        Built with<span className={styles.emoji}>❤️</span>by A.chin
      </footer>
    </div>
  );
}
