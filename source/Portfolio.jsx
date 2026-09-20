const { Wordmark, Menu, Eyebrow, Note, TextLink, SectionHead, GalleryTile, ProjectRow, CVList } = window.DeryaDilaraDesignSystem_f49e04;
const lines = text => text.split('\n').map((line,i)=><React.Fragment key={i}>{i > 0 && <br />}{line}</React.Fragment>);
const safeLink = href => /^(https?:\/\/|mailto:|#[a-zA-Z0-9_-]+$)/.test(href) ? href : '#dda-contact';
function WaterName() {
  const turbulence = React.useRef(null), displacement = React.useRef(null), frame = React.useRef(0), active = React.useRef(false), reduced = React.useRef(false);
  React.useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reduced.current = media.matches; if (media.matches) { active.current = false; cancelAnimationFrame(frame.current); frame.current = 0; displacement.current?.setAttribute('scale', '0'); } };
    update(); media.addEventListener('change', update);
    return () => {cancelAnimationFrame(frame.current); media.removeEventListener('change', update);};
  }, []);
  const enter = () => {
    if (reduced.current) return;
    active.current = true;
    if (frame.current) return;
    let strength = 0, start = performance.now();
    const animate = time => {
      strength += ((active.current ? 16 : 0) - strength) * .09;
      const t = (time - start) / 1000;
      turbulence.current?.setAttribute('baseFrequency', `${.006 + Math.sin(t * 1.2) * .002} ${.012 + Math.cos(t * 1.1) * .004}`);
      displacement.current?.setAttribute('scale', strength.toFixed(2));
      if (active.current || strength > .1) frame.current = requestAnimationFrame(animate);
      else { displacement.current?.setAttribute('scale', '0'); frame.current = 0; }
    };
    frame.current = requestAnimationFrame(animate);
  };
  return <div className="dda-name-opening">
    <svg className="dda-filter-defs" aria-hidden="true"><defs><filter id="dilara-water" x="-15%" y="-35%" width="130%" height="170%" colorInterpolationFilters="sRGB"><feTurbulence ref={turbulence} type="fractalNoise" baseFrequency=".011 .03" numOctaves="1" seed="5" result="water"/><feDisplacementMap ref={displacement} in="SourceGraphic" in2="water" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter></defs></svg>
    <a className="dda-water-name" href="#dda-about" aria-label="Dilara — about" onPointerEnter={enter} onPointerLeave={() => {active.current=false;}} onFocus={enter} onBlur={() => {active.current=false;}}>Dilara</a>
  </div>;
}
function DiagonalGallery({items}) {
  const [selected, setSelected] = React.useState(Math.min(3, items.length - 1));
  const touch = React.useRef(null);
  const go = next => setSelected(Math.max(0, Math.min(items.length - 1, next)));
  if (!items.length) return null;
  return <div className="dda-diagonal" role="region" aria-label="Curatorial image gallery" aria-roledescription="carousel">
    <div className="dda-diagonal-stage" onTouchStart={e => {touch.current=e.touches[0].clientX;}} onTouchEnd={e => {if(touch.current !== null){const delta=touch.current-e.changedTouches[0].clientX;if(Math.abs(delta)>35)go(selected+(delta>0?1:-1));touch.current=null;}}}>
      {items.map((item, i) => <button key={i} className={'dda-diagonal-card'+(i===selected?' is-current':'')} style={{'--offset':i-selected,zIndex:items.length-i}} onClick={() => go(i)} tabIndex={Math.abs(i-selected)>3?-1:0} aria-label={'View image '+(i+1)+': '+item.alt} aria-current={i===selected?'true':undefined} aria-hidden={Math.abs(i-selected)>4?true:undefined}><img src={item.img} alt="" loading="lazy" draggable="false"/></button>)}
    </div>
    <div className="dda-diagonal-controls"><p className="dda-diagonal-caption" aria-live="polite">{String(selected+1).padStart(2,'0')} / {String(items.length).padStart(2,'0')}<span>{items[selected].alt}</span></p><div><button onClick={() => go(selected-1)} disabled={selected===0} aria-label="Previous image">←</button><button onClick={() => go(selected+1)} disabled={selected===items.length-1} aria-label="Next image">→</button></div></div>
    <input className="dda-gallery-range" type="range" min="0" max={items.length-1} value={selected} onChange={e=>go(Number(e.target.value))} aria-label="Browse curatorial images" aria-valuetext={'Image '+(selected+1)+' of '+items.length}/>
  </div>;
}

function ProjectSpinner({projects}) {
  const dialog = React.useRef(null), trigger = React.useRef(null), stage = React.useRef(null);
  const [paused, setPaused] = React.useState(false), [visible, setVisible] = React.useState(false), [open, setOpen] = React.useState(false);
  const pictures = projects.filter(project => project.img);
  const cards = pictures.length ? Array.from({length: Math.max(8, pictures.length)}, (_, i) => pictures[i % pictures.length]) : [];
  React.useEffect(() => {
    if (!('IntersectionObserver' in window)) {setVisible(true); return;}
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {document.body.style.overflow = previous;};
  }, [open]);
  const show = () => {dialog.current.showModal(); setOpen(true);};
  const close = () => dialog.current.close();
  const visit = (event, project) => {
    event.preventDefault(); close();
    requestAnimationFrame(() => document.getElementById(project.id)?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}));
  };
  return <div className="dda-project-spinner" ref={stage}>
    <button ref={trigger} type="button" className="dda-spinner-open" onClick={show} aria-haspopup="dialog" aria-controls="dda-all-projects" aria-label="Open all projects">
      <span className="dda-spinner-scene" aria-hidden="true"><span className="dda-spinner-axis"><span className="dda-spinner-wheel" style={{animationPlayState:paused || !visible || open?'paused':'running'}}>
        {cards.map((project,i)=><span className="dda-spinner-card" key={i} style={{transform:`rotateX(${i * 360/cards.length}deg) translateY(-68px)`}}><img src={project.img} alt="" loading="lazy" draggable="false"/></span>)}
      </span></span></span>
      <span className="dda-spinner-label">All projects ({projects.length}) <span aria-hidden="true">↗</span></span>
    </button>
    {cards.length > 0 && <button type="button" className="dda-spinner-pause" aria-pressed={paused} onClick={()=>setPaused(!paused)}>{paused?'Resume rotation':'Pause rotation'}</button>}
    <dialog ref={dialog} id="dda-all-projects" className="dda-project-dialog" aria-labelledby="dda-all-projects-title" onClose={()=>{setOpen(false);trigger.current?.focus({preventScroll:true});}} onClick={event=>{if(event.target===dialog.current){const rect=dialog.current.getBoundingClientRect();if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)close();}}}>
      <div className="dda-dialog-heading"><h2 id="dda-all-projects-title">All projects</h2><button type="button" onClick={close} autoFocus aria-label="Close all projects">Close ×</button></div>
      <div className="dda-project-index">{projects.map(project=><a key={project.id} href={'#'+project.id} onClick={event=>visit(event,project)}>
        {project.img && <img src={project.img} alt={project.title} loading="lazy"/>}
        <p className="dda-index-kicker">{project.kicker}</p><h3>{project.title} <span aria-hidden="true">↗</span></h3>{project.caption && <p className="dda-index-caption">{project.caption}</p>}
      </a>)}</div>
    </dialog>
  </div>;
}

function Portfolio({content}) {
 const {gallery:TILES,projects:PROJECTS,threads:THREADS,cv:CV,curated:CURATED}=content;
  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
  };
  return (
    <div id="dda-portfolio">
      <header className="dda-header" id="dda-top">
        <a className="dda-brand" href="#dda-top" onClick={(e) => scrollTo(e, "#dda-top")}><Wordmark text="DILARA" /></a>
        <Menu items={[
          { label: "Selected work", href: "#dda-work" },
          { label: "Curatorial", href: "#dda-curated" },
          { label: "About", href: "#dda-about" },
          { label: "CV", href: "#dda-cv" },
          { label: "Contact", href: "#dda-contact" },
        ]} />
      </header>

      <main>
        <WaterName />
        <section className="dda-opening" aria-label="Selected project gallery">
          <div className="dda-grid">
            {TILES.filter(t => t.img).map((t, i) => (
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

        <section className="dda-blogs" id="dda-blogs">
          <SectionHead title="DDA Globe" note="Document Design Act" />
          <div className="dda-blog-panels">{TILES.slice(0,3).map((tile, i) => {
            const handle = i===0 ? 'mecmua__' : i===1 ? 'bishbuckler' : 'bondi.bish';
            const link = content.links.find(link => link.href.includes('instagram.com/'+handle));
            return <a className="dda-blog-panel" key={i} href={link ? safeLink(link.href) : '#dda-contact'}>
              <div className="dda-blog-art">{tile.img ? <img src={tile.img} alt={tile.alt || tile.title} loading="lazy"/> : <span>{tile.title}</span>}</div>
              <div className="dda-blog-label"><span>{tile.title}</span><span aria-hidden="true">↗</span></div>
            </a>;
          })}</div>
        </section>

        <section className="dda-work" id="dda-work">
          <div className="dda-work-intro"><SectionHead title={content.workTitle} note={lines(content.workNote)} /><ProjectSpinner projects={PROJECTS} /></div>
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
          <DiagonalGallery items={CURATED} />
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
