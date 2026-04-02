import { render, screen, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import App from "./App";

describe("App", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("shows loading state while fetching", () => {
    vi.spyOn(globalThis, "fetch").mockReturnValue(new Promise(() => {}));
    render(<App />);
    expect(screen.getByText("Checking…")).toBeInTheDocument();
  });

  it("renders health data when the fetch succeeds", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: "ok",
          timestamp: "2024-01-01T00:00:00.000Z",
          version: "1.2.3",
        }),
    } as Response);

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("ok")).toBeInTheDocument(),
    );
    expect(screen.getByText("1.2.3")).toBeInTheDocument();
    expect(screen.getByText(/1\/1\/2024/)).toBeInTheDocument();
  });

  it("renders an error message when the fetch fails with a network error", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(
      new Error("Network Error"),
    );

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText(/Error: Network Error/)).toBeInTheDocument(),
    );
  });

  it("renders an error message when the server returns a non-ok response", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: false,
      status: 503,
    } as Response);

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText(/Error: HTTP 503/)).toBeInTheDocument(),
    );
  });

  it("renders a degraded status badge in a different colour", async () => {
    vi.spyOn(globalThis, "fetch").mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          status: "degraded",
          timestamp: "2024-01-01T00:00:00.000Z",
          version: "1.0.0",
        }),
    } as Response);

    render(<App />);

    await waitFor(() =>
      expect(screen.getByText("degraded")).toBeInTheDocument(),
    );
  });
});
