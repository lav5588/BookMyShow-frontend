# 🎬 BookMyShow Frontend

[![Node Version](https://img.shields.io/badge/node-22.19.0-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/react-19.2-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/typescript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/vite-7.2-purple.svg)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwindcss-4.1-38bdf8.svg)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/redux--toolkit-2.11-764abc.svg)](https://redux-toolkit.js.org/)
[![React Router](https://img.shields.io/badge/react--router-7.11-red.svg)](https://reactrouter.com/)
[![Code Style: Prettier](https://img.shields.io/badge/code%20style-prettier-000000.svg)](https://prettier.io/)
[![ESLint](https://img.shields.io/badge/eslint-9.39-4B32C3.svg)](https://eslint.org/)

The modern, responsive movie discovery and ticket-booking frontend powering the **BookMyShow** ecosystem. Built with **React 19**, **TypeScript**, **Vite 7**, and **Tailwind CSS 4**, featuring real-time seat matrix polling, multi-criteria filtering, hybrid JWT authentication, Redux Toolkit state management with RTK Query caching, and fluid light/dark theming.

> 🌐 **Backend API**: [BookMyShow-backend Repository](https://github.com/lav5588/BookMyShow-backend)

---

## Documentation

Explore our comprehensive documentation suite in the [`docs/`](docs/) directory:

| Document                                                   | Description                                                              |
| :--------------------------------------------------------- | :----------------------------------------------------------------------- |
| [**Documentation Index**](docs/INDEX.md)                   | Central hub and navigation portal for all project documentation.         |
| [**Architecture Overview**](docs/ARCHITECTURE.md)          | System design, component layering, data flow, and build pipeline.        |
| [**Setup & Installation**](docs/SETUP-AND-INSTALLATION.md) | Step-by-step setup guide for Windows, macOS, and Linux.                  |
| [**Development Guide**](docs/DEVELOPMENT-GUIDE.md)         | Daily developer workflows, container patterns, and pre-PR checklist.     |
| [**Project Structure**](docs/PROJECT-STRUCTURE.md)         | Complete directory tree and file naming conventions.                     |
| [**Requirements Specification**](docs/REQUIREMENTS.md)     | Detailed functional and non-functional specifications.                   |
| [**Routing Architecture**](docs/ROUTING.md)                | React Router 7 setup, layout hierarchy, and route parameters.            |
| [**State Management**](docs/STATE-MANAGEMENT.md)           | Redux Toolkit store, `authSlice`, and RTK Query caching policies.        |
| [**API Integration Reference**](docs/API-INTEGRATION.md)   | Complete catalog of RTK Query endpoints, types, and polling intervals.   |
| [**Authentication & Sessions**](docs/AUTHENTICATION.md)    | JWT auth lifecycle, token refresh, and user profile management.          |
| [**Environment Variables**](docs/ENVIRONMENT-VARIABLES.md) | Configuration guide for `PORT`, `VITE_BASE_URL`, and security practices. |
| [**Error Handling Strategy**](docs/ERROR-HANDLING.md)      | Route error boundaries, 404 fallbacks, and user error notifications.     |
| [**Accessibility (a11y) Guide**](docs/ACCESSIBILITY.md)    | WCAG 2.1 AA standards, Radix primitives, and keyboard navigation.        |
| [**Coding Standards**](docs/CODING-STANDARDS.md)           | TypeScript guidelines, ESLint flat config, and Prettier rules.           |
| [**Authors & Maintainers**](docs/AUTHORS.md)               | Creator, lead maintainer, and architectural ownership details.           |
| [**Contributors Guide**](docs/CONTRIBUTORS.md)             | Contribution lifecycle, community guidelines, and hall of fame.          |
| [**Code Owners**](docs/CODE_OWNERS.md)                     | GitHub CODEOWNERS definitions and domain ownership mappings.             |

---

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

---

## Previews Of the Application

![Home Landing](public/app-preview/1.png)
![Movie Details](public/app-preview/2.png)
![Cinema Listings](public/app-preview/3.png)
![Showtime Slots](public/app-preview/4.png)
![Seat Matrix](public/app-preview/5.png)
![Profile & Tickets](public/app-preview/6.png)
![Contact Us](public/app-preview/7.png)
![About Us](public/app-preview/8.png)
