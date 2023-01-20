import { Html, Head, Main, NextScript } from 'next/document';

const Document = (): JSX.Element => {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="icon" href="/icon-512.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@200;400;800&display=swap"
        />

        <meta name="robots" content="index, follow" />
        <meta 
          name="description"
          content="Svérázné zprávy z domova i obskurních zemí, na které se v tuzemských médiích zapomnělo. Komentáře s jasným názorem a dávkou sarkasmu, jež vás postaví na nohy lépe než ranní kafe."
        />

        <meta name="keywords" content="Cynické hyeny, ironické zprávy, sarkastické komentáře, blog, newsletter" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

export default Document;