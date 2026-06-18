# SETPOINT skin → MGNaik.github.io (Minimal Mistakes)

Drop-in reskin of your Jekyll site to the **SETPOINT** "Field Notes" identity —
warm cream paper, Space Grotesk / Inter / Space Mono, single signal-lime accent.
No layout changes: search, pagination, archives, read-time and author profile
all keep working, and your Markdown posts are untouched.

## What's in here (mirror these paths into your repo root)

```
_sass/minimal-mistakes/skins/_setpoint.scss   ← the skin (colors, fonts, syntax)
assets/css/main.scss                           ← selects the skin + loads webfonts
assets/fonts/Inter-Variable.ttf
assets/fonts/SpaceGrotesk-Variable.ttf
assets/fonts/SpaceMono-Regular.ttf
assets/fonts/SpaceMono-Bold.ttf
```

## Three steps to ship

1. **Copy the files** above into `MGNaik.github.io/` at the same paths.
2. **Edit `_config.yml`** — change the skin line:
   ```yaml
   minimal_mistakes_skin: "setpoint"   # was: dark
   ```
3. **Commit & push to `master`.** GitHub Pages rebuilds in ~1 min; live at
   https://MGNaik.github.io

## Notes

- `assets/css/main.scss` intentionally overrides the remote theme's own
  `main.scss` so the SETPOINT skin can be selected and the self-hosted fonts
  load. It re-imports the full theme, so nothing is lost.
- To preview locally: `bundle exec jekyll serve`.
- To revert: set `minimal_mistakes_skin` back to `dark` (or delete these files).
