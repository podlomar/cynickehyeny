import React, { useState, ChangeEvent } from 'react';
import { useCookies } from 'react-cookie';
import clsx from 'clsx';
import Toggle from 'react-toggle';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../lib/theme';
import styles from './styles.module.scss';
import "react-toggle/style.css";
import Link from 'next/link';

interface Props {
  activeNav: 'home' | 'about';
  children: React.ReactNode;
};

export const PageLayout = ({ activeNav, children }: Props): JSX.Element => {
  const { colorScheme, changeColorScheme } = useTheme();
  
  const handleColorSchemeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    changeColorScheme(e.target.checked ? 'dark' : 'light');
  };

  return (
    <div className={clsx('page', colorScheme )}>
      <header className={clsx(styles.header, 'container')}>
        <Link href="/" className={styles.brand}>
          <img className={styles.brandIcon} src="/icon.svg" />
          <span className={styles.brandName}>Cynické Hyeny</span>
        </Link>

        <nav className={styles.navigation}>
          <Link className={clsx(activeNav === 'home' ? styles.activeNav : null)} href="/">Články</Link>
          <Link className={clsx(activeNav === 'about' ? styles.activeNav : null)}href="/o-nas">O nás</Link>
        </nav>

        <Toggle
          checked={colorScheme === 'dark'}
          onChange={handleColorSchemeChange}
          icons={{
            checked: <FaSun />,
            unchecked: <FaMoon />,
          }}
        />
      </header>
      <main className={clsx(styles.main, 'container')}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className="container">
          <p className={styles.copyright}>
            © 2023 cynickehyeny.cz, všechna práva vyhrazena
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;