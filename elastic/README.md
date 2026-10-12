# Optional Elastic Stack Integration

The project currently uses synthetic events in its Express API. Elastic Stack is not automatically wired to the dashboard.

For a lab integration:
1. Start the optional Compose stack from the repository root after reviewing `docker-compose.yml`.
2. Open Kibana at `http://localhost:5601` after the service reports healthy.
3. Configure an authorized event source (Elastic Agent/Filebeat) and ingest a small test log set.
4. Verify documents in Kibana Discover and build a data view.
5. Configure and test detection rules for your lab data.
6. Implement a backend adapter that queries Elasticsearch using a server-side credential stored outside source control.
7. Replace demo endpoints only after validating schema, time ranges, error handling, and authorization.

Do not expose Elasticsearch directly to browsers. Keep credentials server-side. The Compose stack is for a local learning lab, not production.
