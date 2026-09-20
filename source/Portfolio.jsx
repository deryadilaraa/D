const lines = text => String(text || '').split('\n').map((line, i) => <React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>);
const safeLink = href => /^(https?:\/\/|mailto:|#[a-zA-Z0-9_-]+$)/.test(href || '') ? href : '#dda-contact';

function Portfolio({content}) {
  const {gallery = [], projects = [], threads = [], cv = [], curated = [], links = []} = content;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [reduced, setReduced] = React.useState(false);
  const root = React.useRef(null);
  const menuButton = React.useRef(null);
  const heroImage = content.heroImage || curated.find(t => t.img && t.img.includes('0f8fa7'))?.img || curated[0]?.img;
  const galleryLink = item => {
    if (/^https?:\/\//.test(item.href || '')) return item.href;
    if (projects.some(p => '#' + p.id === item.href)) return item.href;
    const name = (item.title || '').toLowerCase();
    const handle = name.includes('mecmua') ? 'mecmua__' : name.includes('bondi') ? 'bondi.bish' : name.includes('bish') ? 'bishbuckler' : null;
    return (handle && links.find(l => l.href && l.href.includes('instagram.com/' + handle))?.href) || '#dda-curated';
  };
  React.useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  React.useEffect(() => {
    if (!('IntersectionObserver' in window) || reduced) return;
    const targets = root.current.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.remove('will-reveal'); observer.unobserve(entry.target); }
    }), {threshold: 0.08});
    targets.forEach(el => {el.classList.add('will-reveal'); observer.observe(el);});
    return () => { observer.disconnect(); targets.forEach(el => el.classList.remove('will-reveal')); };
  }, [reduced]);
  const nav = [['About', 'dda-about'], ['Selected work', 'dda-work'], ['Curatorial', 'dda-curated'], ['Background', 'dda-cv'], ['Contact', 'dda-contact']];
  const renderProject = (p, i) => <article className={'project project-' + i} id={p.id} key={p.id}>
    <figure className="project-image" data-reveal>
      {p.img && <img src={p.img} alt={p.caption || p.title} loading="lazy" />}
      {p.caption && <figcaption>{p.caption}</figcaption>}
    </figure>
    <div className="project-copy" data-reveal>
      <p className="eyebrow">{p.kicker}</p><h3>{p.title}</h3><p className="project-body">{p.body}</p>
      <dl className="project-points">{(p.points || []).map((point, n) => <div key={n}><dt>{point.title}</dt><dd>{point.detail}</dd></div>)}</dl>
    </div>
  </article>;
  return <div id="dda-portfolio" ref={root}>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="site-header" id="dda-top">
      <a className="brand" href="#dda-top">Derya Dilara<span>Document. Design. Act.</span></a>
      <div className="menu" onKeyDown={e => {if (e.key === 'Escape') {setMenuOpen(false); menuButton.current.focus();}}}>
        <button className="menu-toggle" ref={menuButton} aria-expanded={menuOpen} aria-controls="site-nav" onClick={() => setMenuOpen(!menuOpen)}>Menu <span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
        <nav id="site-nav" aria-label="Main navigation" hidden={!menuOpen}>{nav.map(([title, id]) => <a key={id} href={'#' + id} onClick={() => setMenuOpen(false)}>{title}<span aria-hidden="true">↗</span></a>)}</nav>
      </div>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        {heroImage && <img className="hero-image" src={heroImage} alt="" fetchpriority="high" />}
        <div className="hero-top"><span>Words, images & human things.</span><a href="#dda-work">Explore the work <span aria-hidden="true">↘</span></a></div>
        <h1 id="hero-title">{lines(content.heroTitle || 'DERYA\nDILARA')}</h1>
        <div className="hero-bottom"><p>{content.heroSubtitle || 'Digital storyteller · Curator · Creative communicator'}</p><p>{content.openingNote}</p></div>
        <span className="hero-caption">Visual reference / curated image</span>
      </section>

      <section className="about section-pad" id="dda-about">
        <div className="section-label"><span>01 / About</span><span>{content.aboutLabel}</span></div>
        <div className="about-main" data-reveal><h2>{lines(content.aboutHeadline)}</h2>{content.aboutIntro && <p className="about-intro">{content.aboutIntro}</p>}</div>
        <div className="threads">{threads.map((t, i) => <div key={i} data-reveal><span className="index">0{i + 1}</span><h3>{t.title}</h3><p>{t.detail}</p></div>)}</div>
      </section>

      <section className="work" id="dda-work">
        <div className="section-heading section-pad"><p className="eyebrow">02 / Selected work</p><h2 data-reveal>{content.workTitle}</h2><p className="work-note">{lines(content.workNote)}</p></div>
        {projects.slice(0, 2).map(renderProject)}
      </section>

      <section className="curated" id="dda-curated">
        <div className="curated-heading section-pad"><div className="section-label"><span>03 / Curatorial</span><span>DDA Globe</span></div><h2 data-reveal>{content.curatedTitle}</h2><div className="curated-caption"><p>{content.curatedNote}</p><button className="motion-button" onClick={() => setPaused(!paused)} aria-pressed={paused} disabled={reduced}>{reduced ? 'Motion reduced' : paused ? 'Play movement' : 'Pause movement'} <span aria-hidden="true">{paused || reduced ? '▷' : 'Ⅱ'}</span></button></div></div>
        <div className={'filmstrip' + (paused || reduced ? ' paused' : '')}>
          <div className="filmtrack">{[0, 1].map(copy => <div className="filmgroup" key={copy} aria-hidden={copy === 1 ? true : undefined}>{gallery.map((t, i) => <a className={'filmcard' + (!t.img ? ' text-card' : '')} href={galleryLink(t)} tabIndex={copy === 1 ? -1 : undefined} key={i}>{t.img ? <img src={t.img} alt={copy ? '' : t.alt || t.title} loading="lazy" /> : <span className="text-card-title">{t.title}</span>}<span className="film-label">{t.title}<span aria-hidden="true">↗</span></span></a>)}</div>)}</div>
        </div>
        <div className="archive section-pad"><p className="eyebrow">Visual references / Colour, craft & detail</p><div className="archive-grid">{curated.map((t, i) => <figure key={i} data-reveal><img src={t.img} alt={t.alt || ''} loading="lazy" /><figcaption>{String(i + 1).padStart(2, '0')}</figcaption></figure>)}</div></div>
      </section>

      {projects.length > 2 && <section className="dark-work" aria-label="Creative collaboration and art in public space"><div className="section-label section-pad"><span>04 / Collaboration & place</span><span>Identity · Craft · Connection</span></div>{projects.slice(2).map((p, i) => renderProject(p, i + 2))}</section>}

      <section className="background section-pad" id="dda-cv"><div><p className="eyebrow">05 / Background</p><h2 data-reveal>{content.cvTitle}</h2></div><dl>{cv.map((item, i) => <div key={i} data-reveal><dt>{item.title}</dt><dd>{item.detail}</dd></div>)}</dl></section>
      <section className="contact section-pad" id="dda-contact"><p className="eyebrow">06 / Contact</p><h2 data-reveal>{lines(content.contactHeadline)}</h2><div className="contact-details"><p>{content.contactNote}</p><div className="contact-links">{links.map((link, i) => <a key={i} href={safeLink(link.href)}>{link.label}<span aria-hidden="true">↗</span></a>)}</div></div><footer><span>{content.copyright}</span><span>{content.footerNote}</span><a href="#dda-top">Back to top ↑</a></footer></section>
    </main>
  </div>;
}
window.Portfolio = Portfolio;
