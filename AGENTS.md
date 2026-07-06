# Repository Guidelines

## Project Overview

`new-ds` is a Figma Code Connect design system project: React components implemented with Tailwind CSS, connected to the Figma file `NEW-DS`, documented in Storybook, validated against 218 Figma variables across 4 token collections, and visually tested via Chromatic.

**Figma file**: `n7Rpd5Tt9M4jWB8K4L9LM4` (NEW-DS)

## Project Structure

```
src/
  components/
    Button/               # Button: 4 variants x 3 sizes x 4 states + icon support
    TextField/             # TextField: 3 sizes x 3 interactions x 3 validations
    ThemeProvider/         # Light/dark theme React context
  index.css               # Tailwind directives + semantic CSS custom properties
  index.ts                # Barrel exports
.storybook/
  main.ts                 # Webpack config (webpack5, babel TS, PostCSS/Tailwind, figma mock)
  preview.ts              # Preview config + global theme toolbar
  figma-mock.ts           # Browser-safe mock for @figma/code-connect
.github/
  workflows/
    chromatic.yml         # CI: Chromatic visual tests on push
design-system/
  figma-variables.json    # Canonical token source (218 variables, 4 collections)
tailwind.config.js        # Tailwind v3: primitives, semantic CSS vars, dimensions, typography
figma.config.json         # Code Connect: React JSX label, watches **/*.figma.ts
postcss.config.js         # PostCSS with tailwindcss + autoprefixer
AGENTS.md                 # This file
README.md                 # Project README
```

## Key Commands

| Command | Purpose |
|---|---|
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run storybook:build` | Static Storybook build to `storybook-static/` |
| `npm run build-storybook` | Chromatic-compatible alias for `storybook build` |
| `npm run chromatic` | Publish to Chromatic for visual testing |
| `npm run build` | TypeScript compilation (`tsc`) |
| `npx tsc --noEmit` | Type check without emitting output |
| `npm run figma:publish` | Publish Code Connect links to Figma |

## Components

### Button (node 66:250)
- 4 variants: Primary, Secondary, Tertiary, Danger
- 3 sizes: Small (32px), Medium (40px), Large (48px)
- 4 states: Default, Hover, Pressed, Disabled
- Leading/trailing icons via `leadingIconName`/`trailingIconName` (Material Design Icons)

### TextField (node 91:766)
- 3 sizes: Small (32px), Medium (40px), Large (48px)
- 3 interactions: Default, Hover, Disabled
- 3 validations: None (helper text), Error (red + icon), Success (green + icon)
- Additional: readOnly, required, label, placeholder, supporting text
- Leading/trailing icons via `leadingIconName`/`trailingIconName`
- Real `<input>` element with `:focus-within` focus ring

### Shared Icon System
Both components use Material Design Icons via `react-icons/md`. Available icons:
`Add`, `Check`, `CheckCircle`, `Delete`, `Error`, `ErrorOutline`, `Favorite`, `Home`, `Info`, `Mail`, `Person`, `Search`, `Settings`, `Star`, `Visibility`, `VisibilityOff`

## Development Setup

- **Runtime**: Node.js, CommonJS modules (`"type": "commonjs"`)
- **React**: v19 with JSX automatic runtime
- **Tailwind**: v3 (NOT v4) with PostCSS, arbitrary values for pixel-perfect token alignment
- **Storybook**: v8.6 with `@storybook/react-webpack5`, babel-loader for TS/TSX
- **Chromatic**: v18 for visual regression testing
- **Webpack**: PostCSS injected manually in `webpackFinal` (not auto-detected by addon-styling-webpack)

## Design Tokens & Theming

All tokens originate from `design-system/figma-variables.json` (218 variables across 4 Figma collections):

| Collection | Count | Purpose |
|---|---|---|
| 01 Primitive Color | 69 | brand, neutral, red, amber, green, blue, base |
| 02 Primitive Dimension | 59 | space, size, radius, borderWidth, opacity |
| 03 Semantic Color | 61 | textColor, bgColor, strokeColor (Light/Dark modes) |
| 04 Primitive Typography | 29 | fontFamily, fontStyle, fontSize, lineHeight, letterSpacing |

In Tailwind, tokens are mapped as:
- **Primitive colors**: Direct values (`brand-500`, `neutral-100`, `red-700`)
- **Semantic colors**: CSS custom properties that resolve via `data-theme` attribute
  - `:root` = Light, `[data-theme="dark"]` = Dark
  - Use classes like `bg-semantic-bg-brand`, `text-semantic-text-default`
- **Dimensions**: Tailwind `spacing`, `borderRadius`, `borderWidth`, `width`, `height`
- **Typography**: Tailwind `fontSize`, `fontFamily`, `fontWeight`, `lineHeight`, `letterSpacing`

The Storybook toolbar includes a Theme toggle (sun/moon icon) for switching modes across all components.

## Coding Conventions

- TypeScript strict mode, `.tsx` for components
- Components use **semantic CSS variable classes**, never primitive color classes directly
- Pixel-perfect Figma values use Tailwind arbitrary values (`h-[32px]`, `rounded-[6px]`, `text-[14px]`)
- Components co-located with stories in `src/components/<Name>/`
- Barrel exports in `src/components/<Name>/index.ts` and re-exported via `src/index.ts`
- `@figma/code-connect` is mocked in Storybook via webpack alias → `figma-mock.ts`
- When adding a new component: create `Component.tsx`, `Component.stories.tsx`, `index.ts`, then update `src/index.ts`

## Storybook, Code Connect & Chromatic

- Each component story includes `parameters.design` with Figma node URL and prop mappings
- `figma.config.json` watches `**/*.figma.ts` for Code Connect publishing
- Theme switching is global via `globalTypes.theme` in `preview.ts`
- Chromatic publishes via `npx chromatic --project-token=<token>` using the `build-storybook` script

## CI (GitHub Actions)

Visual regression tests run on every push via `.github/workflows/chromatic.yml`:

- Triggers on `push` (excludes `dependabot/**`, `renovate/**`)
- Uses `chromaui/action@latest` with `exitZeroOnChanges: true`
- Requires `CHROMATIC_PROJECT_TOKEN` secret in repo Settings → Secrets → Actions
- Posts PR status checks for UI Tests on every pull request
