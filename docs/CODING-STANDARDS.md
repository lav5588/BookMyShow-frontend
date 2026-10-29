# Coding Standards & Guidelines

This document outlines the coding standards, TypeScript conventions, linter rules, and file formatting requirements enforced across the **BookMyShow Frontend** codebase.

---

## 1. General Principles

1. **Readability & Predictability**: Code should be self-documenting, concise, and adhere to established patterns.
2. **Strict Type Safety**: Avoid type assertions (`as any`) or bypassing compiler warnings.
3. **Decoupled Architecture**: Maintain a strict separation between business logic containers and presentational components.
4. **Zero Console Pollution**: No `console.log` statements in source files. Production builds automatically strip console calls.

---

## 2. TypeScript Conventions

### Strict Typing

- TypeScript runs with strict compiler flags (`noImplicitAny: true`, `strictNullChecks: true`).
- Use explicit interfaces and types for component props, API payloads, and state slices.

### Type Imports

Use explicit `import type` for type-only imports to allow optimal tree-shaking and avoid circular dependencies:

```typescript
// Correct:
import type { Movie, Cinema } from '@/services/services.types';

// Avoid:
import { Movie, Cinema } from '@/services/services.types';
```

This is enforced automatically by `@typescript-eslint/consistent-type-imports`.

### Naming Conventions

Enforced by `@typescript-eslint/naming-convention`:

- **Variables**: `camelCase`, `UPPER_CASE` (for constants), or `PascalCase` (for React components).
- **Functions**: `camelCase` (e.g., `formatDate`, `getFormData`).
- **Types & Interfaces**: `PascalCase` (e.g., `UserProfile`, `SlotDetails`).
- **Components & Containers**: `PascalCase` (e.g., `MovieCard`, `LoginContainer`).

---

## 3. Import Sorting & Organization

Imports are organized into standardized groups enforced by `eslint-plugin-simple-import-sort`:

1. **React core packages**: `react`, `react-dom`, `react-router`
2. **Third-party libraries**: `@reduxjs/toolkit`, `lucide-react`, `zod`, `date-fns`
3. **Internal Path Aliases (`@/`)**: `@/components`, `@/containers`, `@/constants`, `@/services`, `@/store`
4. **Relative imports**: `./...`, `../...`

Example:

```typescript
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { ROUTES } from '@/constants';
import { useMovieQuery } from '@/services';
import { MovieCard } from './MovieCard.component';
```

---

## 4. ESLint Policies

ESLint 9 runs with the flat configuration in [`eslint.config.js`](../eslint.config.js):

| Rule                               | Severity | Rationale                                                        |
| :--------------------------------- | :------- | :--------------------------------------------------------------- |
| `no-console`                       | `error`  | Prevents debugging logs from leaking into production bundles.    |
| `no-shadow`                        | `error`  | Prevents variable shadowing and accidental scope bugs.           |
| `unused-imports/no-unused-imports` | `error`  | Cleans up unused variables and dangling imports automatically.   |
| `import/no-cycle`                  | `error`  | Prevents circular import dependencies.                           |
| `jsx-a11y/*`                       | `error`  | Enforces WCAG accessibility best practices across all JSX nodes. |
| `arrow-body-style`                 | `error`  | Enforces concise arrow functions (`as-needed`).                  |

---

## 5. Prettier Formatting Specifications

Configured in [`prettier.config.js`](../prettier.config.js):

```javascript
const config = {
    trailingComma: 'all',
    tabWidth: 4,
    semi: true,
    singleQuote: true,
    endOfLine: 'lf',
};

export default config;
```

Format the entire codebase:

```bash
npm run prettier:fix
```

Verify formatting without modifying files:

```bash
npm run prettier
```

---

## 6. Git Hooks & Lint-Staged

We use **Husky** and **lint-staged** to verify quality before commits are recorded:

- On every `git commit`, Husky runs the `.husky/pre-commit` script.
- `lint-staged` triggers Prettier on all modified staged files.
- If errors exist, the commit is aborted until the issues are resolved.

---

## 7. Commit Message Guidelines

We follow the Conventional Commits specification:

```text
<type>(<scope>): <subject>
```

### Supported Types

- `feat`: New feature or user-facing functionality.
- `fix`: Bug fix.
- `docs`: Documentation updates or additions.
- `refactor`: Code reorganization without functional changes.
- `chore`: Dependency updates, config tweaks, or tooling maintenance.
- `style`: Formatting or whitespace corrections.

### Example:

```text
feat(booking): add live polling for slot seat reservation
fix(header): correct responsive menu alignment on mobile viewports
docs(api): add comprehensive reference for user profile endpoints
```
