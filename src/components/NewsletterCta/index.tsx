export const NewsletterCta = () => {
  return (
    <section className="newsletter-cta">
      <div className="container">
        <div className="cta-content">
          <h2>Nezmeškej další cynické postřehy</h2>
          <p>Přihlásit se k odběru a dozvědět se, když napíšeme další článek o tom, proč není všechno tak růžové, jak se
            tváří.</p>
          <form className="newsletter-form-inline" action="#" method="post">
            <input type="email" placeholder="Tvůj email..." required className="email-input-inline" />
            <button type="submit" className="subscribe-btn-inline">Přihlásit se</button>
          </form>
          <p className="newsletter-note-inline">Žádný spam, pouze kvalitní obsah. Odhlásit se můžeš kdykoli.</p>
        </div>
      </div>
    </section>
  );
};
