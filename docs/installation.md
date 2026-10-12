# Installation and Verification

## Kali Linux
Install a supported Node.js release and npm using your preferred trusted package source. Check:

```bash
node --version
npm --version
```

Backend:

```bash
cd backend
npm install
npm start
```

Frontend in another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Checks

```bash
curl -sS http://127.0.0.1:4000/api/health
curl -sS http://127.0.0.1:4000/api/metrics
curl -sS http://127.0.0.1:4000/api/events
curl -sS http://127.0.0.1:4000/api/incidents
```

Expected: health returns `status: ok`, and the other endpoints return demo data.

If a port is occupied, inspect it before terminating a process:

```bash
ss -ltnp | grep -E ':(4000|5173)\\b'
```

The backend binds to `127.0.0.1` intentionally. For remote access, configure authentication, TLS, and network controls before changing bind addresses.
