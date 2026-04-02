/**
 * Response body for GET /health
 */
export interface HealthResponse {
  /** Service health status */
  status: "ok" | "degraded" | "error";
  /** ISO-8601 timestamp of the response */
  timestamp: string;
  /** Deployed version of the service */
  version: string;
}
