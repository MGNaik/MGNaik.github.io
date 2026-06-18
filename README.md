# SETPOINT skin → MGNaik.github.io (Minimal Mistakes)

Drop-in reskin of your Jekyll site to the **SETPOINT** "Field Notes" identity —
warm cream paper, Space Grotesk / Inter / Space Mono, single signal-lime accent.
No layout changes: search, pagination, archives, read-time and author profile
all keep working, and your Markdown posts are untouched.

> **v2 — single-file skin.** The skin variables now live *inside*
> `assets/css/main.scss` instead of a separate `_sass` partial. This removes the
> remote-theme import that was breaking the GitHub Pages build.

## What's in here (mirror these paths into your repo root)

```
assets/css/main.scss                  ← skin variables + theme + webfonts (all-in-one)
assets/fonts/Inter-Variable.ttf
assets/fonts/SpaceGrotesk-Variable.ttf
assets/fonts/SpaceMono-Regular.ttf
assets/fonts/SpaceMono-Bold.ttf
```

## Steps to ship

1. **Copy `assets/css/main.scss`** into your repo at `assets/css/main.scss`
   (overwrite the previous one if you added it).
2. **Copy the four fonts** into `assets/fonts/`.
3. **If you added a `_sass/minimal-mistakes/skins/_setpoint.scss` earlier, delete it** —
   it's no longer used.
4. **`_config.yml`:** the `minimal_mistakes_skin` line no longer matters (this
   file applies the skin itself), so you can leave it, set it to `"default"`, or
   remove it — any of those is fine.
5. **Commit & push to `master`.** Pages rebuilds in ~1 min → https://MGNaik.github.io

## Why the first build failed

The earlier version used a separate skin partial that Jekyll had to resolve
through the remote theme's Sass load path. When that `@import` can't be found,
the whole SCSS compile (and the build) fails. This version inlines everything
into `main.scss`, so there's nothing external to resolve.

## Notes

- Preview locally with `bundle exec jekyll serve`.
- To revert: restore the original `assets/css/main.scss` (or delete it so the
  theme's own is used again) and remove the fonts.
