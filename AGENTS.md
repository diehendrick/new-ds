# Repository Guidelines

## Project Overview

`new-ds` is a Figma Code Connect design system project built with React, TypeScript, semantic CSS Modules, and CSS custom properties. It is connected to the Figma file `NEW-DS`, documented in Storybook, validated against 218 Figma variables across 4 token collections, and visually tested via Chromatic.

Tailwind CSS remains installed for existing infrastructure and legacy compatibility, but new components must not use Tailwind utility classes directly in JSX, TSX, or component stylesheets.

**Figma file**: `n7Rpd5Tt9M4jWB8K4L9LM4` (`NEW-DS`)

---

## Project Structure

```text
src/
  components/
    Button/
      Button.tsx
      Button.module.css
      Button.stories.tsx
      Button.figma.ts
      index.ts
    TextField/
      TextField.tsx
      TextField.module.css
      TextField.stories.tsx
      TextField.figma.ts
      index.ts
    ThemeProvider/
      ThemeProvider.tsx
      index.ts
  index.css               # Global reset, theme declarations, and semantic CSS custom properties
  index.ts                # Barrel exports
.storybook/
  main.ts                 # Webpack config: webpack5, Babel TS, PostCSS, and Figma mock
  preview.ts              # Preview config and global theme toolbar
  figma-mock.ts           # Browser-safe mock for @Figma/code-connect
.github/
  workflows/
    chromatic.yml         # CI: Chromatic visual tests on push
design-system/
  figma-variables.json    # Canonical token source: 218 variables across 4 collections
tailwind.config.js        # Legacy Tailwind v3 token mappings and compatibility configuration
figma.config.json         # Code Connect config; watches **/*.figma.ts
postcss.config.js         # PostCSS with Tailwind CSS and Autoprefixer
AGENTS.md                 # This file
README.md                 # Project README
```

---

## Key Commands

| Command | Purpose |
|---|---|
| `npm run storybook` | Start Storybook dev server on port 6006 |
| `npm run storybook:build` | Build static Storybook to `storybook-static/` |
| `npm run build-storybook` | Chromatic-compatible alias for Storybook build |
| `npm run chromatic` | Publish to Chromatic for visual testing |
| `npm run build` | Run TypeScript compilation |
| `npx tsc --noEmit` | Type-check without emitting output |
| `npm run figma:publish` | Publish Code Connect links to Figma |

---

## Components

### Button

**Figma node**: `66:250`

- 4 variants: Primary, Secondary, Tertiary, Danger
- 3 sizes: Small (32px), Medium (40px), Large (48px)
- 4 states: Default, Hover, Pressed, Disabled
- Leading and trailing icons via `leadingIconName` and `trailingIconName`
- Uses Material Design Icons

### TextField

**Figma node**: `91:766`

- 3 sizes: Small (32px), Medium (40px), Large (48px)
- 3 interactions: Default, Hover, Disabled
- 3 validations: None, Error, Success
- Supports read-only, required, label, placeholder, and supporting text
- Leading and trailing icons via `leadingIconName` and `trailingIconName`
- Uses a real `<input>` element
- Uses `:focus-within` for focus styling

### Shared Icon System

Both components use Material Design Icons via `react-icons/md`.

Available icons:

```text
Add
Check
CheckCircle
Delete
Error
ErrorOutline
Favorite
Home
Info
Mail
Person
Search
Settings
Star
Visibility
VisibilityOff
```

---

## Development Setup

- **Runtime**: Node.js
- **Module system**: CommonJS (`"type": "commonjs"`)
- **React**: v19 with JSX automatic runtime
- **TypeScript**: strict mode
- **Primary styling**: CSS Modules with semantic custom class names
- **Design tokens**: CSS custom properties generated or mapped from Figma variables
- **Tailwind CSS**: v3 remains installed for legacy compatibility and as a fallback source for configured design values
- **Storybook**: v8.6 with `@storybook/react-webpack5`
- **Chromatic**: v18 for visual regression testing
- **Webpack**: PostCSS is injected manually in `webpackFinal`
- **Code Connect**: `@Figma/code-connect` with Storybook-safe mock

Tailwind utility classes must not be used when creating new components or when adding new styles to existing components.

When a required value does not exist in the design-token CSS custom properties, values already defined in `tailwind.config.js` may be used inside a component CSS Module through Tailwind's `theme()` function. This fallback does not allow utility classes in JSX, `@apply`, or Tailwind arbitrary-value class syntax.

---

## Design Tokens and Theming

All tokens originate from `design-system/figma-variables.json`.

| Collection | Count | Purpose |
|---|---:|---|
| 01 Primitive Color | 69 | Brand, neutral, red, amber, green, blue, and base colors |
| 02 Primitive Dimension | 59 | Spacing, size, radius, border width, and opacity |
| 03 Semantic Color | 61 | Text, background, and stroke colors for Light and Dark modes |
| 04 Primitive Typography | 29 | Font family, weight, size, line height, and letter spacing |

Tokens must be exposed as CSS custom properties and consumed inside component CSS Modules.

Example:

```css
:root {
  --color-text-default: var(--neutral-900);
  --color-background-brand: var(--brand-500);
  --space-component-md: 12px;
  --radius-component-md: 6px;
}

[data-theme="dark"] {
  --color-text-default: var(--neutral-50);
}
```

Components must consume semantic tokens:

```css
.button {
  color: var(--color-text-on-brand);
  background-color: var(--color-background-brand);
  border-radius: var(--radius-component-md);
}
```

Preferred:

```css
color: var(--color-text-default);
```

Avoid:

```css
color: var(--neutral-900);
color: #171717;
```

Primitive tokens may be used only when no suitable semantic token exists.

The Storybook toolbar includes a global Theme control for switching between Light and Dark modes.

---

## Styling Architecture — Mandatory

All new components and meaningful component refactors must use semantic custom CSS classes through CSS Modules.

### Required File Structure

Every component must have its own stylesheet.

```text
src/components/ComponentName/
  ComponentName.tsx
  ComponentName.module.css
  ComponentName.stories.tsx
  ComponentName.figma.ts
  index.ts
```

### Required Styling Pattern

Import the CSS Module inside the component:

```tsx
import styles from "./ComponentName.module.css";
```

Use short semantic class references in JSX:

```tsx
<div className={styles.container}>
  <label className={styles.label}>Label</label>
  <input className={styles.input} />
</div>
```

Move all static visual styling into the CSS Module:

```css
.container {
  display: flex;
  flex-direction: column;
  gap: var(--space-component-sm);
}

.label {
  color: var(--color-text-default);
  font: var(--typography-label-medium);
}

.input {
  min-width: 0;
  color: var(--color-text-default);
  background-color: transparent;
  border: var(--border-width-default) solid var(--color-border-default);
  border-radius: var(--radius-component-md);
}
```

### Prohibited Styling Patterns

Do not use Tailwind utility classes or atomic classes directly in JSX or TSX.

Avoid:

```tsx
<input
  className="
    flex-1
    min-w-0
    border-none
    bg-transparent
    px-3
    text-sm
    font-normal
  "
/>
```

Do not build arrays of utility classes:

```tsx
className={[
  "flex-1 min-w-0 bg-transparent",
  inputTextStyles[size],
  isDisabled
    ? "text-semantic-text-disabled"
    : "text-semantic-text-default",
].join(" ")}
```

Do not use Tailwind utilities through `@apply`:

```css
.input {
  @apply flex-1 min-w-0 bg-transparent border-none;
}
```

Do not use inline styles for static visual properties:

```tsx
<input
  style={{
    minWidth: 0,
    backgroundColor: "transparent",
    border: "none",
  }}
/>
```

Inline styles are allowed only when a value is calculated dynamically at runtime and cannot be represented reasonably through CSS classes or CSS custom properties.

Allowed example:

```tsx
<div style={{ width: `${progress}%` }} />
```

### Custom Class Naming

Class names must describe the element role or component meaning.

Preferred:

```css
.root {}
.container {}
.label {}
.input {}
.supportingText {}
.leadingIcon {}
.trailingIcon {}
.errorMessage {}
```

Avoid visual or implementation-based names:

```css
.flexRow {}
.redText {}
.padding16 {}
.marginTop8 {}
.roundedBox {}
```

Use camelCase names inside CSS Modules.

### Component States

Use semantic state classes:

```css
.input {}
.inputDisabled {}
.inputReadOnly {}
.inputError {}
.inputSuccess {}
.inputFocused {}
```

Apply state classes conditionally:

```tsx
import clsx from "clsx";
import styles from "./TextField.module.css";

<input
  className={clsx(styles.input, {
    [styles.inputDisabled]: disabled,
    [styles.inputReadOnly]: readOnly,
    [styles.inputError]: validation === "error",
    [styles.inputSuccess]: validation === "success",
  })}
/>
```

Prefer native pseudo-classes when possible:

```css
.input:hover {}

.input:focus-visible {}

.input:disabled {}

.field:focus-within {}
```

Use state classes only when the state cannot be handled clearly through native selectors or when the state belongs to a parent container.

### Component Variants and Sizes

Use semantic modifier classes instead of utility class maps.

```css
.button {}

.buttonPrimary {}

.buttonSecondary {}

.buttonTertiary {}

.buttonDanger {}

.buttonSmall {}

.buttonMedium {}

.buttonLarge {}
```

Use explicit typed maps in TypeScript:

```tsx
const variantClasses = {
  primary: styles.buttonPrimary,
  secondary: styles.buttonSecondary,
  tertiary: styles.buttonTertiary,
  danger: styles.buttonDanger,
} as const;

const sizeClasses = {
  small: styles.buttonSmall,
  medium: styles.buttonMedium,
  large: styles.buttonLarge,
} as const;
```

Apply them with `clsx`:

```tsx
<button
  className={clsx(
    styles.button,
    variantClasses[variant],
    sizeClasses[size],
  )}
>
  {children}
</button>
```

Explicit maps are preferred over dynamic string access because they are easier to read and safer in TypeScript.

### Token and Value Usage

Use the following value priority for every component:

1. Semantic design-token CSS custom property
2. Primitive design-token CSS custom property
3. Existing configured Tailwind theme value through `theme()`
4. A hardcoded component-specific value as the final fallback

This priority applies to:

- Colors
- Spacing
- Dimensions
- Typography
- Border width
- Border radius
- Shadows
- Opacity
- Motion duration
- Motion easing

#### First choice: semantic design token

```css
.button {
  min-height: var(--size-control-medium);
  padding-inline: var(--space-component-md);
  border-radius: var(--radius-component-md);
  color: var(--color-text-on-brand);
  background-color: var(--color-background-brand);
}
```

#### Second choice: primitive design token

Use a primitive token only when no suitable semantic token exists.

```css
.decorativeElement {
  color: var(--brand-500);
}
```

Do not use a primitive token when a semantic token already represents the same purpose.

#### Third choice: configured Tailwind value

When the required value does not exist in `design-system/figma-variables.json` or the generated CSS custom properties, use an existing value from `tailwind.config.js` inside the CSS Module.

```css
.card {
  gap: theme("spacing.3");
  padding: theme("spacing.4");
  border-radius: theme("borderRadius.md");
  box-shadow: theme("boxShadow.sm");
}
```

Tailwind values are allowed only as value fallbacks inside custom CSS classes.

Allowed:

```css
.container {
  max-width: theme("maxWidth.5xl");
}
```

Not allowed:

```tsx
<div className="max-w-5xl p-4 gap-3 rounded-md shadow-sm" />
```

Not allowed:

```css
.container {
  @apply max-w-5xl p-4 gap-3 rounded-md shadow-sm;
}
```

Not allowed:

```tsx
<div className="w-[742px] rounded-[6px]" />
```

Using `theme()` does not change the required styling architecture. JSX must continue to use semantic CSS Module class names.

```tsx
<div className={styles.container} />
```

#### Final fallback: hardcoded value

A hardcoded value is allowed only when all of these conditions are true:

1. No suitable semantic design token exists.
2. No suitable primitive design token exists.
3. No suitable configured Tailwind theme value exists.
4. The value is specific to the component or required for accurate Figma alignment.
5. The reason is clear from the code or a short comment.

```css
.popoverArrow {
  /* Figma-specific geometry; no matching design or Tailwind token exists. */
  width: 7px;
  height: 7px;
}
```

Before adding a Tailwind fallback or hardcoded value, check:

1. `design-system/figma-variables.json`
2. Generated CSS custom properties
3. `tailwind.config.js`

When the same fallback value is used repeatedly across multiple components, promote it into the design-token system instead of continuing to duplicate it.

### Existing Components

When modifying an existing component that still uses Tailwind utility classes:

1. Do not add more utility classes.
2. Move the affected styling into `ComponentName.module.css`.
3. Convert related utility classes when the change is reasonably scoped.
4. Avoid unrelated large migrations unless specifically requested.
5. Preserve the public component API.
6. Preserve the current visual output unless the Figma source requires a change.
7. Keep Storybook and Code Connect working after migration.

### Styling Validation

Before considering a component complete, confirm that:

1. JSX uses semantic CSS Module references.
2. JSX does not contain long utility class strings.
3. Static visual styling is located in the component CSS Module.
4. Existing design tokens are used where available.
5. Light and Dark themes are supported.
6. Hover, focus, pressed, disabled, validation, and read-only states are implemented when relevant.
7. Storybook stories cover important variants and states.
8. TypeScript compilation succeeds.
9. The visual output matches the related Figma component.
10. No Tailwind utility class or `@apply` was introduced.

---

## Coding Conventions

- Use TypeScript strict mode.
- Use `.tsx` for React components.
- Use CSS Modules for all component styling.
- Each component must have a co-located `ComponentName.module.css` file.
- Use semantic custom class names such as `root`, `label`, `input`, and `supportingText`.
- Do not use Tailwind utility classes or atomic classes in JSX or TSX.
- Do not use Tailwind `@apply` inside component stylesheets.
- Do not use long `className` strings.
- Do not use inline styles for static visual properties.
- Inline styles are allowed only for runtime-calculated values.
- Use `clsx` for conditional states, variants, and sizes.
- Use values in this order: semantic token, primitive token, configured Tailwind `theme()` value, then hardcoded fallback.
- Tailwind `theme()` values may be used only inside CSS Modules when the design-token system has no suitable value.
- Never hardcode a color when an appropriate semantic, primitive, or configured Tailwind value exists.
- Prefer native CSS pseudo-classes such as `:hover`, `:active`, `:focus-visible`, `:focus-within`, and `:disabled`.
- Keep components co-located with styles, stories, Code Connect files, and barrel exports.
- Add barrel exports in `src/components/<Name>/index.ts`.
- Re-export public components through `src/index.ts`.
- Keep component prop types explicit and exported when they are part of the public API.
- Preserve accessibility semantics and keyboard behavior.
- Use real native elements when available, such as `<button>`, `<input>`, and `<label>`.
- Do not remove Storybook, Chromatic, or Code Connect integration when refactoring styles.
- `@Figma/code-connect` is mocked in Storybook through the webpack alias to `figma-mock.ts`.

---

## New Component Workflow

When adding a new component:

1. Inspect the related Figma component and its variants.
2. Identify the correct Figma node.
3. Check `design-system/figma-variables.json` for available tokens.
4. Create:
   - `ComponentName.tsx`
   - `ComponentName.module.css`
   - `ComponentName.stories.tsx`
   - `ComponentName.figma.ts`
   - `index.ts`
5. Use semantic CSS Module classes.
6. Do not use utility classes, atomic classes, Tailwind arbitrary values, or `@apply`.
7. Implement variants, sizes, and states with typed props and semantic modifier classes.
8. Use CSS custom properties for design tokens.
9. Add Storybook coverage for important variants and states.
10. Add the Figma node URL and prop mappings.
11. Update `src/index.ts`.
12. Run:

```bash
npx tsc --noEmit
npm run storybook:build
```

13. Confirm visual alignment with Figma before finishing.
14. Confirm both Light and Dark themes.
15. Confirm keyboard focus and disabled behavior where relevant.

---

## Storybook, Code Connect, and Chromatic

- Each component story must include `parameters.design` with the related Figma node URL.
- Story controls must represent the component props accurately.
- Important variants, sizes, states, icon combinations, and validation states must have story coverage.
- `figma.config.json` watches `**/*.figma.ts` for Code Connect publishing.
- Theme switching is global through `globalTypes.theme` in `.storybook/preview.ts`.
- Code Connect files must map Figma properties to React props.
- Chromatic publishes through:

```bash
npx chromatic --project-token=<token>
```

- Use the `build-storybook` script for Chromatic-compatible Storybook builds.
- Do not accept unintended visual changes without review.

---

## CI

Visual regression tests run through `.github/workflows/chromatic.yml`.

- Triggered on every push
- Excludes `dependabot/**`
- Excludes `renovate/**`
- Uses `chromaui/action@latest`
- Uses `exitZeroOnChanges: true`
- Requires `CHROMATIC_PROJECT_TOKEN`
- Posts UI test status checks on pull requests

Before opening or completing a pull request, run:

```bash
npx tsc --noEmit
npm run storybook:build
```

---

## Definition of Done

A component task is complete only when:

- The component API is typed.
- Semantic CSS Modules are used.
- No Tailwind utility or atomic classes were added.
- No Tailwind `@apply` was added.
- Static visual styling is not written inline.
- Existing design tokens are used where available.
- Tailwind `theme()` values are used only when no suitable design token exists.
- Hardcoded values are used only when neither design tokens nor configured Tailwind values are suitable.
- Light and Dark themes work.
- Accessibility behavior is correct.
- Storybook stories cover important states.
- Code Connect mapping exists when the Figma component is available.
- TypeScript passes.
- Storybook builds successfully.
- Visual output matches Figma.
- Chromatic does not show unintended regressions.
