# vibe-template-webapp

Template project for AI-driven development — a full-stack TypeScript monorepo.

## Structure

```
vibe-template-webapp/
├── backend/       # Node.js + Express REST API
├── frontend/      # React + Vite web application
├── shared/        # Shared DTOs and TypeSpec API schema
├── docker-compose.yml
├── Dockerfile.backend
└── Dockerfile.frontend
```

## Prerequisites

- Node.js >= 20
- npm >= 10
- Docker & Docker Compose (for containerised run)

## Getting Started

### Install dependencies

```bash
npm install
```

### Development (local)

```bash
npm run dev
```

Starts backend on `http://localhost:3000` and frontend on `http://localhost:5173`.

### Build

```bash
npm run build
```

### Run with Docker Compose

```bash
docker compose up --build
```

Services:
- Backend → `http://localhost:3000`
- Frontend → `http://localhost:8080`

## Packages

| Package | Description |
|---------|-------------|
| [`backend`](./backend/README.md) | Express API with `/health` endpoint |
| [`frontend`](./frontend/README.md) | React app with welcome page and health status |
| [`shared`](./shared/README.md) | Shared DTOs and TypeSpec API schema |
