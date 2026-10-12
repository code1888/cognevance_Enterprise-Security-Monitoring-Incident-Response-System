# Detection Workflow

1. Collect authorized endpoint, authentication, firewall, and IDS telemetry.
2. Normalize timestamps, host identifiers, source/destination IPs, and event categories.
3. Apply documented detection rules to indexed events.
4. Correlate signals across hosts and time windows; check for false positives.
5. Assign severity using impact, confidence, asset criticality, and evidence.
6. Preserve relevant logs and record the analyst's rationale.

## Example detections to validate in an isolated lab
- Repeated authentication failures from one source within a time window.
- A Suricata signature alert for a controlled test event.
- New or unexpected service exposure on a lab asset.
- Endpoint process activity that violates a documented baseline.

Do not treat the synthetic dashboard events as actual detections. Production rules should be tested, tuned, reviewed, and mapped to a documented threat model.
