import { NavLink } from "../NavLink/index.js";

interface Props {
  activeLink?: string;
}

export const Header = ({ activeLink }: Props) => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="/">
              <span className="logo-text">Cynické Hyeny</span>
            </a>
          </div>
          <nav className="main-nav">
            <ul className="nav-list">
              <li><NavLink href="/" active={activeLink === '/'}>Domů</NavLink></li>
              <li><NavLink href="/articles" active={activeLink === '/articles'}>Články</NavLink></li>
              <li><NavLink href="/about" active={activeLink === '/about'}>O nás</NavLink></li>
            </ul>
          </nav>
          <div className="header-actions">
            <button className="theme-toggle" aria-label="Změnit téma" data-mode="dark">
              <div className="theme-toggle-content">
                <span className="theme-toggle-icon">🌙</span>
                <span className="theme-toggle-text">Tmavé</span>
              </div>
              <div className="theme-system-indicator"></div>
            </button>
            <button className="mobile-menu-toggle" aria-label="Toggle menu">
              <span className="hamburger"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
};
