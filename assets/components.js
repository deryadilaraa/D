/* @ds-bundle: {"format":4,"namespace":"DeryaDilaraDesignSystem_f49e04","components":[{"name":"TextLink","sourcePath":"components/actions/TextLink.jsx"},{"name":"Wordmark","sourcePath":"components/brand/Wordmark.jsx"},{"name":"CVList","sourcePath":"components/content/CVList.jsx"},{"name":"GalleryTile","sourcePath":"components/content/GalleryTile.jsx"},{"name":"ProjectRow","sourcePath":"components/content/ProjectRow.jsx"},{"name":"SectionHead","sourcePath":"components/content/SectionHead.jsx"},{"name":"Menu","sourcePath":"components/navigation/Menu.jsx"},{"name":"Eyebrow","sourcePath":"components/text/Eyebrow.jsx"},{"name":"Note","sourcePath":"components/text/Note.jsx"}],"sourceHashes":{"components/actions/TextLink.jsx":"04127b97b224","components/brand/Wordmark.jsx":"7381083778f1","components/content/CVList.jsx":"85ab676ee657","components/content/GalleryTile.jsx":"b927e8a83167","components/content/ProjectRow.jsx":"c6aa0fb01f49","components/content/SectionHead.jsx":"c5730e5b3d85","components/navigation/Menu.jsx":"67a8e6764009","components/text/Eyebrow.jsx":"cacb7db19ea1","components/text/Note.jsx":"e5bf9dadd7f7","ui_kits/portfolio/Portfolio.jsx":"240e14cd3b5f"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.DeryaDilaraDesignSystem_f49e04 = window.DeryaDilaraDesignSystem_f49e04 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/actions/TextLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const GLYPH = {
  "up-right": " ↗",
  "up": " ↑",
  "down": " ↓",
  true: " ↗"
};

/**
 * TextLink — the portfolio's only link style: inherits ink, no underline
 * at rest, underline (offset 4px) on hover. Optional directional arrow.
 */
function TextLink({
  children,
  href = "#",
  arrow,
  weight = 400,
  color = "var(--dda-ink)",
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      color,
      fontFamily: "var(--dda-font-sans)",
      fontWeight: weight,
      textDecoration: hover ? "underline" : "none",
      textUnderlineOffset: "4px",
      cursor: "pointer",
      ...style
    }
  }, rest), children, arrow ? GLYPH[arrow] || "" : "");
}
Object.assign(__ds_scope, { TextLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/actions/TextLink.jsx", error: String((e && e.message) || e) }); }

// components/brand/Wordmark.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Wordmark — the recurring "DERYA DILARA" text signature used in the header.
 * The stylised DILARA logo mark is a fixed image asset (assets/logo/), not type.
 */
function Wordmark({
  text = "DERYA DILARA",
  href,
  as = "span",
  size = 17,
  color = "var(--dda-ink)",
  style,
  ...rest
}) {
  const Tag = href ? "a" : as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    href: href,
    style: {
      fontFamily: "var(--dda-font-sans)",
      fontWeight: 700,
      fontSize: size,
      letterSpacing: "-0.7px",
      lineHeight: 1.2,
      color,
      textDecoration: "none",
      ...style
    }
  }, rest), text);
}
Object.assign(__ds_scope, { Wordmark });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Wordmark.jsx", error: String((e && e.message) || e) }); }

// components/content/CVList.jsx
try { (() => {
/** CVList — the "A little background" list: hairline-ruled rows, title + muted detail. */
function CVList({
  items = [],
  style
}) {
  return /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: "none",
      margin: 0,
      padding: 0,
      ...style
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      borderBottom: "1px solid var(--dda-rule-cv)",
      padding: i === 0 ? "0 0 18px" : "18px 0",
      display: "grid",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 16,
      fontWeight: 500,
      fontFamily: "var(--dda-font-sans)"
    }
  }, it.title), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: "var(--dda-muted)",
      fontFamily: "var(--dda-font-sans)"
    }
  }, it.detail))));
}
Object.assign(__ds_scope, { CVList });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/CVList.jsx", error: String((e && e.message) || e) }); }

// components/content/GalleryTile.jsx
try { (() => {
/**
 * GalleryTile — an image tile for the scattered opening gallery.
 * Caption fades in on hover/focus; image gains a touch of saturation.
 */
function GalleryTile({
  src,
  alt = "",
  title,
  meta = "View more ↗",
  href = "#",
  ratio,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onFocus: () => setHover(true),
    onBlur: () => setHover(false),
    style: {
      position: "relative",
      display: "block",
      minWidth: 0,
      height: "100%",
      aspectRatio: ratio,
      overflow: "hidden",
      ...style
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      filter: hover ? "saturate(1.08)" : "none",
      transition: "filter .2s"
    }
  }), title && /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      background: "var(--dda-caption-bg)",
      color: "#111",
      padding: "10px 8px",
      opacity: hover ? 1 : 0,
      transition: "opacity .2s",
      lineHeight: 1.15,
      fontSize: 12,
      fontFamily: "var(--dda-font-sans)"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      fontWeight: 700,
      marginBottom: 5
    }
  }, title), /*#__PURE__*/React.createElement("span", null, meta)));
}
Object.assign(__ds_scope, { GalleryTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/GalleryTile.jsx", error: String((e && e.message) || e) }); }

// components/content/ProjectRow.jsx
try { (() => {
/**
 * ProjectRow — a "Selected work" story: image on one side, copy on the other.
 * Alternate sides down the page with the `reverse` prop.
 */
function ProjectRow({
  id,
  kicker,
  title,
  children,
  src,
  alt = "",
  caption,
  reverse = false,
  style
}) {
  return /*#__PURE__*/React.createElement("article", {
    id: id,
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1.18fr",
      gap: "9%",
      padding: "80px 0",
      borderBottom: "1px solid var(--dda-rule-soft)",
      alignItems: "center",
      ...style
    }
  }, /*#__PURE__*/React.createElement("figure", {
    style: {
      margin: 0,
      order: reverse ? 2 : 0
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: "100%",
      aspectRatio: 1.14,
      objectFit: "cover",
      display: "block"
    }
  }), caption && /*#__PURE__*/React.createElement("figcaption", {
    style: {
      fontSize: 11,
      color: "var(--dda-muted)",
      marginTop: 10,
      fontFamily: "var(--dda-font-sans)"
    }
  }, caption)), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 440
    }
  }, kicker && /*#__PURE__*/React.createElement("p", {
    style: {
      textTransform: "uppercase",
      letterSpacing: "0.09em",
      fontSize: 11,
      fontWeight: 700,
      margin: 0,
      fontFamily: "var(--dda-font-sans)"
    }
  }, kicker), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "var(--dda-font-serif)",
      fontWeight: 400,
      fontSize: "clamp(33px,3.7vw,52px)",
      letterSpacing: "-0.025em",
      lineHeight: 1.03,
      margin: "18px 0 22px"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      fontFamily: "var(--dda-font-sans)"
    }
  }, children)));
}
Object.assign(__ds_scope, { ProjectRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/ProjectRow.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Menu.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Menu — the header disclosure nav. A "Menu +" toggle reveals a small
 * white popover of links; toggle shows "−" when open. Closes on link click.
 */
function Menu({
  items = [],
  label = "Menu",
  align = "right",
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(false);
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: "relative",
      minWidth: 84,
      textAlign: align,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("button", {
    onClick: () => setOpen(o => !o),
    style: {
      all: "unset",
      cursor: "pointer",
      fontFamily: "var(--dda-font-sans)",
      fontWeight: 700,
      fontSize: 17,
      color: "var(--dda-ink)"
    }
  }, label, open ? " −" : " +"), open && /*#__PURE__*/React.createElement("nav", {
    "aria-label": "Portfolio",
    style: {
      position: "absolute",
      [align]: 0,
      top: 40,
      width: 220,
      padding: 24,
      background: "#fff",
      boxShadow: "var(--dda-shadow-pop)",
      display: "grid",
      gap: 15,
      textAlign: "left",
      zIndex: 5
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: it.href || "#",
    onClick: () => setOpen(false),
    style: {
      color: "var(--dda-ink)",
      textDecoration: "none",
      fontFamily: "var(--dda-font-sans)",
      fontSize: 16
    }
  }, it.label))));
}
Object.assign(__ds_scope, { Menu });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Menu.jsx", error: String((e && e.message) || e) }); }

// components/text/Eyebrow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Eyebrow — the small uppercase editorial label above headings. */
function Eyebrow({
  children,
  as = "p",
  color = "var(--dda-ink)",
  style,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      textTransform: "uppercase",
      letterSpacing: "0.09em",
      fontSize: 11,
      fontWeight: 700,
      fontFamily: "var(--dda-font-sans)",
      margin: 0,
      color,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Eyebrow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/text/Eyebrow.jsx", error: String((e && e.message) || e) }); }

// components/content/SectionHead.jsx
try { (() => {
/** SectionHead — a serif H2 with an optional right-aligned note, underlined by a hairline rule. */
function SectionHead({
  title,
  note,
  id,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      justifyContent: "space-between",
      gap: 24,
      paddingBottom: 20,
      borderBottom: "1px solid var(--dda-rule-mid)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("h2", {
    id: id,
    style: {
      fontFamily: "var(--dda-font-serif)",
      fontWeight: 400,
      fontSize: "clamp(36px,4vw,56px)",
      letterSpacing: "-0.025em",
      lineHeight: 1.1,
      margin: 0
    }
  }, title), note && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--dda-muted)",
      fontSize: 12,
      lineHeight: 1.4,
      margin: 0,
      textAlign: "right",
      fontFamily: "var(--dda-font-sans)",
      flexShrink: 0
    }
  }, note));
}
Object.assign(__ds_scope, { SectionHead });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/content/SectionHead.jsx", error: String((e && e.message) || e) }); }

// components/text/Note.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Note — muted small print: draft notes, captions, meta lines. */
function Note({
  children,
  as = "p",
  size = 12,
  style,
  ...rest
}) {
  const Tag = as;
  return /*#__PURE__*/React.createElement(Tag, _extends({
    style: {
      color: "var(--dda-muted)",
      fontSize: size,
      lineHeight: 1.5,
      fontFamily: "var(--dda-font-sans)",
      margin: 0,
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Note });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/text/Note.jsx", error: String((e && e.message) || e) }); }

__ds_ns.TextLink = __ds_scope.TextLink;

__ds_ns.Wordmark = __ds_scope.Wordmark;

__ds_ns.CVList = __ds_scope.CVList;

__ds_ns.GalleryTile = __ds_scope.GalleryTile;

__ds_ns.ProjectRow = __ds_scope.ProjectRow;

__ds_ns.SectionHead = __ds_scope.SectionHead;

__ds_ns.Menu = __ds_scope.Menu;

__ds_ns.Eyebrow = __ds_scope.Eyebrow;

__ds_ns.Note = __ds_scope.Note;

})();
