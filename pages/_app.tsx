import Head from 'next/head';
import type { AppProps } from 'next/app'
import '../styles.css';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <>
      <Head>
        <title>Cynické hyeny</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
};

export default App;