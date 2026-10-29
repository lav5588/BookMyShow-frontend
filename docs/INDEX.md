# BookMyShow Frontend Documentation

Welcome to the comprehensive documentation for the **BookMyShow Frontend** web application. This portal provides an overview of the system architecture, development workflows, state management, component hierarchies, API integrations, and community guidelines.

---

## Documentation Directory

The documentation is organized into clear domains to help developers, designers, and contributors quickly find the information they need:

### 1. Architecture & Design

Learn about the foundational structure, data flow, routing mechanics, and codebase organization:

- [**Architecture Overview**](./ARCHITECTURE.md)  
  High-level architecture, tech stack breakdown, client-side rendering model, component layering, and data flow diagrams.
- [**Project Structure**](./PROJECT-STRUCTURE.md)  
  Exhaustive directory map and file naming conventions across `src/`, configuration files, and assets.
- [**Routing Guide**](./ROUTING.md)  
  React Router 7 configuration, route tables, nested layouts, route parameters, and navigation strategies.
- [**State Management**](./STATE-MANAGEMENT.md)  
  Redux Toolkit architecture, `authSlice` for client state, and RTK Query for server state caching and tag invalidation.

---

### 2. Getting Started & Setup

Everything you need to clone, configure, run, and develop locally:

- [**Setup and Installation**](./SETUP-AND-INSTALLATION.md)  
  Prerequisites, Node.js version management (`.nvmrc`), dependency installation, environment setup, and verification.
- [**Development Guide**](./DEVELOPMENT-GUIDE.md)  
  Day-to-day developer workflows: creating components, adding API endpoints, form validation, and running quality checks.
- [**Environment Variables**](./ENVIRONMENT-VARIABLES.md)  
  Specification of all client and build environment variables (`PORT`, `VITE_BASE_URL`), loading mechanisms, and security rules.

---

### 3. Features & Specifications

Deep dives into functional requirements, API endpoints, and authentication flows:

- [**Requirements Specification**](./REQUIREMENTS.md)  
  Detailed functional and non-functional requirements, user stories, supported features, and browser targets.
- [**API Integration Reference**](./API-INTEGRATION.md)  
  Full catalog of RTK Query endpoints, API route constants, payload types, polling intervals, and tag-based invalidations.
- [**Authentication & User Sessions**](./AUTHENTICATION.md)  
  JWT token lifecycle, sign-up, sign-in, profile updates, secure avatar uploads, and conditional route access.

---

### 4. Quality & Engineering Standards

Maintaining code quality, error resiliency, and accessibility:

- [**Coding Standards**](./CODING-STANDARDS.md)  
  TypeScript strict rules, ESLint flat config policies, Prettier conventions, import sorting, and commit standards.
- [**Error Handling Strategy**](./ERROR-HANDLING.md)  
  Multi-tier error boundaries, route fallbacks (`ErrorFallback`), 404 pages (`NotFound`), API error toasts, and form feedback.
- [**Accessibility (a11y) Guide**](./ACCESSIBILITY.md)  
  WCAG 2.1 AA compliance, keyboard navigation, screen reader semantics via Radix UI primitives, and contrast standards.

---

### 5. Governance & Community

Ownership, team members, and contribution guidelines:

- [**Authors**](./AUTHORS.md)  
  Project author, creator, and maintainer information.
- [**Code Owners**](./CODE_OWNERS.md)  
  GitHub-compatible code ownership rules and domain responsibilities.
- [**Contributors**](./CONTRIBUTORS.md)  
  Guidelines for open-source contributors, recognition, and pull request workflows.

---

## Quick Navigation Matrix

| Topic                      | Relevant Document                                          | Key Concepts                               |
| :------------------------- | :--------------------------------------------------------- | :----------------------------------------- |
| **Local Setup**            | [`SETUP-AND-INSTALLATION.md`](./SETUP-AND-INSTALLATION.md) | Node.js 22, npm ci, `.env` setup           |
| **API Endpoints**          | [`API-INTEGRATION.md`](./API-INTEGRATION.md)               | RTK Query, endpoints, polling, tags        |
| **Authentication**         | [`AUTHENTICATION.md`](./AUTHENTICATION.md)                 | JWT access/refresh, authSlice, profile     |
| **Adding Features**        | [`DEVELOPMENT-GUIDE.md`](./DEVELOPMENT-GUIDE.md)           | Container-Component pattern, schemas       |
| **Routing**                | [`ROUTING.md`](./ROUTING.md)                               | React Router 7, RootLayout, dynamic routes |
| **State**                  | [`STATE-MANAGEMENT.md`](./STATE-MANAGEMENT.md)             | Redux store, cache tags, infinite queries  |
| **Linting & Formatting**   | [`CODING-STANDARDS.md`](./CODING-STANDARDS.md)             | ESLint, Prettier, Husky, lint-staged       |
| **Troubleshooting Errors** | [`ERROR-HANDLING.md`](./ERROR-HANDLING.md)                 | ErrorBoundary, Sonner toast, fallback UI   |
| **Accessibility**          | [`ACCESSIBILITY.md`](./ACCESSIBILITY.md)                   | ARIA, Radix UI primitives, keyboard nav    |

---

## How to Contribute to Documentation

If you identify missing details, outdated endpoints, or areas that could be clearer:

1. Create a new branch from `main`.
2. Edit or add markdown files within the `docs/` folder.
3. Update links in [`INDEX.md`](./INDEX.md) and [`README.md`](../README.md) if adding new files.
4. Run formatting checks:
    ```bash
    npm run prettier
    ```
5. Submit a pull request following the repository's PR template.
