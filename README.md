# BookMyShow Frontend

A responsive movie discovery and ticket-booking frontend built with React, TypeScript, and Vite. It lets users browse movies and cinemas, filter show listings, manage bookings, and access account-related screens.

## Features

- Browse current, latest, and upcoming movies
- Filter movies by language, genre, cinema, and date
- Explore cinemas and their available movie slots
- View movie, cinema, and booking details
- Authentication flows for sign up, login, token refresh, and logout
- Profile and ticket management screens
- Responsive landing, About Us, and Contact Us pages
- Dark and light theme support
- Not Found and route error fallback screens

## Tech stack

- React 19 and TypeScript
- Vite 7
- React Router 7
- Redux Toolkit and RTK Query
- Tailwind CSS 4 and shadcn/ui components
- React Hook Form and Zod
- Lucide icons and Sonner notifications

## Prerequisites

- Node.js `v22.19.0` (see [`.nvmrc`](.nvmrc))
- npm
- A running BookMyShow backend API

## Getting started

1. Clone the repository and open the frontend directory.

2. Use the expected Node.js version:

    ```bash
    nvm use
    ```

3. Install dependencies:

    ```bash
    npm ci
    ```

4. Create your local environment file from the example:

    ```bash
    cp .env.example .env
    ```

    On Windows PowerShell:

    ```powershell
    Copy-Item .env.example .env
    ```

5. Set the backend API URL in `.env`:

    ```env
    PORT=3000
    VITE_BASE_URL=http://localhost:8000/api
    ```

6. Start the development server:

    ```bash
    npm run dev
    ```

    The app runs on `http://localhost:3000` when `PORT=3000` is configured.

## Available scripts

| Command                | Description                                         |
| ---------------------- | --------------------------------------------------- |
| `npm run dev`          | Starts the Vite development server.                 |
| `npm run build`        | Type-checks the app and creates a production build. |
| `npm run preview`      | Serves the production build locally.                |
| `npm run lint`         | Runs ESLint across the project.                     |
| `npm run lint:fix`     | Runs ESLint and applies safe fixes.                 |
| `npm run ts:check`     | Runs TypeScript without emitting files.             |
| `npm run prettier`     | Checks formatting with Prettier.                    |
| `npm run prettier:fix` | Formats files with Prettier.                        |
| `npm run prepare`      | Installs Husky Git hooks.                           |

## Routes

| Route                | Purpose                                             |
| -------------------- | --------------------------------------------------- |
| `/`                  | Home page with movie and cinema discovery sections. |
| `/movies`            | Movie catalogue and filters.                        |
| `/movie/:slug`       | Movie details.                                      |
| `/movie/:slug/slots` | Movie showtimes.                                    |
| `/cinemas`           | Cinema catalogue.                                   |
| `/cinema/:id`        | Cinema details and slots.                           |
| `/booking/:slotId`   | Seat selection and booking flow.                    |
| `/login`             | Login page.                                         |
| `/signup`            | Registration page.                                  |
| `/profile`           | User profile and ticket details.                    |
| `/about`             | About Us page.                                      |
| `/contact`           | Contact Us page.                                    |
| `*`                  | Not Found fallback for unmatched routes.            |

## Project structure

```text
src/
├── assets/         # Images, fonts, and SVG illustrations
├── components/     # Shared UI and feature components
├── constants/      # API, format, and route constants
├── containers/     # Page-level feature logic and configuration
├── features/       # Redux slices
├── layouts/        # Shared application layouts
├── pages/          # Route-level page components
├── router/         # React Router configuration
├── services/       # RTK Query API services and API types
├── store/          # Redux store and typed hooks
└── index.tsx       # Application entry point
```

## Environment variables

| Variable        | Required | Description                                |
| --------------- | -------- | ------------------------------------------ |
| `VITE_BASE_URL` | Yes      | Base URL for the backend API.              |
| `PORT`          | No       | Local development and preview server port. |

Only variables prefixed with `VITE_` are exposed to the frontend by Vite. Do not place secrets in frontend environment files.

## Quality checks

Run these before opening a pull request:

```bash
npm run prettier
npm run lint
npm run ts:check
npm run build
```

## Production build

Create an optimized production bundle with:

```bash
npm run build
```

The generated files are placed in `dist/`. Production builds minify JavaScript, remove `console` calls, hide source maps, and optimize supported raster image assets.
