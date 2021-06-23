import Head from 'next/head';
import Editor from '../components/Editor';
import styles from '../styles/Home.module.scss';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create your resume!</title>
        <meta
          name="description"
          content="Create your resume with simple but classic style"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header className={styles.header}>
        <h1 className={styles.title}>Make Your Resume Paper!</h1>
      </header>
      <main className={styles.main}>
        <Editor />
      </main>
      <footer className={styles.footer}>
        {`Built with ${`❤️   `} by A.chin`}
      </footer>
    </div>
  );
}
