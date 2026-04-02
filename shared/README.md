# @vibe-template/shared

Shared TypeScript types and TypeSpec API schema used by both `backend` and `frontend`.

## Contents

| Path | Description |
|------|-------------|
| `src/dtos.ts` | TypeScript interfaces (DTOs) for API request/response bodies |
| `typespec/main.tsp` | TypeSpec source — single source of truth for the API contract |

## DTOs

### `HealthResponse`

```ts
interface HealthResponse {
  status: "ok" | "degraded" | "error";
  timestamp: string; // ISO-8601
  version: string;
}
```

## TypeSpec

The `typespec/main.tsp` file describes the full API using [TypeSpec](https://typespec.io/).  
It can emit an OpenAPI 3 spec:

```bash
npm run build:typespec
```

Output is written to `typespec-output/openapi.yaml`.

## Build

```bash
npm run build
```

Compiles TypeScript to `dist/` with declaration files so both backend and frontend can import types.
