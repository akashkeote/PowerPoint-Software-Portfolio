import Head from 'next/head';
import '../styles/App.css';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Akash Keote Portfolio</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
