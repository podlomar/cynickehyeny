export const Header = () => {
  return (
    <header className="main-header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <a href="home.html">
              <span className="logo-text">Cynické Hyeny</span>
            </a>
          </div>
          <nav className="main-nav">
            <ul className="nav-list">
              <li><a href="/" className="nav-link">Domů</a></li>
              <li><a href="/articles" className="nav-link active">Články</a></li>
              <li><a href="/about" className="nav-link">O nás</a></li>
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
