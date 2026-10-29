# Accessibility (a11y) Guide

This document outlines the accessibility standards, architectural patterns, and guidelines implemented across the **BookMyShow Frontend** to guarantee an inclusive experience for all users.

---

## 1. Accessibility Commitment & Standards

The application is built to conform to the **Web Content Accessibility Guidelines (WCAG) 2.1 Level AA** standards. We design with an accessibility-first mindset, ensuring all features are usable by individuals relying on screen readers, keyboard-only navigation, screen magnifiers, and assistive technologies.

---

## 2. Semantic HTML & Landmark Architecture

We utilize native HTML5 semantic elements rather than generic `<div>` containers:

- **`<header>`**: Global navigation bar, search, and theme controls.
- **`<main>`**: Primary content region with responsive padding (`px-4 md:px-10`).
- **`<footer>`**: Secondary links, legal disclaimers, and social icons.
- **`<section>` & `<article>`**: Modular grouping for movie carousels, cinema schedules, and seat layouts.
- **Heading Hierarchy**: Enforced via standardized typography components ([`TypographyH1`](../src/components/Typography/TypographyH1.tsx), `TypographyH2`, `TypographyH3`, etc.), ensuring sequential heading levels without skipping ranks.

---

## 3. Radix UI Primitives & ARIA Patterns

The UI primitive library (`src/components/ui/`) is constructed on **Radix UI**, providing battle-tested accessibility behaviors out-of-the-box:

| Component                  | Assistive Behaviors Provided                                                                                                                |
| :------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------ |
| **Dialog / Modal**         | Traps keyboard focus within the dialog; dismisses on `Escape`; restores focus to trigger element upon closing; applies `aria-modal="true"`. |
| **Dropdown Menu**          | Supports Arrow key navigation (`Up`/`Down`), `Enter`/`Space` activation; manages `aria-expanded` and `aria-haspopup`.                       |
| **Popover**                | Positions relative to anchor; automatically announces contents to screen readers.                                                           |
| **Calendar / DatePicker**  | Grid navigation with Arrow keys; announces selected date and disabled dates.                                                                |
| **Multi-Select / Command** | Filterable combobox following ARIA 1.2 Combobox pattern (`role="combobox"`, `role="listbox"`, `role="option"`).                             |

---

## 4. Keyboard Navigation & Focus Management

All interactive controls are operable without a pointing device:

1. **Tab Navigation**: Logical tab sequence following visual layout flow.
2. **Visible Focus Rings**: All buttons, links, and inputs include visible, high-contrast focus rings using Tailwind utilities (`focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring`).
3. **Skip to Content**: Important content sections are directly accessible.
4. **Escape Key Handling**: All popovers, modal sheets, and dropdowns close immediately when `Escape` is pressed.

---

## 5. Color, Contrast & Theming

- **Contrast Ratios**: Body text achieves a minimum contrast ratio of **4.5:1** against the background; large headings and interactive borders achieve at least **3.0:1**.
- **Dark Mode Verification**: Semantic color tokens (`bg-background`, `text-foreground`, `text-muted-foreground`, `bg-destructive`) are calibrated in `src/index.css` to preserve contrast compliance in both light and dark themes.
- **No Color-Alone States**: System messages, badges, and validation errors pair color indicators with text or icons (e.g., error icons and descriptive error messages).

---

## 6. Form Accessibility

Forms managed by **React Hook Form** follow strict accessibility guidelines:

- **Associated Labels**: Every input field is explicitly associated with a `<FormLabel>` via `htmlFor` / `id`.
- **Error Announcement**: When a field fails validation:
    - The input is assigned `aria-invalid="true"`.
    - The error description in `<FormMessage>` is linked via `aria-describedby`.
    - Assistive devices immediately announce the validation failure when the field is focused.

---

## 7. Media & Imagery

All visual media elements are configured for screen readers:

- Decorative images or banners include empty alt attributes (`alt=""`) so screen readers ignore them.
- Informational images, cinema logos, and movie posters provide concise descriptive text in their `alt` attributes.
- Image components render accessible loading skeletons while raster images are fetching.

---

## 8. Automated Linting (`eslint-plugin-jsx-a11y`)

Accessibility rules are enforced in [`eslint.config.js`](../eslint.config.js) using the `eslint-plugin-jsx-a11y` recommended ruleset:

- Prevents non-interactive elements from receiving click handlers without keyboard listeners.
- Prohibits missing `alt` attributes on `<img>` elements.
- Validates ARIA attributes against valid roles and states.
- Ensures form elements have accessible labels.

Run accessibility checks locally:

```bash
npm run lint
```
