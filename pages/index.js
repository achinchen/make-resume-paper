import Head from 'next/head';
import Link from 'next/link';
import Editor from 'components/Editor';
import styles from 'styles/Home.module.scss';

export default function Home() {
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
        <Link href="/cv" passHref>
          <a className={styles.download}>Go and Download</a>
        </Link>
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
