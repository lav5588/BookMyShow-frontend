# Environment Variables

This document details the environment configuration variables used by the **BookMyShow Frontend** application, explaining their purposes, configuration formats, loading behaviors, and security best practices.

---

## Environment Variables Specification

The frontend depends on the following environment variables:

| Variable        | Required | Default | Scope                      | Description                                                                               |
| :-------------- | :------- | :------ | :------------------------- | :---------------------------------------------------------------------------------------- |
| `VITE_BASE_URL` | **Yes**  | None    | Client (`import.meta.env`) | Base URL pointing to the BookMyShow backend REST API (e.g., `http://localhost:8000/api`). |
| `PORT`          | No       | `3000`  | Node / Vite Server         | Local port number on which Vite binds the development and preview HTTP servers.           |

---

## Configuration File Template

An example configuration file is provided in the repository root as [`.env.example`](../.env.example):

```env
PORT=3000
VITE_BASE_URL=http://localhost:8000/api
```

To configure your local environment:

### Linux / macOS

```bash
cp .env.example .env
```

### Windows (PowerShell)

```powershell
Copy-Item .env.example .env
```

---

## Vite Environment Loading Mechanism

Vite automatically parses and loads `.env` files using [dotenv](https://github.com/motdotla/dotenv) according to its environment hierarchy:

1. `.env`: Loaded in all environments.
2. `.env.local`: Loaded in all environments, ignored by Git.
3. `.env.[mode]`: Loaded only in the specified mode (e.g., `.env.development` or `.env.production`).
4. `.env.[mode].local`: Mode-specific override, ignored by Git.

### Client-Side Access via `import.meta.env`

To prevent accidental leakage of sensitive environment variables to client browsers, **Vite only exposes variables prefixed with `VITE_` to client code**.

In the codebase, `VITE_BASE_URL` is accessed via:

```typescript
// src/services/services.ts
export const api = createApi({
    reducerPath: 'bookMyShowApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BASE_URL}` }),
    // ...
});
```

### Build-Time Configuration via `loadEnv`

Variables intended for Vite's build server (such as `PORT`) are loaded inside `vite.config.ts` using Vite's `loadEnv` utility:

```typescript
// vite.config.ts
export default defineConfig(({ mode }): UserConfig => {
    const env = loadEnv(mode, process.cwd(), '');
    const PORT = parseInt(env.PORT) || undefined;
    // ...
});
```

---

## Environment Profiles

### Local Development

```env
PORT=3000
VITE_BASE_URL=http://localhost:8000/api
```

Points to a local BookMyShow backend running on port 8000.

### Staging / Preview

```env
PORT=3000
VITE_BASE_URL=https://staging-api.bookmyshow.example.com/api
```

### Production

```env
VITE_BASE_URL=https://api.bookmyshow.example.com/api
```

In production platforms (e.g., Vercel, Netlify, Docker, or AWS Amplify), set `VITE_BASE_URL` in the platform's Environment Variables dashboard.

---

## Security Best Practices

> [!CAUTION]
> Never place private keys, database credentials, server secrets, or sensitive tokens in client environment files.

1. **Client Visibility**: Any variable prefixed with `VITE_` is compiled directly into static JavaScript files during `npm run build` and can be inspected by anyone using browser developer tools.
2. **Git Hygiene**: The `.env` file containing local configurations should be kept out of version control if it differs from the public defaults. Ensure `.env` is listed in [`.gitignore`](../.gitignore).
3. **Template Maintenance**: When adding new client configuration parameters, always update `.env.example` and this documentation file so other developers are aware of the requirement.
