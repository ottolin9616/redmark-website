# Redmark maintenance contract

## Product scope

- The root route `/` is the only production page.
- Do not reintroduce `/homepage-bento`, legacy homepages, comparison routes, or prototype routes.
- Do not solve homepage experiments by copying the page into a new route. Edit the production implementation directly.

## Visual contract

- Preserve the approved Bento homepage unless the task explicitly requests a redesign.
- Preserve the mountain Hero, parallax depth, glass product frame, adaptive Navbar theme, continuous four-panel snow landscape, shared mask, report tabs, reveal transitions, and responsive behavior.
- The four Bento panels must remain windows over one continuous background image; do not give each panel an independent background.
- Keep reduced-motion support and keyboard-accessible report controls.

## Source ownership

- `app/page.tsx`: production route composition.
- `app/redmark-hero.tsx`: Navbar, Hero, parallax, and adaptive navigation behavior.
- `app/homepage-bento.tsx`: all content below the Hero and its client interactions.
- `app/globals.css`: production styles only. Avoid route-specific CSS for pages that do not exist.
- `public/`: keep only assets referenced by the production page or metadata.

## Required checks

Before handoff, run:

```bash
npm run lint
npm test
```

Also verify the root page at desktop and mobile widths, confirm all local images load, and confirm retired routes return 404.
