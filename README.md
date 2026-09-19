# Derya Dilara — portfolio

GitHub Pages source, prepared from the supplied portfolio HTML, Carrd prototype and 20 unique uploaded images.

The page preserves the portfolio structure and copy, uses local images and fonts, and fixes the gallery layout on small screens. Project images are labelled as visual references. Existing draft education and recognition notes remain as supplied.

Publish from the `main` branch and repository root in Settings → Pages. No build step is needed.

`index.html` is the entry page; `assets/` holds its dependencies. `source/Portfolio.jsx` is the editable portfolio component. The supplied font licences are included in `assets/`.

## Visual content editor

Open https://mecmuamistikmuze.github.io/D/admin/ and sign in to Pages CMS with GitHub. Install the Pages CMS GitHub app for only this repository. Select main and Portfolio — save to publish. Content is stored in content/portfolio.json; saving publishes after the normal GitHub Pages deployment. The editor supports image uploads, projects, gallery ordering, bio, CV, headings and contact links. Layout changes remain in source/Portfolio.jsx and the inline CSS. Recompile JSX using Babel’s React preset after code edits. No rebuild is required for content changes.
