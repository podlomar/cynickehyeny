export const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section newsletter-section">
            <h3>📬 Zůstaň v obraze</h3>
            <p>Přihlásit se k odběru článků a nezmeškej nejnovější obsah o designu, technologiích a dalších zajímavých
              tématech.</p>
            <form className="newsletter-form" action="#" method="post">
              <div className="form-group">
                <input type="email" placeholder="Tvůj email..." required className="email-input" />
                <button type="submit" className="subscribe-btn">Přihlásit se</button>
              </div>
            </form>
            <p className="newsletter-note">Žádný spam, pouze kvalitní obsah. Odhlásit se můžeš kdykoli.</p>
          </div>

          <div className="footer-section support-section">
            <h3>☕ Podpoř mou práci</h3>
            <p>Pokud se ti líbí obsah, který vytvářím, můžeš mi koupit kávu a pomoci tak s dalším tvořením.</p>
            <a href="https://www.buymeacoffee.com/cynickehyeny" target="_blank" rel="noopener" className="coffee-btn">
              <span className="coffee-icon">☕</span>
              Koupit mi kávu
            </a>
            <p className="support-note">Každá podpora je vážně oceněna! 🙏</p>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-links">
            <a href="/">Domů</a>
            <a href="/articles">Články</a>
            <a href="/authors">Autoři</a>
          </div>
          <p className="copyright">© 2025 Cynické Hyeny. Všechna práva vyhrazena.</p>
        </div>
      </div>
    </footer>
  );
};
