import "@typespec/http";

using TypeSpec.Http;

@service({
  title: "Vibe Template API",
  version: "1.0.0",
})
@server("http://localhost:3000", "Local development server")
namespace VibeTemplateApi;

/** Health status values */
enum HealthStatus {
  ok,
  degraded,
  error,
}

/** Response body for the health endpoint */
model HealthResponse {
  /** Service health status */
  status: HealthStatus;

  /** ISO-8601 timestamp of the response */
  timestamp: utcDateTime;

  /** Deployed version of the service */
  version: string;
}

@tag("System")
interface HealthEndpoints {
  /** Check service health */
  @get
  @route("/health")
  health(): {
    @statusCode statusCode: 200;
    @body body: HealthResponse;
  };
}
