# Incident Response Workflow

1. **Triage:** validate the alert, timeframe, affected asset, and data source.
2. **Scope:** correlate related logs and determine whether additional systems are affected.
3. **Contain:** follow an approved playbook; get authorization before disruptive actions.
4. **Eradicate:** remove confirmed cause and close the exploited weakness.
5. **Recover:** restore services and verify monitoring coverage.
6. **Lessons learned:** document timeline, evidence, impact, root cause, and follow-up actions.

## Minimum incident record
- Incident ID and title
- Detection source and event IDs
- Severity and confidence
- Affected assets and timestamps
- Evidence references and analyst notes
- Actions taken, approvals, and outcome
- Recovery checks and lessons learned

The sample API stores incidents in memory; changes are lost when the server restarts. Use a database and an auditable event history before any real operational use.
