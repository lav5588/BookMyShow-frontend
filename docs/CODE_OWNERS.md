# Code Owners

This document defines the code ownership guidelines and review responsibilities for the **BookMyShow Frontend** repository.

---

## Code Ownership Mapping

In accordance with GitHub CODEOWNERS syntax, the primary owners for each area of the codebase are detailed below:

```text
# Global repository owner
*                                       @lav5588

# CI/CD Workflows, Git hooks, and Tooling
/.github/                               @lav5588
/.husky/                                @lav5588
/vite.config.ts                         @lav5588
/eslint.config.js                       @lav5588
/prettier.config.js                     @lav5588
/package.json                           @lav5588
/tsconfig*.json                         @lav5588

# State Management & Services
/src/store/                             @lav5588
/src/services/                          @lav5588
/src/features/                          @lav5588

# Router & Layouts
/src/router/                            @lav5588
/src/layouts/                           @lav5588
/src/pages/                             @lav5588

# Feature Containers & Logic
/src/containers/                        @lav5588

# Design System & UI Primitives
/src/components/                        @lav5588
/src/components/ui/                     @lav5588
/src/index.css                          @lav5588

# Documentation Suite
/docs/                                  @lav5588
/README.md                              @lav5588
```

---

## Review & Contribution Responsibilities

1. **Pull Request Sign-off**: All PRs submitted to `main` require at least one approving review from a code owner prior to merging.
2. **Quality Gates**: All automated CI checks (ESLint, Prettier, TypeScript compile, production build) must pass before code owner review.
3. **Architectural Alterations**: Any modifications affecting global state (`src/store/`), base API architecture (`src/services/`), or routing layouts (`src/router/`, `src/layouts/`) require direct review from `@lav5588`.
