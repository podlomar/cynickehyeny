import Head from 'next/head';
import '../styles.css';

const App = ({ Component, pageProps }): JSX.Element => {
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