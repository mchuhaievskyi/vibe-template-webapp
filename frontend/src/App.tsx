import { useEffect, useState } from "react";
import type { HealthResponse } from "@vibe-template/shared";

type FetchState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "ok"; data: HealthResponse }
  | { phase: "error"; message: string };

const API_URL = import.meta.env.VITE_API_URL ?? "";

export default function App() {
  const [health, setHealth] = useState<FetchState>({ phase: "idle" });

  useEffect(() => {
    setHealth({ phase: "loading" });
    fetch(`${API_URL}/health`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<HealthResponse>;
      })
      .then((data) => setHealth({ phase: "ok", data }))
      .catch((err: unknown) =>
        setHealth({
          phase: "error",
          message: err instanceof Error ? err.message : String(err),
        })
      );
  }, []);

  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <h1 style={styles.title}>Vibe Template</h1>
        <p style={styles.subtitle}>AI-driven full-stack monorepo starter</p>

        <div style={styles.healthBox}>
          <h2 style={styles.sectionTitle}>Backend Health</h2>
          <HealthDisplay state={health} />
        </div>
      </section>
    </main>
  );
}

function HealthDisplay({ state }: { state: FetchState }) {
  if (state.phase === "idle" || state.phase === "loading") {
    return <p style={styles.muted}>Checking…</p>;
  }

  if (state.phase === "error") {
    return (
      <p style={{ ...styles.badge, background: "#7f1d1d" }}>
        Error: {state.message}
      </p>
    );
  }

  const { status, timestamp, version } = state.data;
  const color = status === "ok" ? "#14532d" : "#78350f";

  return (
    <table style={styles.table}>
      <tbody>
        <tr>
          <td style={styles.label}>Status</td>
          <td>
            <span style={{ ...styles.badge, background: color }}>{status}</span>
          </td>
        </tr>
        <tr>
          <td style={styles.label}>Version</td>
          <td style={styles.value}>{version}</td>
        </tr>
        <tr>
          <td style={styles.label}>Timestamp</td>
          <td style={styles.value}>{new Date(timestamp).toLocaleString()}</td>
        </tr>
      </tbody>
    </table>
  );
}

const styles = {
  main: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    padding: "2rem",
  } as React.CSSProperties,
  card: {
    background: "#1e293b",
    borderRadius: "1rem",
    padding: "2.5rem",
    maxWidth: "480px",
    width: "100%",
    boxShadow: "0 25px 50px rgba(0,0,0,0.4)",
  } as React.CSSProperties,
  title: { fontSize: "2rem", fontWeight: 700, marginBottom: "0.25rem" } as React.CSSProperties,
  subtitle: { color: "#94a3b8", marginBottom: "2rem" } as React.CSSProperties,
  healthBox: {
    background: "#0f172a",
    borderRadius: "0.5rem",
    padding: "1.25rem",
  } as React.CSSProperties,
  sectionTitle: { fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#64748b", marginBottom: "1rem" } as React.CSSProperties,
  table: { width: "100%", borderCollapse: "collapse" } as React.CSSProperties,
  label: { color: "#64748b", paddingBottom: "0.5rem", paddingRight: "1rem", fontSize: "0.9rem" } as React.CSSProperties,
  value: { color: "#e2e8f0", fontSize: "0.9rem" } as React.CSSProperties,
  badge: { display: "inline-block", padding: "0.15rem 0.6rem", borderRadius: "999px", fontSize: "0.8rem", fontWeight: 600 } as React.CSSProperties,
  muted: { color: "#64748b" } as React.CSSProperties,
} as const;
