# Security Hardening Checklist

- [ ] Bind development services to loopback unless access is explicitly required.
- [ ] Restrict management ports to an approved management network.
- [ ] Enable TLS for traffic crossing trust boundaries.
- [ ] Enforce authentication and role-based authorization.
- [ ] Store secrets in a secret manager or protected environment; never commit them.
- [ ] Validate input and limit request size/rate.
- [ ] Configure log retention, access controls, backups, and time synchronization.
- [ ] Patch the OS, Node.js dependencies, Elastic Stack, and IDS signatures.
- [ ] Test restore procedures and alert delivery.
- [ ] Require approval for containment actions and keep a complete audit trail.
- [ ] Keep vulnerable targets isolated from production and the public internet.
