const now = Date.now();
const minutesAgo = (minutes) => new Date(now - minutes * 60_000).toISOString();

const events = [
  {
    id: "evt-1001",
    timestamp: minutesAgo(3),
    severity: "high",
    source: "authentication",
    title: "Repeated failed login attempts",
    sourceIp: "192.0.2.24",
    asset: "linux-web-01",
    description: "Synthetic demo event: repeated authentication failures observed.",
    status: "New",
    demo: true
  },
  {
    id: "evt-1002",
    timestamp: minutesAgo(11),
    severity: "critical",
    source: "suricata",
    title: "Potential port scan detected",
    sourceIp: "198.51.100.18",
    asset: "lab-gateway",
    description: "Synthetic demo event representing a network IDS signature match.",
    status: "New",
    demo: true
  },
  {
    id: "evt-1003",
    timestamp: minutesAgo(19),
    severity: "medium",
    source: "endpoint",
    title: "Unusual process execution",
    sourceIp: "192.0.2.45",
    asset: "workstation-07",
    description: "Synthetic demo event requiring analyst validation.",
    status: "Investigating",
    demo: true
  },
  {
    id: "evt-1004",
    timestamp: minutesAgo(32),
    severity: "low",
    source: "firewall",
    title: "Connection denied by policy",
    sourceIp: "203.0.113.9",
    asset: "edge-firewall",
    description: "Synthetic demo event representing a denied connection.",
    status: "New",
    demo: true
  },
  {
    id: "evt-1005",
    timestamp: minutesAgo(47),
    severity: "high",
    source: "authentication",
    title: "Login from unusual location",
    sourceIp: "203.0.113.76",
    asset: "identity-service",
    description: "Synthetic demo event; location is not geolocated or verified.",
    status: "New",
    demo: true
  },
  {
    id: "evt-1006",
    timestamp: minutesAgo(66),
    severity: "medium",
    source: "suricata",
    title: "Outbound connection matched lab rule",
    sourceIp: "192.0.2.80",
    asset: "lab-client-02",
    description: "Synthetic event for demonstrating alert triage.",
    status: "Resolved",
    demo: true
  }
];

const incidents = [
  {
    id: "INC-2026-001",
    title: "Potential network scan",
    severity: "critical",
    asset: "lab-gateway",
    eventId: "evt-1002",
    status: "Open",
    assignee: "SOC Analyst",
    createdAt: minutesAgo(11),
    notes: "Demo incident. Validate the source and confirm whether activity was authorized."
  },
  {
    id: "INC-2026-002",
    title: "Repeated authentication failures",
    severity: "high",
    asset: "linux-web-01",
    eventId: "evt-1001",
    status: "Investigating",
    assignee: "SOC Analyst",
    createdAt: minutesAgo(3),
    notes: "Review authentication logs and correlate with other telemetry."
  },
  {
    id: "INC-2026-003",
    title: "Unusual process execution",
    severity: "medium",
    asset: "workstation-07",
    eventId: "evt-1003",
    status: "Resolved",
    assignee: "SOC Analyst",
    createdAt: minutesAgo(19),
    notes: "Demo incident closed after illustrative triage."
  }
];

module.exports = { events, incidents };
