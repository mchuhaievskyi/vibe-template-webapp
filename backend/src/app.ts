import express from "express";
import { readFileSync } from "fs";
import { resolve } from "path";
import type { HealthResponse } from "@vibe-template/shared";

function readAppVersion(): string {
  if (process.env.APP_VERSION) return process.env.APP_VERSION;
  if (process.env.npm_package_version) return process.env.npm_package_version;
  try {
    const raw = readFileSync(resolve(__dirname, "..", "package.json"), "utf-8");
    const pkg = JSON.parse(raw) as { version?: string };
    return pkg.version ?? "1.0.0";
  } catch {
    return "1.0.0";
  }
}

export const app = express();

app.use(express.json());

// In development allow all origins; in production restrict to an explicit allowlist.
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== "production") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
    return;
  }

  const allowedOrigins = new Set(
    (process.env.CORS_ALLOWED_ORIGINS ?? "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );

  const origin = req.headers.origin;
  if (origin && allowedOrigins.has(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Vary", "Origin");
  }
  next();
});

app.get("/health", (_req, res) => {
  const body: HealthResponse = {
    status: "ok",
    timestamp: new Date().toISOString(),
    version: readAppVersion(),
  };
  res.json(body);
});
