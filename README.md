# SETPOINT — custom Jekyll site for MGNaik.github.io

This replaces the Minimal Mistakes theme with **hand-built Jekyll layouts that
are the SETPOINT design**. You keep GitHub Pages, Jekyll, and your Markdown
posts — only the presentation layer changes. Search, tag/category archives,
read-time, pagination and the author profile are all included and self-contained
(no theme, no remote_theme).

## How to install (drop-in)

1. **Copy everything in this folder into your repo root**, overwriting when asked.
   It adds/*replaces*:
   ```
   _config.yml                      (REPLACES yours)
   _data/navigation.yml             (REPLACES — adds a "Tags" link)
   _layouts/  default, home, post, page
   _includes/ masthead, footer, author-profile, post-card
   index.html                       (REPLACES — now the SETPOINT home)
   posts.html  tags.html  categories.html  search.html  search.json  404.md
   assets/css/setpoint.css
   assets/js/search.js
   assets/fonts/*.ttf  (4)
   assets/images/Headshot.jpg       (your avatar — config points here)
   ```

2. **Delete these now-unused files from your repo** (they're Minimal Mistakes
   leftovers and will conflict):
   ```
   _sass/                           ← MM skin, no longer used
   assets/css/main.scss             ← replaced by assets/css/setpoint.css
   _includes/head/custom.html       ← behaviour folded into _layouts/default.html
   _pages/posts.md                  ← replaced by /posts.html (permalink clash otherwise)
   _pages/404.md                    ← replaced by /404.md
   ```
   (You can delete the whole `_pages/` folder if it now only holds those two.)

3. **Your `_posts/*.md` stay exactly as they are.** Front matter already has
   `title`, `date`, `categories`, `tags` — that's all these layouts need.
   `classes: wide` (in one post) is harmless and ignored.

4. **Commit & push to `master`.** GitHub Pages rebuilds in ~1 min →
   https://MGNaik.github.io

## What you get

| Page | URL | Notes |
|------|-----|-------|
| Home | `/` | Hero + recent-writing cards, paginated (6 per page) |
| All posts | `/posts/` | Full card listing |
| Tags | `/tags/` | Tag cloud + posts grouped per tag (anchored) |
| Categories | `/categories/` | Posts grouped per category |
| Search | `/search/` | Client-side search over title, tags & excerpt |
| Post | `/:categories/:title/` | Article card + tags + author rail |

## Notes & tweaks

- **Nav links** live in `_data/navigation.yml`. The search icon is added
  automatically in the masthead.
- **Hero copy** (the big headline + tagline) is in `_layouts/home.html`.
- **Read-time** is computed as `words ÷ 200 + 1` min — change the `200` in
  `_includes/post-card.html`, `_layouts/post.html` and `search.json` to taste.
- **Colors / type / spacing** are CSS variables at the top of
  `assets/css/setpoint.css` (the SETPOINT tokens). Edit there to retune.
- **Code highlighting** uses Rouge (set in `_config.yml`); the warm palette is
  in the `.highlight .*` rules near the bottom of the CSS.
- **Comments** were dropped, as requested.
- Preview locally with `bundle exec jekyll serve` (your existing `Gemfile`
  with the `github-pages` gem already supports everything here).

## To revert

Restore your previous `_config.yml`, `assets/css/main.scss`, `_sass/`,
`index.html`, and `_pages/`, and delete the files this package added.
