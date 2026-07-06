# new-ds

Figma Code Connect design system — React components from Figma, powered by Tailwind CSS, documented in Storybook, and visually tested with Chromatic.

**Figma file**: [NEW-DS](https://www.figma.com/design/n7Rpd5Tt9M4jWB8K4L9LM4/NEW-DS)

## Components

| Component | Node | Variants |
|---|---|---|
| **Button** | `66:250` | 4 variants × 3 sizes × 4 states, icon support |
| **TextField** | `91:766` | 3 sizes × 3 interactions × 3 validations, icon support |

## Quick Start

```bash
npm install
npm run storybook
```

Storybook runs at [http://localhost:6006](http://localhost:6006).

## Scripts

| Command | Purpose |
|---|---|
| `npm run storybook` | Start Storybook dev server |
| `npm run storybook:build` | Static Storybook build |
| `npm run build` | TypeScript compilation (`tsc`) |
| `npm run chromatic` | Publish to Chromatic for visual testing |
| `npm run figma:publish` | Publish Code Connect links to Figma |

## Design Tokens

218 Figma variables across 4 collections (`design-system/figma-variables.json`):

| Collection | Count | Purpose |
|---|---|---|
| 01 Primitive Color | 69 | brand, neutral, red, amber, green, blue, base |
| 02 Primitive Dimension | 59 | space, size, radius, borderWidth, opacity |
| 03 Semantic Color | 61 | text, background, stroke (Light + Dark modes) |
| 04 Primitive Typography | 29 | fontFamily, fontSize, lineHeight, letterSpacing |

## Light / Dark Mode

Semantic colors use CSS custom properties that switch via `data-theme` attribute:

- `:root` — Light mode (default)
- `[data-theme="dark"]` — Dark mode

Toggle themes in Storybook using the sun/moon icon in the toolbar.

## CI

Visual regression tests run on every push via [Chromatic GitHub Actions](https://www.chromatic.com/docs/github-actions). Workflow: `.github/workflows/chromatic.yml`.

## Tech Stack

- React 19, TypeScript (strict)
- Tailwind CSS v3 with PostCSS
- Storybook 8.6 (webpack5)
- Material Design Icons (`react-icons/md`)
- Figma Code Connect (`@figma/code-connect`)
- Chromatic v18 (visual testing)
