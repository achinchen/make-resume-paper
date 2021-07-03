import Head from 'next/head';
import { ResumeProvider } from 'context/index';
import 'styles/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <ResumeProvider>
      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </ResumeProvider>
  );
}

export default MyApp;
