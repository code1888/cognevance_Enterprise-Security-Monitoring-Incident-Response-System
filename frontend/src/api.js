const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:4000"
).replace(/\/+$/, "");

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body ? { "Content-Type": "application/json" } : {}),
      ...options.headers
    }
  });
  if (!response.ok) {
    let detail = `HTTP ${response.status}`;
    try {
      const body = await response.json();
      if (body.error) detail = body.error;
    } catch {}
    throw new Error(detail);
  }
  return response.json();
}

export const getHealth = () => request("/api/health");
export const getMetrics = () => request("/api/metrics");
export const getEvents = (severity = "all") =>
  request(`/api/events${severity === "all" ? "" : `?severity=${encodeURIComponent(severity)}`}`);
export const getIncidents = () => request("/api/incidents");
export const updateIncident = (id, status) =>
  request(`/api/incidents/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
