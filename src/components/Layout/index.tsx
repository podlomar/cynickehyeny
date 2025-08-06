import { Header } from '../Header';
import { Footer } from '../Footer';

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
        <link rel="stylesheet" href="/server.css" />
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
