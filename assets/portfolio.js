const {
  Wordmark,
  Menu,
  Eyebrow,
  Note,
  TextLink,
  SectionHead,
  GalleryTile,
  ProjectRow,
  CVList
} = window.DeryaDilaraDesignSystem_f49e04;
const lines = text => text.split('\n').map((line, i) => /*#__PURE__*/React.createElement(React.Fragment, {
  key: i
}, i > 0 && /*#__PURE__*/React.createElement("br", null), line));
const safeLink = href => /^(https?:\/\/|mailto:|#[a-zA-Z0-9_-]+$)/.test(href) ? href : '#dda-contact';
function WaterName() {
  const element = React.useRef(null),
    mapImage = React.useRef(null),
    displacement = React.useRef(null);
  const engine = React.useRef(null);
  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 128;
    canvas.height = 64;
    const context = canvas.getContext('2d');
    if (!context) return;
    const pixels = context.createImageData(canvas.width, canvas.height);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const state = {
      points: [],
      last: null,
      frame: 0,
      reduced: media.matches,
      time: 0
    };
    const reset = () => {
      cancelAnimationFrame(state.frame);
      state.frame = 0;
      state.points = [];
      state.last = null;
      displacement.current?.setAttribute('scale', '0');
    };
    const render = time => {
      const decay = Math.pow(.90, Math.min(3, (time - (state.time || time)) / 16.67));
      state.time = time;
      state.points.forEach(p => {
        p.dx *= decay;
        p.dy *= decay;
      });
      state.points = state.points.filter(p => Math.hypot(p.dx, p.dy) > .04);
      if (!state.points.length) {
        reset();
        return;
      }
      const rect = element.current.getBoundingClientRect();
      const radius = Math.min(55, rect.height * .48);
      for (let y = 0; y < 64; y++) for (let x = 0; x < 128; x++) {
        let dx = 0,
          dy = 0;
        for (const p of state.points) {
          const distance = ((x / 127 * rect.width - p.x) ** 2 + (y / 63 * rect.height - p.y) ** 2) / (radius * radius);
          if (distance > 5) continue;
          const weight = Math.exp(-distance * 2);
          dx += p.dx * weight;
          dy += p.dy * weight;
        }
        const i = (y * 128 + x) * 4;
        pixels.data[i] = Math.round(128 - Math.max(-22, Math.min(22, dx)) * 255 / 64);
        pixels.data[i + 1] = Math.round(128 - Math.max(-22, Math.min(22, dy)) * 255 / 64);
        pixels.data[i + 2] = 128;
        pixels.data[i + 3] = 255;
      }
      context.putImageData(pixels, 0, 0);
      mapImage.current?.setAttribute('href', canvas.toDataURL());
      displacement.current?.setAttribute('scale', '64');
      state.frame = requestAnimationFrame(render);
    };
    state.move = event => {
      if (state.reduced) return;
      const rect = element.current.getBoundingClientRect(),
        x = event.clientX - rect.left,
        y = event.clientY - rect.top;
      if (state.last) {
        const dx = Math.max(-14, Math.min(14, x - state.last.x)),
          dy = Math.max(-14, Math.min(14, y - state.last.y));
        if (Math.hypot(dx, dy) > .2) {
          state.points.push({
            x,
            y,
            dx: dx * .85,
            dy: dy * .85
          });
          if (state.points.length > 14) state.points.shift();
          if (!state.frame) {
            state.time = performance.now();
            state.frame = requestAnimationFrame(render);
          }
        }
      }
      state.last = {
        x,
        y
      };
    };
    engine.current = state;
    const update = () => {
      state.reduced = media.matches;
      if (state.reduced) reset();
    };
    media.addEventListener('change', update);
    return () => {
      reset();
      engine.current = null;
      media.removeEventListener('change', update);
    };
  }, []);
  const move = event => engine.current?.move(event);
  const leave = () => {
    if (engine.current) engine.current.last = null;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dda-name-opening"
  }, /*#__PURE__*/React.createElement("svg", {
    className: "dda-filter-defs",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("filter", {
    id: "folio-water",
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    colorInterpolationFilters: "sRGB"
  }, /*#__PURE__*/React.createElement("feImage", {
    ref: mapImage,
    x: "0",
    y: "0",
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
    result: "flow"
  }), /*#__PURE__*/React.createElement("feDisplacementMap", {
    ref: displacement,
    in: "SourceGraphic",
    in2: "flow",
    scale: "0",
    xChannelSelector: "R",
    yChannelSelector: "G"
  })))), /*#__PURE__*/React.createElement("h2", {
    className: "dda-water-name",
    ref: element,
    onPointerEnter: move,
    onPointerDown: move,
    onPointerMove: move,
    onPointerLeave: leave,
    onPointerUp: leave,
    onPointerCancel: leave
  }, "Folio"));
}
function DiagonalGallery({
  items
}) {
  const [selected, setSelected] = React.useState(Math.min(3, items.length - 1));
  const touch = React.useRef(null);
  const go = next => setSelected(Math.max(0, Math.min(items.length - 1, next)));
  if (!items.length) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: "dda-diagonal",
    role: "region",
    "aria-label": "Curatorial image gallery",
    "aria-roledescription": "carousel"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dda-diagonal-stage",
    onTouchStart: e => {
      touch.current = e.touches[0].clientX;
    },
    onTouchEnd: e => {
      if (touch.current !== null) {
        const delta = touch.current - e.changedTouches[0].clientX;
        if (Math.abs(delta) > 35) go(selected + (delta > 0 ? 1 : -1));
        touch.current = null;
      }
    }
  }, items.map((item, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    className: 'dda-diagonal-card' + (i === selected ? ' is-current' : ''),
    style: {
      '--offset': i - selected,
      zIndex: items.length - i
    },
    onClick: () => go(i),
    tabIndex: Math.abs(i - selected) > 3 ? -1 : 0,
    "aria-label": 'View image ' + (i + 1) + ': ' + item.alt,
    "aria-current": i === selected ? 'true' : undefined,
    "aria-hidden": Math.abs(i - selected) > 4 ? true : undefined
  }, /*#__PURE__*/React.createElement("img", {
    src: item.img,
    alt: "",
    loading: "lazy",
    draggable: "false"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "dda-diagonal-controls"
  }, /*#__PURE__*/React.createElement("p", {
    className: "dda-diagonal-caption",
    "aria-live": "polite"
  }, String(selected + 1).padStart(2, '0'), " / ", String(items.length).padStart(2, '0'), /*#__PURE__*/React.createElement("span", null, items[selected].alt)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => go(selected - 1),
    disabled: selected === 0,
    "aria-label": "Previous image"
  }, "\u2190"), /*#__PURE__*/React.createElement("button", {
    onClick: () => go(selected + 1),
    disabled: selected === items.length - 1,
    "aria-label": "Next image"
  }, "\u2192"))), /*#__PURE__*/React.createElement("input", {
    className: "dda-gallery-range",
    type: "range",
    min: "0",
    max: items.length - 1,
    value: selected,
    onChange: e => go(Number(e.target.value)),
    "aria-label": "Browse curatorial images",
    "aria-valuetext": 'Image ' + (selected + 1) + ' of ' + items.length
  }));
}
function ProjectSpinner({
  projects
}) {
  const dialog = React.useRef(null),
    trigger = React.useRef(null),
    stage = React.useRef(null);
  const [paused, setPaused] = React.useState(false),
    [visible, setVisible] = React.useState(false),
    [open, setOpen] = React.useState(false);
  const pictures = projects.filter(project => project.img);
  const cards = pictures.length ? Array.from({
    length: Math.max(8, pictures.length)
  }, (_, i) => pictures[i % pictures.length]) : [];
  React.useEffect(() => {
    if (!('IntersectionObserver' in window)) {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    if (stage.current) observer.observe(stage.current);
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  const show = () => {
    dialog.current.showModal();
    setOpen(true);
  };
  const close = () => dialog.current.close();
  const visit = (event, project) => {
    event.preventDefault();
    close();
    requestAnimationFrame(() => document.getElementById(project.id)?.scrollIntoView({
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    }));
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "dda-project-spinner",
    ref: stage
  }, /*#__PURE__*/React.createElement("button", {
    ref: trigger,
    type: "button",
    className: "dda-spinner-open",
    onClick: show,
    "aria-haspopup": "dialog",
    "aria-controls": "dda-all-projects",
    "aria-label": "Open all projects"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dda-spinner-scene",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dda-spinner-axis"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dda-spinner-wheel",
    style: {
      animationPlayState: paused || !visible || open ? 'paused' : 'running'
    }
  }, cards.map((project, i) => /*#__PURE__*/React.createElement("span", {
    className: "dda-spinner-card",
    key: i,
    style: {
      transform: `rotateX(${i * 360 / cards.length}deg) translateY(-68px)`
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: project.img,
    alt: "",
    loading: "lazy",
    draggable: "false"
  })))))), /*#__PURE__*/React.createElement("span", {
    className: "dda-spinner-label"
  }, "All projects (", projects.length, ") ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2197"))), cards.length > 0 && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dda-spinner-pause",
    "aria-pressed": paused,
    onClick: () => setPaused(!paused)
  }, paused ? 'Resume rotation' : 'Pause rotation'), /*#__PURE__*/React.createElement("dialog", {
    ref: dialog,
    id: "dda-all-projects",
    className: "dda-project-dialog",
    "aria-labelledby": "dda-all-projects-title",
    onClose: () => {
      setOpen(false);
      trigger.current?.focus({
        preventScroll: true
      });
    },
    onClick: event => {
      if (event.target === dialog.current) {
        const rect = dialog.current.getBoundingClientRect();
        if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "dda-dialog-heading"
  }, /*#__PURE__*/React.createElement("h2", {
    id: "dda-all-projects-title"
  }, "All projects"), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: close,
    autoFocus: true,
    "aria-label": "Close all projects"
  }, "Close \xD7")), /*#__PURE__*/React.createElement("div", {
    className: "dda-project-index"
  }, projects.map(project => /*#__PURE__*/React.createElement("a", {
    key: project.id,
    href: '#' + project.id,
    onClick: event => visit(event, project)
  }, project.img && /*#__PURE__*/React.createElement("img", {
    src: project.img,
    alt: project.title,
    loading: "lazy"
  }), /*#__PURE__*/React.createElement("p", {
    className: "dda-index-kicker"
  }, project.kicker), /*#__PURE__*/React.createElement("h3", null, project.title, " ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2197")), project.caption && /*#__PURE__*/React.createElement("p", {
    className: "dda-index-caption"
  }, project.caption))))));
}
function Services({
  links
}) {
  const email = links.find(link => link.href.startsWith('mailto:'))?.href;
  const packages = [{
    title: 'Career Story / Creative Portfolio',
    price: '650',
    featured: true,
    description: 'Your experience, beautifully told. A one-page creative portfolio that turns your CV into a clear, personal narrative.',
    items: ['Introductory call and up to 600 words of CV-to-web storytelling', 'Image selection, up to six sections and three featured projects', 'Mobile layout, contact links and a downloadable CV link']
  }, {
    title: 'Simple Landing Page',
    price: '350',
    description: 'A considered home for your work, service or next idea.',
    items: ['One scrolling page with up to four sections', 'Your supplied words and images, with light editing', 'Mobile layout and contact links']
  }, {
    title: 'Editorial & Visual Refresh',
    price: '250',
    description: 'A fresh eye on the words, images and flow of your existing one-page website.',
    items: ['Editing and refinement of existing copy', 'Selection and sequencing of your supplied images', 'Layout refinements within your existing website']
  }, {
    title: 'Digital Curation',
    price: '200',
    description: 'Bring your images together into a coherent visual story.',
    items: ['Selection of up to 15 client-supplied images', 'Suggested sequence and short captions', 'A curated selection for your website or digital publication']
  }];
  return /*#__PURE__*/React.createElement("section", {
    className: "dda-services",
    id: "dda-services",
    "aria-labelledby": "dda-services-title"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Creative & curatorial services"), /*#__PURE__*/React.createElement("h2", {
    id: "dda-services-title"
  }, "Your experience,", /*#__PURE__*/React.createElement("br", null), "beautifully told."), /*#__PURE__*/React.createElement("p", {
    className: "dda-services-intro"
  }, "Words, images and an editorial eye. Personal websites, career stories and digital curation, shaped around what makes your work yours."), /*#__PURE__*/React.createElement("div", {
    className: "dda-service-grid"
  }, packages.map(service => /*#__PURE__*/React.createElement("article", {
    key: service.title,
    className: 'dda-service-card' + (service.featured ? ' dda-service-featured' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "dda-service-top"
  }, /*#__PURE__*/React.createElement("h3", null, service.title), /*#__PURE__*/React.createElement("p", {
    className: "dda-service-price"
  }, "$", service.price, /*#__PURE__*/React.createElement("span", null, "AUD \xB7 one-off"))), service.featured && /*#__PURE__*/React.createElement("p", {
    className: "dda-service-offer"
  }, "Introductory offer: $495 AUD for the first three clients."), /*#__PURE__*/React.createElement("p", null, service.description), /*#__PURE__*/React.createElement("ul", null, service.items.map(item => /*#__PURE__*/React.createElement("li", {
    key: item
  }, item))), /*#__PURE__*/React.createElement("a", {
    className: "dda-service-enquiry",
    href: email ? email.split('?')[0] + '?subject=' + encodeURIComponent('Enquiry: ' + service.title) : '#dda-contact'
  }, "Enquire about ", service.featured ? 'a Career Story' : service.title.toLowerCase(), " ", /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "\u2197"))))), /*#__PURE__*/React.createElement("div", {
    className: "dda-service-details"
  }, /*#__PURE__*/React.createElement("p", null, "Each package includes one consolidated revision round. Website builds use an established layout personalised through typography, colour, imagery and storytelling. You supply your CV or project information and images."), /*#__PURE__*/React.createElement("p", null, "Domain, hosting and paid template costs are separate, with accounts in your name. Additional writing, custom animation, branding and extra pages are quoted separately. A 50% deposit books the project; the balance is due before launch or final delivery.")));
}
function Portfolio({
  content
}) {
  const {
    gallery: TILES,
    projects: PROJECTS,
    threads: THREADS,
    cv: CV,
    curated: CURATED
  } = content;
  const scrollTo = (e, href) => {
    e.preventDefault();
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start"
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "dda-portfolio"
  }, /*#__PURE__*/React.createElement("header", {
    className: "dda-header",
    id: "dda-top"
  }, /*#__PURE__*/React.createElement("a", {
    className: "dda-brand",
    href: "#dda-top",
    onClick: e => scrollTo(e, "#dda-top")
  }, /*#__PURE__*/React.createElement(Wordmark, {
    text: "DILARA"
  })), /*#__PURE__*/React.createElement(Menu, {
    items: [{
      label: "Selected work",
      href: "#dda-work"
    }, {
      label: "Curatorial",
      href: "#dda-curated"
    }, {
      label: "About",
      href: "#dda-about"
    }, {
      label: "Services",
      href: "#dda-services"
    }, {
      label: "CV",
      href: "#dda-cv"
    }, {
      label: "Contact",
      href: "#dda-contact"
    }]
  })), /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(WaterName, null), /*#__PURE__*/React.createElement("section", {
    className: "dda-opening",
    "aria-label": "Selected project gallery"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dda-grid"
  }, TILES.filter(t => t.img).map((t, i) => /*#__PURE__*/React.createElement(GalleryTile, {
    key: i,
    src: t.img,
    title: t.title,
    href: safeLink(t.href),
    alt: t.alt,
    style: {
      gridArea: t.c
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "dda-gallery-foot"
  }, /*#__PURE__*/React.createElement(TextLink, {
    href: "#dda-work",
    arrow: "up-right",
    weight: 700,
    onClick: e => scrollTo(e, "#dda-work")
  }, "Selected work"), /*#__PURE__*/React.createElement(Note, {
    style: {
      maxWidth: 340
    }
  }, content.openingNote))), /*#__PURE__*/React.createElement("section", {
    className: "dda-about",
    id: "dda-about"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, content.aboutLabel), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, lines(content.aboutHeadline)), /*#__PURE__*/React.createElement("div", {
    className: "dda-threads"
  }, THREADS.map(({
    title: t,
    detail: d
  }) => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: "dda-thread"
  }, /*#__PURE__*/React.createElement("h3", null, t), /*#__PURE__*/React.createElement("p", null, d)))))), /*#__PURE__*/React.createElement("section", {
    className: "dda-blogs",
    id: "dda-blogs"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    title: "DDA Globe",
    note: "Document Design Act"
  }), /*#__PURE__*/React.createElement("div", {
    className: "dda-blog-panels"
  }, TILES.slice(0, 3).map((tile, i) => {
    const handle = i === 0 ? 'mecmua__' : i === 1 ? 'bishbuckler' : 'bondi.bish';
    const link = content.links.find(link => link.href.includes('instagram.com/' + handle));
    return /*#__PURE__*/React.createElement("a", {
      className: "dda-blog-panel",
      key: i,
      href: link ? safeLink(link.href) : '#dda-contact'
    }, /*#__PURE__*/React.createElement("div", {
      className: "dda-blog-art"
    }, tile.img ? /*#__PURE__*/React.createElement("img", {
      src: tile.img,
      alt: tile.alt || tile.title,
      loading: "lazy"
    }) : /*#__PURE__*/React.createElement("span", null, tile.title)), /*#__PURE__*/React.createElement("div", {
      className: "dda-blog-label"
    }, /*#__PURE__*/React.createElement("span", null, tile.title), /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true"
    }, "\u2197")));
  }))), /*#__PURE__*/React.createElement("section", {
    className: "dda-work",
    id: "dda-work"
  }, /*#__PURE__*/React.createElement("div", {
    className: "dda-work-intro"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    title: content.workTitle,
    note: lines(content.workNote)
  }), /*#__PURE__*/React.createElement(ProjectSpinner, {
    projects: PROJECTS
  })), PROJECTS.map((p, i) => /*#__PURE__*/React.createElement(ProjectRow, {
    key: p.id,
    id: p.id,
    kicker: p.kicker,
    title: p.title,
    src: p.img,
    caption: p.caption,
    reverse: i % 2 === 1
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 26px"
    }
  }, p.body), /*#__PURE__*/React.createElement("div", {
    className: "dda-points"
  }, p.points.map(({
    title: t,
    detail: d
  }) => /*#__PURE__*/React.createElement("div", {
    key: t,
    className: "dda-point"
  }, /*#__PURE__*/React.createElement("strong", null, t), /*#__PURE__*/React.createElement(Note, {
    size: 14
  }, d))))))), /*#__PURE__*/React.createElement("section", {
    className: "dda-curated",
    id: "dda-curated"
  }, /*#__PURE__*/React.createElement(SectionHead, {
    title: content.curatedTitle,
    note: lines(content.curatedNote)
  }), /*#__PURE__*/React.createElement(DiagonalGallery, {
    items: CURATED
  })), /*#__PURE__*/React.createElement("section", {
    className: "dda-cv",
    id: "dda-cv"
  }, /*#__PURE__*/React.createElement("h2", null, content.cvTitle), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CVList, {
    items: CV
  }))), /*#__PURE__*/React.createElement(Services, {
    links: content.links
  }), /*#__PURE__*/React.createElement("section", {
    className: "dda-contact",
    id: "dda-contact"
  }, /*#__PURE__*/React.createElement(Eyebrow, null, "Contact"), /*#__PURE__*/React.createElement("h2", {
    className: "dda-contact-h"
  }, lines(content.contactHeadline)), /*#__PURE__*/React.createElement("p", null, content.contactNote), /*#__PURE__*/React.createElement("div", {
    className: "dda-contact-links"
  }, content.links.map((link, i) => /*#__PURE__*/React.createElement(TextLink, {
    key: i,
    href: safeLink(link.href)
  }, link.label))), /*#__PURE__*/React.createElement("footer", {
    className: "dda-footer"
  }, /*#__PURE__*/React.createElement("span", null, content.copyright), /*#__PURE__*/React.createElement(TextLink, {
    href: "#dda-top",
    arrow: "up",
    onClick: e => scrollTo(e, "#dda-top")
  }, "Back to top"), /*#__PURE__*/React.createElement("span", null, content.footerNote)))));
}
window.Portfolio = Portfolio;