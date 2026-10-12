# Suricata Lab Integration

1. Install Suricata using your distribution's trusted package manager.
2. Use it only on an interface and network you are authorized to monitor.
3. Keep the vulnerable lab network isolated.
4. Validate configuration before restart with the supported Suricata config-test command for your installed version.
5. Review `eve.json` for generated events and forward them using an authorized log collector.
6. Verify parsed fields and timestamps in your SIEM before writing detections.

Suricata is not enabled automatically by this web project. Avoid copying example interface names or production rules without adapting them to your lab.
