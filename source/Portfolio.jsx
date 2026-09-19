const { Wordmark, Menu, Eyebrow, Note, TextLink, SectionHead, GalleryTile, ProjectRow, CVList } = window.DeryaDilaraDesignSystem_f49e04;
const lines = text => text.split('\n').map((line,i)=><React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>);
const safeLink = href => /^(https?:\/\/|mailto:|#[a-zA-Z0-9_-]+$)/.test(href) ? href : '#dda-contact';
function Portfolio({content}) {
 const {gallery:TILES,projects:PROJECTS,threads:THREADS,cv:CV,curated:CURATED}=content;
  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <div id="dda-portfolio">
      <header className="dda-header" id="dda-top">
        <a className="dda-brand" href="#dda-top" onClick={(e) => scrollTo(e, "#dda-top")}><Wordmark /></a>
        <Menu items={[
          { label: "Selected work", href: "#dda-work" },
          { label: "Curatorial", href: "#dda-curated" },
          { label: "About", href: "#dda-about" },
          { label: "CV", href: "#dda-cv" },
          { label: "Contact", href: "#dda-contact" },
        ]} />
      </header>

      <main>
        <section className="dda-opening" aria-label="Selected project gallery">
          <div className="dda-grid">
            {TILES.map((t, i) => (
              <GalleryTile key={i} src={t.img} title={t.title} href={safeLink(t.href)} alt={t.alt}
                style={{ gridArea: t.c }} />
            ))}
          </div>
          <div className="dda-gallery-foot">
            <TextLink href="#dda-work" arrow="up-right" weight={700} onClick={(e) => scrollTo(e, "#dda-work")}>Selected work</TextLink>
            <Note style={{ maxWidth: 340 }}>{content.openingNote}</Note>
          </div>
        </section>

        <section className="dda-about" id="dda-about">
          <Eyebrow>{content.aboutLabel}</Eyebrow>
          <div>
            <h1>{lines(content.aboutHeadline)}</h1>
            <div className="dda-threads">
              {THREADS.map(({title:t, detail:d}) => (
                <div key={t} className="dda-thread">
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dda-work" id="dda-work">
          <SectionHead title={content.workTitle} note={lines(content.workNote)} />
          {PROJECTS.map((p, i) => (
            <ProjectRow key={p.id} id={p.id} kicker={p.kicker} title={p.title}
              src={p.img} caption={p.caption} reverse={i % 2 === 1}>
              <p style={{ margin: "0 0 26px" }}>{p.body}</p>
              <div className="dda-points">
                {p.points.map(({title:t, detail:d}) => (
                  <div key={t} className="dda-point">
                    <strong>{t}</strong>
                    <Note size={14}>{d}</Note>
                  </div>
                ))}
              </div>
            </ProjectRow>
          ))}
        </section>

        <section className="dda-curated" id="dda-curated">
          <SectionHead title={content.curatedTitle} note={lines(content.curatedNote)} />
          <div className="dda-masonry">
            {CURATED.map(({img:src,alt}, i) => (
              <img key={i} className="dda-cur-img" src={src} alt={alt} loading="lazy" />
            ))}
          </div>
        </section>

        <section className="dda-cv" id="dda-cv">
          <h2>{content.cvTitle}</h2>
          <div>
            <CVList items={CV} />
          </div>
        </section>

        <section className="dda-contact" id="dda-contact">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="dda-contact-h">{lines(content.contactHeadline)}</h2>
          <p>{content.contactNote}</p>
          <div className="dda-contact-links">
            {content.links.map((link,i)=><TextLink key={i} href={safeLink(link.href)}>{link.label}</TextLink>)}
          </div>
          <footer className="dda-footer">
            <span>{content.copyright}</span>
            <TextLink href="#dda-top" arrow="up" onClick={(e) => scrollTo(e, "#dda-top")}>Back to top</TextLink>
            <span>{content.footerNote}</span>
          </footer>
        </section>
      </main>
    </div>
  );
}

window.Portfolio = Portfolio;
