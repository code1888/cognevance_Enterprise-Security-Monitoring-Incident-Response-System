# Enterprise Security Monitoring & Incident Response System

A SOC-style learning project with a React/Vite dashboard, Node.js/Express API, incident workflow, sample security events, and optional Elastic Stack/Suricata integration notes.

> **Important:** The included dashboard runs in **DEMO MODE** using clearly labeled sample events. It does not claim to detect real attacks by itself. Connect authorized lab telemetry to Elastic/Suricata before treating it as a live SIEM.

## Features
- React dashboard with overview metrics, event table, severity filtering, and incident queue.
- Express API with health, events, alerts, and incident endpoints.
- Demo event data for failed logins, IDS alerts, and suspicious connections.
- Incident status updates: Open, Investigating, Resolved.
- API health status in the frontend.
- Optional Docker Compose file for a local Elasticsearch + Kibana lab.
- Documentation for architecture, safe lab setup, detection workflow, response workflow, and hardening.

## Requirements
- Node.js 20+ and npm
- Kali Linux, Ubuntu, or another Linux environment
- Optional: Docker Engine and Docker Compose plugin for Elastic Stack

## Quick start (Kali Linux)

Open Terminal 1:

```bash
cd backend
npm install
npm start
```

The API listens on `http://127.0.0.1:4000` by default.

Open Terminal 2:

```bash
cd frontend
npm install
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

Verify the API:

```bash
curl http://127.0.0.1:4000/api/health
curl http://127.0.0.1:4000/api/events
curl http://127.0.0.1:4000/api/incidents
```

## If port 4000 is already in use

```bash
ss -ltnp | grep ':4000'
```

Identify the process before stopping anything. If it is your existing project server, reuse it instead of starting a duplicate.

## Environment configuration

Backend: copy `backend/.env.example` to `backend/.env` if you need to change the port.
Frontend: `frontend/.env.example` documents the API base URL. For local development, the default is `http://127.0.0.1:4000`.

## Project structure

```text
enterprise-security-monitoring-complete/
├── backend/
│   ├── src/server.js
│   ├── src/data.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/components/
│   ├── src/App.jsx
│   ├── src/api.js
│   ├── src/main.jsx
│   ├── index.html
│   ├── package.json
│   └── .env.example
├── elastic/
│   └── README.md
├── suricata/
│   └── README.md
├── docs/
├── docker-compose.yml
└── README.md
```

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Service health |
| GET | `/api/metrics` | Summary metrics |
| GET | `/api/events` | Security events; optional `?severity=high` |
| GET | `/api/alerts` | Alerts derived from demo events |
| GET | `/api/incidents` | Incident queue |
| PATCH | `/api/incidents/:id` | Update incident status |

The API uses in-memory demo data. Incident changes reset when the backend restarts. Do not expose this demo API to the public internet.

## Optional Elastic Stack

Review `docker-compose.yml` and `elastic/README.md` before starting. Elasticsearch and Kibana are resource-intensive. The optional Compose configuration is for a local learning lab and uses single-node mode. It is not a production deployment or a hardened enterprise architecture.

## Security and limitations
- Use only systems and logs you own or are explicitly authorized to monitor.
- Keep intentionally vulnerable lab targets isolated on a host-only network.
- Demo events are synthetic and are not evidence of real incidents.
- No automatic host isolation or destructive response action is enabled.
- Before production use, add authentication, authorization, durable storage, TLS, secrets management, audit logging, input validation, rate limiting, and tested backups.
