# @vibe-template/backend

Minimal Express API for the vibe-template monorepo.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Returns service health status |

### `GET /health` response

```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

## Development

```bash
# From repo root
npm run dev --workspace=backend

# Or directly
npm run dev
```

Server starts on `http://localhost:3000` (override with `PORT` env var).

## Build

```bash
npm run build
```

Compiles TypeScript to `dist/`.
