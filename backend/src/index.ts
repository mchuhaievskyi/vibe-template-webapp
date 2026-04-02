import express from "express";
import type { HealthResponse } from "@vibe-template/shared";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(express.json());

// Allow frontend dev server during local development
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get("/health", (_req, res) => {
  const body: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: process.env.npm_package_version ?? "1.0.0",
  };
  res.json(body);
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});
