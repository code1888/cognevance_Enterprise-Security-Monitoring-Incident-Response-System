# Security Architecture

## Learning-lab data flow

Authorized endpoints and lab network devices → log shippers / Suricata → Elastic ingestion → Elasticsearch → Kibana and detection rules → alert review → incident response workflow → analyst dashboard/report.

The included React dashboard currently reads a local Express API populated with synthetic demo records. It is not yet connected to Elasticsearch.

## Trust boundaries
- Keep the vulnerable target and attacker VM on an isolated host-only network.
- Bind the demo API to loopback for local development.
- Do not expose Elasticsearch, Kibana, or the demo API directly to the public internet.
- Use least privilege for collectors and dashboards.
- In a real deployment, require authentication, authorization, TLS, audit trails, secret management, retention policy, and backups.

## Components
- React/Vite: analyst user interface.
- Express: demo API and incident workflow.
- Elasticsearch: indexed event storage (optional lab).
- Kibana: search, visualizations, and detection rules.
- Suricata: network IDS event source.
