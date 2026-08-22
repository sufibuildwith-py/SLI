# Supreme Leather Industries — Luxury Business Card

A local Vite + React + TypeScript business-card viewer.

## Card specification

- Physical dimensions: **85.60 × 53.98 mm**
- Aspect ratio: ID-1 / standard bank-card format
- Front + back
- 3D flip interaction
- Zoom controls
- Print stylesheet
- Black / silver luxury visual system
- Self-contained orbital + leather SVG background

## Run locally

Install Node.js LTS, then open this folder in a terminal:

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, normally:

http://localhost:5173

## Build for production

```bash
npm run build
npm run preview
```

## Editing the card

Main files:

- `src/components/BusinessCard.tsx` — card content and SVG emblem
- `src/index.css` — visual design and physical dimensions
- `src/App.tsx` — viewer, flip and zoom controls
- `src/assets/leather-orbit.svg` — subtle leather/orbital background

The card itself remains at its true 85.60 × 53.98 mm CSS dimensions. The viewer scales it only for comfortable on-screen viewing.

## Printing

The print stylesheet hides the viewer controls and prints the front at its physical ID-1 dimensions. For commercial printing, export a press-ready design from a professional layout tool after confirming bleed/safe-area requirements with the printer.
