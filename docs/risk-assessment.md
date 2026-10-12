# Risk Assessment Template

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Monitoring gaps | Medium | High | Inventory sources; monitor collector health |
| False positives | Medium | Medium | Tune rules; track precision and analyst feedback |
| Unauthorized dashboard access | Medium | High | Authentication, RBAC, TLS, session controls |
| Log tampering or loss | Low/Medium | High | Centralized storage, access controls, retention and backups |
| Exposed lab target | Medium | High | Host-only network, no public port forwarding |
| Automated response disrupts service | Low/Medium | High | Human approval, dry-run mode, rollback and audit trail |

Risk ratings are illustrative and must be recalculated for the actual environment.
