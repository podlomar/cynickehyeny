export const HeroSection = () => {
  return (
    <section className="home-hero">
      <div className="container">
        <div className="hero-content">
          <h1>Cynické Hyeny</h1>
          <p className="hero-subtitle">Nekompromisní pohled na svět technologií, designu a digitálního byznysu. Bez marketing
            bullshitu, s pořádnou dávkou reality.</p>
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">127</span>
              <span className="stat-label">Článků</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">8.5k</span>
              <span className="stat-label">Čtenářů</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">4</span>
              <span className="stat-label">Autorů</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
