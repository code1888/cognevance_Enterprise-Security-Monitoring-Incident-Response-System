require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { events, incidents } = require("./data");

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigins = (process.env.FRONTEND_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173")
  .split(",")
  .map((value) => value.trim());

app.disable("x-powered-by");
app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: "100kb" }));

const validSeverities = new Set(["critical", "high", "medium", "low"]);
const validIncidentStatuses = new Set(["Open", "Investigating", "Resolved"]);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "Enterprise Security Monitoring & Incident Response System",
    mode: "demo",
    timestamp: new Date().toISOString()
  });
});

app.get("/api/metrics", (_req, res) => {
  const openIncidents = incidents.filter((item) => item.status !== "Resolved").length;
  const counts = Object.fromEntries(
    ["critical", "high", "medium", "low"].map((severity) => [
      severity,
      events.filter((event) => event.severity === severity).length
    ])
  );
  res.json({
    totalEvents: events.length,
    openIncidents,
    criticalEvents: counts.critical,
    highEvents: counts.high,
    severityCounts: counts,
    demo: true
  });
});

app.get("/api/events", (req, res) => {
  const severity = String(req.query.severity || "").toLowerCase();
  if (severity && !validSeverities.has(severity)) {
    return res.status(400).json({ error: "Invalid severity filter" });
  }
  const result = severity ? events.filter((event) => event.severity === severity) : events;
  res.json({ items: result, total: result.length, demo: true });
});

app.get("/api/alerts", (_req, res) => {
  const items = events
    .filter((event) => event.severity === "critical" || event.severity === "high")
    .map((event) => ({
      id: `ALT-${event.id}`,
      eventId: event.id,
      title: event.title,
      severity: event.severity,
      timestamp: event.timestamp,
      asset: event.asset,
      sourceIp: event.sourceIp,
      demo: true
    }));
  res.json({ items, total: items.length, demo: true });
});

app.get("/api/incidents", (_req, res) => {
  res.json({ items: incidents, total: incidents.length, demo: true });
});

app.patch("/api/incidents/:id", (req, res) => {
  const { status, notes } = req.body || {};
  if (!validIncidentStatuses.has(status)) {
    return res.status(400).json({
      error: "status must be Open, Investigating, or Resolved"
    });
  }
  const incident = incidents.find((item) => item.id === req.params.id);
  if (!incident) {
    return res.status(404).json({ error: "Incident not found" });
  }
  incident.status = status;
  if (typeof notes === "string") incident.notes = notes.slice(0, 2000);
  incident.updatedAt = new Date().toISOString();
  res.json({ item: incident, demo: true });
});

app.use("/api", (_req, res) => {
  res.status(404).json({ error: "API endpoint not found" });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`SOC API listening at http://127.0.0.1:${port}`);
  console.log("Mode: DEMO DATA — do not treat sample events as live detections.");
});
