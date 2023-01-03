import { useState, useMemo, useEffect } from 'react';
import Cookies from 'universal-cookie';
import Head from 'next/head';
import { ColorScheme, ThemeContext, ThemeContextType } from '../lib/theme';
import App, { AppContext, AppInitialProps, AppProps } from "next/app";
import '../styles.scss';

interface OwnProps {
  storedColorScheme: ColorScheme | null;
}

const cookies = new Cookies();

const MyApp = ({ Component, pageProps, storedColorScheme }: AppProps & OwnProps): JSX.Element => {
  const [colorScheme, setColorScheme] = useState<ColorScheme | null>(storedColorScheme);

  const changeColorScheme = (scheme: ColorScheme) => {
    cookies.set('colorScheme', scheme);
    setColorScheme(scheme);
  };

  useEffect(() => {
    if (storedColorScheme === null) {
      const browserColorScheme = window.matchMedia("(prefers-color-scheme:dark)").matches
        ? 'dark'
        : 'light';
      changeColorScheme(browserColorScheme);
    }
  }, [storedColorScheme]);

  const contextValue = useMemo((): ThemeContextType => ({ 
    colorScheme: colorScheme ?? 'light', changeColorScheme
  }), [colorScheme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      <Head>
        <title>Cynické hyeny</title>
      </Head>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
};

MyApp.getInitialProps = async (context: AppContext): Promise<AppInitialProps & OwnProps> => {
  const newContext = await App.getInitialProps(context);
  
  // @ts-ignore
  const colorScheme = context.ctx.req?.cookies?.colorScheme;
  const storedColorScheme = colorScheme === 'light' || colorScheme === 'dark'
    ? colorScheme as ColorScheme
    : null;

  return { ...newContext, storedColorScheme };
};

export default MyApp;