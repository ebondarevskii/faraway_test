# Faraway — Test Task

Test task for Faraway: a small React app that lists and displays Star Wars characters using the [SWAPI](https://swapi.dev/) API.

# Deploy link - https://faraway-test-tau.vercel.app/

## Tech stack

- **React 19** + **TypeScript**
- **Vite 7** — build and dev server
- **React Router** — routing
- **TanStack React Query** — server state and caching
- **Ant Design** — UI components
- **Tailwind CSS** — styling
- **Axios** — HTTP client
- **React Hook Form** — forms

## Run locally

```bash
npm install
npm run dev
```

App will be available at `http://localhost:5173` (or the port Vite prints).

## Build

```bash
npm run build
```

Output is in the `dist/` folder. To preview the production build:

```bash
npm run preview
```

## Tests

```bash
npm run test        # watch mode — re-runs on file change
npm run test:run    # single run, then exit
```

## Other commands

- `npm run lint` — run ESLint
