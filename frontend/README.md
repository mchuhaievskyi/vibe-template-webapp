# @vibe-template/frontend

React + Vite web application for the vibe-template monorepo.

## Features

- Welcome page with live backend health status
- Fetches `GET /health` from the backend on load
- Displays status, version, and timestamp

## Development

```bash
# From repo root
npm run dev --workspace=frontend

# Or directly
npm run dev
```

App starts on `http://localhost:5173`.  
Requests to `/health` are proxied to the backend (`http://localhost:3000` by default).

## Build

```bash
npm run build
```

Static output written to `dist/`. Serve with any static file host or nginx.

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_URL` | `""` (same origin via proxy) | Backend base URL |
