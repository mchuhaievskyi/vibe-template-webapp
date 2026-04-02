import request from "supertest";
import { app } from "./app";

const originalEnv = { ...process.env };

afterEach(() => {
  // Restore env vars modified during tests
  process.env.NODE_ENV = originalEnv.NODE_ENV;
  delete process.env.CORS_ALLOWED_ORIGINS;
  delete process.env.APP_VERSION;
});

describe("GET /health", () => {
  it("returns 200", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
  });

  it("returns the expected response shape", async () => {
    const res = await request(app).get("/health");
    expect(res.body).toMatchObject({
      status: "ok",
      timestamp: expect.any(String),
      version: expect.any(String),
    });
  });

  it("timestamp is a valid ISO-8601 string", async () => {
    const res = await request(app).get("/health");
    const { timestamp } = res.body as { timestamp: string };
    expect(new Date(timestamp).toISOString()).toBe(timestamp);
  });

  it("returns the APP_VERSION when set", async () => {
    process.env.APP_VERSION = "2.5.0";
    const res = await request(app).get("/health");
    expect((res.body as { version: string }).version).toBe("2.5.0");
  });
});

describe("CORS middleware", () => {
  it("allows all origins in non-production", async () => {
    process.env.NODE_ENV = "development";
    const res = await request(app)
      .get("/health")
      .set("Origin", "http://localhost:5173");
    expect(res.headers["access-control-allow-origin"]).toBe("*");
  });

  it("allows an origin that is in CORS_ALLOWED_ORIGINS in production", async () => {
    process.env.NODE_ENV = "production";
    process.env.CORS_ALLOWED_ORIGINS = "https://example.com";
    const res = await request(app)
      .get("/health")
      .set("Origin", "https://example.com");
    expect(res.headers["access-control-allow-origin"]).toBe(
      "https://example.com",
    );
    expect(res.headers["vary"]).toContain("Origin");
  });

  it("does not set ACAO header for an unlisted origin in production", async () => {
    process.env.NODE_ENV = "production";
    process.env.CORS_ALLOWED_ORIGINS = "https://example.com";
    const res = await request(app)
      .get("/health")
      .set("Origin", "https://evil.com");
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });

  it("does not set ACAO header when no origins are allowed in production", async () => {
    process.env.NODE_ENV = "production";
    process.env.CORS_ALLOWED_ORIGINS = "";
    const res = await request(app)
      .get("/health")
      .set("Origin", "https://example.com");
    expect(res.headers["access-control-allow-origin"]).toBeUndefined();
  });
});
