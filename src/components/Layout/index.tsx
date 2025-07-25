import { Header } from '../Header/index.js';
import { Footer } from '../Footer/index.js';

interface Props {
  link: string;
  children: any;
}

export const Layout = ({ link, children }: Props) => {
  return (
    <html lang="cs">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cynické Hyeny</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>
      <body data-theme="dark">
        <Header activeLink={link} />

        <section className="hero"></section>

        <main className="main-content">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
