# Setup and Installation Guide

This guide provides step-by-step instructions for configuring, installing, and running the **BookMyShow Frontend** application in your local development environment across Windows, macOS, and Linux.

---

## 1. Prerequisites

Before installing the application, ensure your environment meets the following requirements:

| Requirement         | Supported Version  | Notes                                |
| :------------------ | :----------------- | :----------------------------------- |
| **Node.js**         | `v22.19.0`         | Specified in [`.nvmrc`](../.nvmrc)   |
| **Package Manager** | `npm` (v10+)       | Included with Node.js                |
| **Version Control** | `git` (v2.30+)     | Required for cloning and hooks       |
| **Backend API**     | BookMyShow Backend | REST API running locally or remotely |

---

## 2. Setting Up the Node.js Environment

To avoid version mismatches and dependency issues, use a Node version manager such as **nvm**, **fnm**, or **volta**.

### Using NVM (macOS / Linux / WSL)

```bash
# Navigate to the project root
cd BookMyShow-frontend

# Install and switch to the required Node.js version
nvm install
nvm use
```

### Using NVM on Windows (nvm-windows)

```powershell
nvm install 22.19.0
nvm use 22.19.0
```

Verify your active Node.js and npm versions:

```bash
node -v   # Expected: v22.19.0
npm -v    # Expected: 10.x.x or higher
```

---

## 3. Clone and Install Dependencies

1. **Clone the repository**:

    ```bash
    git clone git@github.com:lav5588/BookMyShow-frontend.git
    cd BookMyShow-frontend
    ```

2. **Install project dependencies**:
   Use `npm ci` for clean, deterministic installations using `package-lock.json`:

    ```bash
    npm ci
    ```

3. **Verify Git Hooks initialization**:
   The `prepare` script automatically runs `husky` to install pre-commit hooks for automated formatting and lint checks:
    ```bash
    npm run prepare
    ```

---

## 4. Environment Configuration

The frontend requires an environment file `.env` specifying the backend API address and development port.

1. **Copy the example configuration file**:
    - **Linux / macOS / Git Bash**:

        ```bash
        cp .env.example .env
        ```

    - **Windows PowerShell**:
        ```powershell
        Copy-Item .env.example .env
        ```

2. **Configure your variables in `.env`**:

    ```env
    # Local development server port
    PORT=3000

    # Target backend REST API base URL
    VITE_BASE_URL=http://localhost:8000/api
    ```

> [!NOTE]
> Vite only exposes variables prefixed with `VITE_` to client-side code (`import.meta.env.VITE_BASE_URL`). The `PORT` variable is read during Vite server initialization.

---

## 5. Running the Application

### Development Mode

Start the Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to:

```text
http://localhost:3000
```

### Production Build & Local Preview

To test the production build with asset optimization, Terser minification, and bundled outputs:

1. **Build the production bundle**:

    ```bash
    npm run build
    ```

    This generates optimized files in the `dist/` directory.

2. **Serve the production bundle locally**:
    ```bash
    npm run preview
    ```

---

## 6. Available Scripts Reference

| Command                | Action                   | Description                                             |
| :--------------------- | :----------------------- | :------------------------------------------------------ |
| `npm run dev`          | `vite`                   | Starts local development server on configured `PORT`.   |
| `npm run build`        | `tsc -b && vite build`   | Type-checks code and creates production bundle.         |
| `npm run preview`      | `vite preview`           | Previews the production `dist/` folder locally.         |
| `npm run lint`         | `eslint .`               | Runs ESLint 9 checks across all source files.           |
| `npm run lint:fix`     | `eslint . --fix`         | Runs ESLint and automatically applies safe fixes.       |
| `npm run ts:check`     | `tsc --noEmit`           | Runs TypeScript compiler checks without emitting files. |
| `npm run prettier`     | `npx prettier --check .` | Verifies code formatting against project standards.     |
| `npm run prettier:fix` | `npx prettier --write .` | Formats all files according to Prettier configuration.  |
| `npm run prepare`      | `husky`                  | Installs Husky pre-commit hooks.                        |

---

## 7. Troubleshooting & Common Issues

### Issue 1: Port 3000 Already in Use

**Symptom**: Error indicating port `3000` is occupied.  
**Solution**: Change `PORT` in `.env` to an alternative port (e.g., `PORT=3001`), or stop the existing process holding port 3000.

### Issue 2: CORS / Network Error When Fetching Data

**Symptom**: Console displays `Cross-Origin Request Blocked` or failed API requests.  
**Solution**:

1. Confirm the backend API is running and reachable at the URL in `VITE_BASE_URL`.
2. Ensure the backend has configured CORS headers allowing requests from `http://localhost:3000` with credentials support (`Access-Control-Allow-Credentials: true`).

### Issue 3: Line Ending / Prettier Mismatch on Windows

**Symptom**: Prettier reports `Delete ␍` or end-of-line CRLF warnings.  
**Solution**:
Configure Git to check out files with LF line endings or run:

```bash
git config core.autocrlf false
npm run prettier:fix
```
