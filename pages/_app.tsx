import '@styles/globals.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Solarium — Découvrez le système solaire</title>
        <meta
          name="description"
          content="Une application pour découvrir les planètes du système solaire."
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
