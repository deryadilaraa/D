# Derya Dilara — portfolio

GitHub Pages source, prepared from the supplied portfolio HTML, Carrd prototype and 20 unique uploaded images.

The page preserves the portfolio structure and copy, uses local images and fonts, and fixes the gallery layout on small screens. Project images are labelled as visual references. Existing draft education and recognition notes remain as supplied.

Publish from the `main` branch and repository root in Settings → Pages. No build step is needed.

`index.html` is the entry page; `assets/` holds its dependencies. `source/Portfolio.jsx` is the editable portfolio component. The supplied font licences are included in `assets/`.

## Visual content editor

Open https://mecmuamistikmuze.github.io/D/admin/ and sign in to Pages CMS with GitHub. Install the Pages CMS GitHub app for only this repository. Select main and Portfolio — save to publish. Content is stored in content/portfolio.json; saving publishes after the normal GitHub Pages deployment. The editor supports image uploads, projects, gallery ordering, bio, CV, headings and contact links. Layout changes are in source/Portfolio.jsx and assets/portfolio.css. Run npm run build after JSX edits. No rebuild is required for content changes.

## Creative portfolio design

The page moves through a red photographic opening, a quieter editorial About section,
white project stories, turquoise curation, dark collaboration and art sections,
and a structured background section. Shared typography, margins and motion connect them.
The template references informed the composition; no Framer template code is required.

The current content and editor fields are retained. The editor also supports the opening
title, subtitle, background image and About introduction. Missing gallery images appear
as text tiles. Project and moodboard imagery remains labelled as curated reference imagery.

Styles are in `assets/portfolio.css`. To change the React layout:

```sh
npm ci
npm run build
```

Commit both `source/Portfolio.jsx` and the generated `assets/portfolio.js`. GitHub Pages
serves the checked-in output and does not need a build step. Text and image changes in
`content/portfolio.json` still publish without compilation.

The moving image strip includes a pause control, pauses on hover or keyboard focus,
and becomes a manually scrollable collection with reduced motion enabled. Other motion
also follows the operating system's reduced-motion setting.
