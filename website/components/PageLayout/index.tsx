import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import clsx from 'clsx';
import Link from 'next/link';
import isEmail from 'validator/lib/isEmail';
import Toggle from 'react-toggle';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useTheme } from '../../lib/theme';
import styles from './styles.module.scss';
import "react-toggle/style.css";
import { Router, useRouter } from 'next/router';

interface Props {
  activeNav?: 'home' | 'about';
  subscribe?: boolean,
  children: React.ReactNode;
};

interface Email {
  value: string;
  valid: boolean;
}

export const PageLayout = ({ activeNav, subscribe, children }: Props): JSX.Element => {
  const { colorScheme, changeColorScheme } = useTheme();
  const router = useRouter();
  const [ email, setEmail ] = useState<Email>({ value: '', valid: true });

  const handleColorSchemeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    changeColorScheme(e.target.checked ? 'dark' : 'light');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailValid = isEmail(email.value);

    if (!emailValid) {
      setEmail({ value: email.value, valid: false });
      return;
    }

    const result = await axios.post('/api/subscribe', { email: email.value });

    if (result.status === 200) {
      router.push(`/subscribed/${result.data.id}`);
    }
  }

  return (
    <div className={clsx('page', colorScheme )}>
      <header>
        <div className={clsx(styles.header, 'container')}>
          <Link href="/" className={styles.brand}>
            <img alt="Cynické hyenyclassName" className={styles.brandIcon} src="/icon.svg" />
            <span className={styles.brandName}>Cynické hyeny</span>
          </Link>

          <nav className={styles.navigation}>
            <Link className={clsx(activeNav === 'home' ? styles.activeNav : null)} href="/">Články</Link>
            <Link className={clsx(activeNav === 'about' ? styles.activeNav : null)}href="/o-nas">O nás</Link>
          </nav>

          <div className={styles.darkModeToggle}>
            <Toggle
              checked={colorScheme === 'dark'}
              onChange={handleColorSchemeChange}
              icons={{
                checked: <FaSun />,
                unchecked: <FaMoon />,
              }}
            />
          </div>
        </div>
      </header>
      <main className={clsx(styles.main, 'container')}>
        {children}
      </main>
      <footer className={styles.footer}>
        <div className="container">
          {(subscribe ?? true) && (
            <div className={styles.subscribe}>
              <div className={styles.subscribePrompt}>
                <h2>Hyení newsletter</h2>
                <p className={styles.subscribePrompt}>
                  Přihlašte se k odběru našeho newsletteru, ve kterém vás budeme nepravidelně obšťastňovat shrnutím nejzajímavějších článků na našem webu.
                </p>
              </div>
              <form 
                className={styles.subscribeForm}
                onSubmit={handleSubmit}
              >
                <label>
                  Váš e-mail:
                  <input
                    name="email"
                    type="email"
                    className={clsx(styles.emailInput, email.valid ? null : styles.invalidInput)}
                    value={email.value}
                    onChange={(e) => setEmail({ value: e.target.value, valid: true })}
                  />
                  {!email.valid && <div className={styles.invalidMsg}>Neplatná emailové adresa</div>}
                </label>
                <button type="submit">Odebírat</button>
              </form>
            </div>
          )}
          <p className={styles.copyright}>
            © 2023 cynickehyeny.cz, všechna práva vyhrazena
          </p>
        </div>
      </footer>
    </div>
  );
};

export default PageLayout;