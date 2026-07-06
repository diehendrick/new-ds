# Repository Guidelines

## Project Overview

`new-ds` is a Figma Code Connect design system project: React components implemented with Tailwind CSS, connected to the Figma file `NEW-DS`, documented in Storybook, and validated against 218 Figma variables across 4 token collections.

## Project Structure

```
src/
  components/
    Button/               # Button component + stories
    ThemeProvider/         # Light/dark theme context
  index.css               # Tailwind directives + semantic CSS variables
  index.ts                # Barrel exports
.storybook/
  main.ts                 # Storybook webpack config + PostCSS/Tailwind integration
  preview.ts              # Storybook preview + theme toolbar
  figma-mock.ts           # Browser-safe mock for @figma/code-connect
design-system/
  figma-variables.json    # Canonical token source (218 variables, 4 collections)
tailwind.config.js        # Tailwind v3 config with all design tokens
figma.config.json         # Code Connect config (React JSX label)
```

## Key Commands

| Command | Purpose |
|---|---|
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run storybook:build` | Static Storybook build to `storybook-static/` |
| `npm run build` | TypeScript compilation (`tsc`) |
| `npm run figma:publish` | Publish Code Connect links to Figma |
| `npx tsc --noEmit` | Type check without emitting output |

## Development Setup

- **Runtime**: Node.js, CommonJS modules (`"type": "commonjs"`)
- **React**: v19 with JSX automatic runtime
- **Tailwind**: v3 (NOT v4) with PostCSS, arbitrary values for pixel-perfect token alignment
- **Storybook**: v8.6 with `@storybook/react-webpack5`, babel-loader for TS/TSX
- **Icons**: Material Design Icons via `react-icons/md`

## Design Tokens & Theming

All tokens originate from `design-system/figma-variables.json` and are mapped to:

- **Primitive colors**: Direct Tailwind color values (`brand`, `neutral`, `red`, `amber`, `green`, `blue`, `base`)
- **Semantic colors**: CSS custom properties that resolve at runtime via `data-theme` attribute
  - `:root` = Light mode, `[data-theme="dark"]` = Dark mode
  - Use classes like `bg-semantic-bg-brand`, `text-semantic-text-default`
- **Dimensions**: Mapped to Tailwind `spacing`, `borderRadius`, `borderWidth`, `width`, `height`
- **Typography**: Mapped to Tailwind `fontSize`, `fontFamily`, `fontWeight`, `lineHeight`, `letterSpacing`

The Storybook toolbar includes a Theme toggle (sun/moon icon) for switching between Light and Dark mode across all components.

## Coding Conventions

- TypeScript strict mode, with `.tsx` files for components
- Use semantic CSS variable classes in components, not primitive color classes
- Pixel values from Figma tokens use Tailwind arbitrary values (`h-[32px]`, `rounded-[6px]`)
- Component files are co-located with their Storybook stories in `src/components/<Name>/`
- Re-export components via `src/index.ts` barrel
- `@figma/code-connect` import is mocked in Storybook via webpack alias (`figma-mock.ts`)

## Storybook & Code Connect

- Each component has `.stories.tsx` with `parameters.design` block containing the Figma node URL and prop mappings
- `figma.config.json` watches `**/*.figma.ts` for Code Connect publishing (template-based approach)
- Theme switching is handled globally via `globalTypes.theme` in `preview.ts`, no per-story setup required
