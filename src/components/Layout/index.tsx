import { Header } from '../Header/index.js';

interface Props {
  children: any;
}

export const Layout = ({ children }: Props) => {
  return (
    <html lang="cs">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cynické Hyeny</title>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        <Header />
        <main className="main-content">
          {children}
        </main>
        <footer className="main-footer">
          <div className="container">
            <p>&copy; 2023 Cynické Hyeny. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
