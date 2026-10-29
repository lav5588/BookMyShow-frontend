# Project Structure

This document details the file and folder layout of the **BookMyShow Frontend** repository, explaining the role of each directory, architectural conventions, and organization rules.

---

## Directory Overview

```text
BookMyShow-frontend/
├── .github/                  # GitHub CI workflows and pull request templates
│   ├── workflows/
│   │   └── ci.yaml           # Automated lint, prettier, type check, and build pipeline
│   └── pull_request_template.md
├── .husky/                   # Git lifecycle hooks
│   └── pre-commit            # Pre-commit hook executing lint-staged
├── docs/                     # Project documentation suite
├── public/                   # Public static assets served unbundled
│   └── app-preview/          # Screenshots showcasing application views
├── src/                      # Application source code
│   ├── assets/               # Fonts, SVG illustrations, and raster images
│   ├── components/           # Reusable presentational components and UI primitives
│   ├── constants/            # Global constants (API routes, app routes, date formats)
│   ├── containers/           # Business logic, stateful feature containers, and forms
│   ├── features/             # Redux slices and domain state reducers
│   ├── layouts/              # Structural layout templates (RootLayout)
│   ├── lib/                  # Shared utilities (classnames merger, formatting)
│   ├── pages/                # Route targets exported for React Router
│   ├── router/               # React Router configuration and route tree
│   ├── schemas/              # Zod validation schemas for forms and mutations
│   ├── services/             # RTK Query service definitions, endpoints, and API types
│   ├── store/                # Redux store setup and typed hooks
│   ├── index.css             # Tailwind CSS 4 directives and theme variables
│   └── index.tsx             # React application bootstrap entrypoint
├── .env.example              # Template for environment configuration
├── .gitignore                # Git ignore patterns
├── .nvmrc                    # Target Node.js version specification (v22.19.0)
├── .prettierignore           # Files excluded from Prettier formatting
├── components.json           # shadcn/ui configuration metadata
├── eslint.config.js          # ESLint 9 flat configuration
├── index.html                # Vite HTML entry template
├── lint-staged.config.js     # Staged files formatting rules
├── package.json              # Project dependencies, scripts, and package metadata
├── prettier.config.js        # Code formatting rules
├── tsconfig.app.json         # TypeScript configuration for application code
├── tsconfig.json             # Root TypeScript project reference
├── tsconfig.node.json        # TypeScript configuration for build tool files
└── vite.config.ts            # Vite 7 build, dev server, and optimization config
```

---

## Source Directory (`src/`) Breakdown

### `src/assets/`

Contains bundled media assets referenced across the application:

- **`fonts/`**: Custom web fonts (e.g., `Inter-VariableFontwght.ttf`) loaded via `@font-face` in `index.css`.
- **`illustrations/`**: Vector SVG graphics used in state fallbacks (e.g., `error-fallback.svg`, `not-found.svg`).
- **`images/`**: High-resolution UI banners, branding images, and mock assets (e.g., `hero.png`, `about-us.png`, `contact-us.png`, `login.webp`).

---

### `src/components/`

Presentational, reusable, and design-system components:

- **`Theme/`**: Theme provider (`ThemeProvider.tsx`), context (`ThemeProvider.context.tsx`), theme switcher toggle (`ModeToggle.tsx`), and the `useTheme` hook.
- **`Image/`**: High-performance image wrapper handling fallback states, aspect ratios, responsive height mappings, and loading skeletons.
- **`Typography/`**: Standardized typographic components (`TypographyH1`, `TypographyH2`, `TypographyP`, `TypographyLead`, etc.) enforcing consistent hierarchy.
- **`ui/`**: Low-level atomic primitives based on **Radix UI** and **shadcn/ui**:
    - `alert.tsx`, `avatar.tsx`, `badge.tsx`, `button.tsx`
    - `calendar.tsx`, `card.tsx`, `carousel.tsx`, `command.tsx`
    - `dropdown-menu.tsx`, `form.tsx`, `input.tsx`, `label.tsx`
    - `multi-select.tsx`, `navigation-menu.tsx`, `popover.tsx`, `skeleton.tsx`, `sonner.tsx`

---

### `src/constants/`

Single-source-of-truth constants to eliminate hardcoded strings:

- **`api.constants.ts`**: Backend REST endpoints grouped by resource (`USERS`, `MOVIES`, `CINEMAS`, `BOOKINGS`, `CONTACT_US`), along with polling constants such as `SLOT_DETAILS_POLLING_INTERVAL_TIME`.
- **`routes.constants.ts`**: Client-side URL paths mapped to constants (`ROUTES.HOME`, `ROUTES.MOVIES`, `ROUTES.BOOKING`, etc.).
- **`formats.constants.ts`**: Date and time formatting strings for `date-fns` (e.g., `DATE_FORMAT_ISO`, `DATE_FORMAT_CUSTOM`, `TIME_FORMAT`).

---

### `src/containers/`

Contains all business logic, container components, and screen-level assemblies. Each container coordinates queries, user input, form submissions, and passes clean props down to components:

- **`Home/`**: Hero carousel, latest movies carousel, upcoming movies listing, cinema highlights.
- **`Movies/`**: Movies catalog with multi-criteria filters (languages, genres, cinema, date) and infinite scroll pagination.
- **`Movie/`**: Individual movie detail view (synopsis, crew, rating, language chips, trailer actions).
- **`MovieSlots/`**: Showtimes for a specific movie categorized by date and cinema.
- **`Cinemas/`**: Cinema discovery list with location filter.
- **`Cinema/`**: Cinema details and today's/upcoming movie schedules.
- **`Booking/`**: Interactive seat grid, tier selection, live polling of seat states, and booking confirmation checkout.
- **`Login/`**: Sign-in form with Zod schema validation, dispatching JWT authentication tokens.
- **`SignUp/`**: Registration container with multipart avatar upload and validation.
- **`Profile/`**: User profile viewer, profile editor modal, current booked tickets, and past booking history with cancellation actions.
- **`AboutUs/` & `ContactUs/`**: Informational and interactive contact form container.
- **`Header/` & `Footer/`**: Global navigation bar (with theme toggle, search, auth badges) and responsive footer.
- **`ErrorFallback/` & `NotFound/`**: Error boundary UI and 404 page containers.

---

### `src/features/`

Redux Toolkit state slices:

- **`authSlice.ts`**: Manages the user's authentication state (`isAuthenticated`), active JWT access token (`token`), and profile metadata (`user`). Exports `login`, `logout`, and `setUser` actions.

---

### `src/layouts/`

Structural layout components:

- **`RootLayout/`**: The master layout rendering the sticky Header, fluid `<main>` container with responsive padding, dynamic `<Outlet />` for child routes, and the Footer.

---

### `src/lib/`

Shared foundational helper functions:

- **`utils.ts`**: Exports the `cn()` utility function combining `clsx` and `tailwind-merge` to safely combine and override Tailwind CSS classes.

---

### `src/pages/`

Entry points corresponding to each application route. Pages remain minimal: they import the respective container and export a simple component that React Router binds to a route path.

---

### `src/router/`

- **`routes.tsx`**: Defines the React Router 7 route hierarchy using `createBrowserRouter`, establishing route paths, error boundaries, child routes, and layout wrappers.

---

### `src/schemas/`

Zod validation schemas:

- **`loginSchema.ts`**: Validates email format and password presence.
- **`signUpSchema.ts`**: Enforces strict password complexity, matching confirmation passwords, and valid email.
- **`updateProfileSchema.ts`**: Validates profile update submissions.
- **`passwordSchema.ts`**: Reusable password complexity rules.
- **`imageSchema.ts`**: Validates file size and MIME types for uploaded profile images.

---

### `src/services/`

The RTK Query data fetching and caching layer:

- **`services.ts`**: Defines the `api` slice (`createApi`) with endpoints for authentication, movies, cinemas, slots, bookings, tickets, and contact-us.
- **`services.types.ts`**: Complete TypeScript interfaces for all request payloads and backend API response models.

---

### `src/store/`

- **`index.ts`**: Configures the central Redux store, connects the `authSlice` reducer and `bookMyShowApi` middleware, sets up RTK Query listener behaviors, and exports typed `useAppDispatch` and `useAppSelector` hooks.

---

## File Naming Conventions

| Entity            | Pattern                                | Example                                        |
| :---------------- | :------------------------------------- | :--------------------------------------------- |
| **Component**     | `[Name].tsx` or `[Name].component.tsx` | `ModeToggle.tsx`, `Button.tsx`                 |
| **Container**     | `[Name].container.tsx`                 | `Login.container.tsx`, `Booking.container.tsx` |
| **Page**          | `[Name].page.tsx`                      | `Home.page.tsx`, `Profile.page.tsx`            |
| **Hook**          | `use[Name].hook.ts` or `use[Name].ts`  | `useTheme.hook.ts`                             |
| **Schema**        | `[name]Schema.ts`                      | `loginSchema.ts`, `signUpSchema.ts`            |
| **Types**         | `[name].types.ts`                      | `services.types.ts`, `Profile.types.ts`        |
| **Constants**     | `[name].constants.ts`                  | `api.constants.ts`, `routes.constants.ts`      |
| **Barrel Export** | `index.ts` or `index.tsx`              | `src/components/index.ts`                      |
