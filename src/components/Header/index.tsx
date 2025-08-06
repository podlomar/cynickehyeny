import { NavLink } from "../NavLink";
import styles from "./styles.module.css";

interface Props {
  activeLink?: string;
}

export const Header = ({ activeLink }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <a href="/">
              <span className={styles.logoText}>Cynické Hyeny</span>
            </a>
          </div>
          <nav className={styles.mainNav}>
            <ul className={styles.navList}>
              <li><NavLink href="/" active={activeLink === '/'}>Domů</NavLink></li>
              <li><NavLink href="/articles" active={activeLink === '/articles'}>Články</NavLink></li>
              <li><NavLink href="/about" active={activeLink === '/about'}>O nás</NavLink></li>
            </ul>
          </nav>
          <div className={styles.headerActions}>
            <button className={styles.themeToggle} aria-label="Změnit téma" data-mode="dark">
              <div className={styles.themeToggleContent}>
                <span className={styles.themeToggleIcon}>🌙</span>
                <span className={styles.themeToggleText}>Tmavé</span>
              </div>
              <div className={styles.themeSystemIndicator}></div>
            </button>
            <button className={styles.mobileMenuToggle} aria-label="Toggle menu">
              <span className={styles.hamburger}></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
};
