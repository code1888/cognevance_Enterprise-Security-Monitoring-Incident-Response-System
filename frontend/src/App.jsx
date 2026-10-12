import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity, Bell, ChevronDown, CircleHelp, Clock3, LayoutDashboard,
  ListFilter, Menu, RefreshCw, Search, Shield, ShieldCheck, Siren,
  Wifi, WifiOff, X, ClipboardList, Network
} from "lucide-react";
import { getHealth, getMetrics, getEvents, getIncidents, updateIncident } from "./api.js";
import StatCard from "./components/StatCard.jsx";
import SeverityBadge from "./components/SeverityBadge.jsx";

const navItems = [
  { id: "dashboard", label: "Overview", icon: LayoutDashboard },
  { id: "events", label: "Security events", icon: Activity },
  { id: "incidents", label: "Incident response", icon: ClipboardList }
];

function formatTime(value) {
  if (!value) return "—";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [health, setHealth] = useState("checking");
  const [metrics, setMetrics] = useState(null);
  const [events, setEvents] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [severity, setSeverity] = useState("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [mobileNav, setMobileNav] = useState(false);
  const [updatingId, setUpdatingId] = useState("");

  const refresh = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [h, m, e, i] = await Promise.all([
        getHealth(), getMetrics(), getEvents(severity), getIncidents()
      ]);
      setHealth(h.status === "ok" ? "online" : "offline");
      setMetrics(m);
      setEvents(e.items || []);
      setIncidents(i.items || []);
    } catch (err) {
      setHealth("offline");
      setError(`${err.message}. Check that the backend is running on port 4000.`);
    } finally {
      setLoading(false);
    }
  }, [severity]);

  useEffect(() => { refresh(); }, [refresh]);

  const filteredEvents = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return events;
    return events.filter((event) =>
      [event.title, event.asset, event.sourceIp, event.source, event.severity]
        .some((value) => String(value || "").toLowerCase().includes(term))
    );
  }, [events, search]);

  async function changeIncident(id, status) {
    setUpdatingId(id);
    try {
      await updateIncident(id, status);
      const result = await getIncidents();
      setIncidents(result.items || []);
    } catch (err) {
      setError(`Could not update incident: ${err.message}`);
    } finally {
      setUpdatingId("");
    }
  }

  const openIncidents = incidents.filter((incident) => incident.status !== "Resolved").length;
  const criticalCount = metrics?.severityCounts?.critical ?? 0;
  const highCount = metrics?.severityCounts?.high ?? 0;

  return (
    <div className="app-shell">
      <aside className={`sidebar ${mobileNav ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={24} /></div>
          <div><strong>Sentinel<span>SOC</span></strong><small>SECURITY OPERATIONS</small></div>
          <button className="icon-button mobile-close" aria-label="Close menu" onClick={() => setMobileNav(false)}><X size={18} /></button>
        </div>
        <div className="workspace-label">WORKSPACE</div>
        <nav className="nav-list" aria-label="Main navigation">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button key={id} className={`nav-item ${page === id ? "active" : ""}`}
              onClick={() => { setPage(id); setMobileNav(false); }}>
              <Icon size={18} /><span>{label}</span>
              {id === "incidents" && <span className="nav-count">{openIncidents}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="lab-card">
            <div className="lab-card-title"><Shield size={16} /> Lab environment</div>
            <p>Sample telemetry is enabled. Connect a SIEM to monitor real events.</p>
            <span className="demo-chip"><span className="pulse-dot" /> DEMO MODE</span>
          </div>
          <div className="user-row">
            <div className="avatar">SA</div><div className="user-meta"><strong>SOC Analyst</strong><small>Local workspace</small></div>
            <ChevronDown size={15} className="muted" />
          </div>
        </div>
      </aside>

      {mobileNav && <button className="mobile-scrim" aria-label="Close navigation" onClick={() => setMobileNav(false)} />}

      <main className="main-area">
        <header className="topbar">
          <div className="topbar-left">
            <button className="icon-button mobile-menu" aria-label="Open menu" onClick={() => setMobileNav(true)}><Menu size={20} /></button>
            <div className="breadcrumb">Security Operations <span>/</span> <strong>{navItems.find((item) => item.id === page)?.label}</strong></div>
          </div>
          <div className="topbar-actions">
            <span className={`connection-pill ${health}`}><span className="status-dot" />{health === "online" ? "API connected" : health === "checking" ? "Connecting…" : "API offline"}</span>
            <button className="icon-button" aria-label="Refresh data" title="Refresh data" onClick={refresh}><RefreshCw size={17} className={loading ? "spin" : ""} /></button>
            <button className="icon-button help-button" aria-label="Help" title="Project information" onClick={() => window.alert("Sentinel SOC is a learning dashboard. Sample events are synthetic until connected to authorized telemetry.")}><CircleHelp size={18} /></button>
          </div>
        </header>

        <div className="content">
          <div className="page-heading">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> SECURITY MONITORING PLATFORM</div>
              <h1>{page === "dashboard" ? "Security overview" : page === "events" ? "Security events" : "Incident response"}</h1>
              <p>{page === "dashboard" ? "Monitor your environment and triage events from one workspace." : page === "events" ? "Review, filter, and investigate collected security events." : "Track incident ownership, investigation, and resolution."}</p>
            </div>
            <button className="primary-button" onClick={refresh}><RefreshCw size={16} /> Refresh data</button>
          </div>

          <div className="demo-banner"><div className="demo-banner-icon"><CircleHelp size={18} /></div><div><strong>Demo data is active</strong><p>These events are synthetic examples for project demonstration, not live attack detections.</p></div><span className="demo-banner-tag">LEARNING LAB</span></div>

          {error && <div className="error-banner" role="alert"><WifiOff size={17} /><span>{error}</span><button onClick={refresh}>Retry</button></div>}

          {page === "dashboard" && <>
            <div className="section-heading"><div><h2>Environment at a glance</h2><p>Current summary from the project API</p></div><span className="updated-label"><Clock3 size={14} /> {loading ? "Updating…" : "Refresh to update"}</span></div>
            <div className="stats-grid">
              <StatCard type="events" label="Security events" value={metrics?.totalEvents ?? "—"} note="Events in demo feed" />
              <StatCard type="critical" label="Critical events" value={criticalCount} note="Require prompt review" />
              <StatCard type="high" label="High severity" value={highCount} note="Prioritize for triage" />
              <StatCard type="incidents" label="Open incidents" value={metrics ? openIncidents : "—"} note="Not yet resolved" />
            </div>
            <div className="dashboard-grid">
              <section className="panel events-panel">
                <div className="panel-header"><div><h2>Recent security events</h2><p>Latest records from the API</p></div><button className="text-button" onClick={() => setPage("events")}>View all <span>→</span></button></div>
                <EventTable events={events.slice(0, 5)} />
              </section>
              <section className="panel incident-panel">
                <div className="panel-header"><div><h2>Incident queue</h2><p>Prioritized analyst work</p></div><button className="icon-button" aria-label="View incidents" onClick={() => setPage("incidents")}><ClipboardList size={17} /></button></div>
                <div className="incident-list">
                  {incidents.slice(0, 4).map((incident) => <div className="incident-row" key={incident.id}>
                    <div className={`incident-severity ${incident.severity}`} />
                    <div className="incident-info"><strong>{incident.title}</strong><span>{incident.id} · {incident.asset}</span></div>
                    <SeverityBadge severity={incident.severity} />
                  </div>)}
                  {!incidents.length && <EmptyState text="No incidents returned by the API." />}
                </div>
                <button className="full-width-button" onClick={() => setPage("incidents")}>Open incident queue <span>→</span></button>
              </section>
            </div>
            <section className="panel source-panel">
              <div className="panel-header"><div><h2>Monitoring sources</h2><p>Planned integrations for the lab</p></div><span className="planned-chip">INTEGRATION STATUS</span></div>
              <div className="source-grid">
                <SourceCard icon={<Network size={19} />} name="Network IDS" detail="Suricata event ingestion" status="Not connected" />
                <SourceCard icon={<Activity size={19} />} name="SIEM / Elastic" detail="Search and correlate events" status="Not connected" />
                <SourceCard icon={<Shield size={19} />} name="Endpoint logs" detail="Authorized host telemetry" status="Not connected" />
              </div>
            </section>
          </>}

          {page === "events" && <section className="panel full-panel">
            <div className="panel-header"><div><h2>Security event stream</h2><p>{filteredEvents.length} records shown · synthetic lab feed</p></div><span className="live-indicator"><span className="pulse-dot" /> API DATA</span></div>
            <div className="table-toolbar">
              <div className="search-box"><Search size={16} /><input aria-label="Search events" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search event, asset, source IP…" /></div>
              <label className="filter-box"><ListFilter size={16} /><select aria-label="Filter by severity" value={severity} onChange={(event) => setSeverity(event.target.value)}><option value="all">All severities</option><option value="critical">Critical</option><option value="high">High</option><option value="medium">Medium</option><option value="low">Low</option></select></label>
            </div>
            <EventTable events={filteredEvents} />
          </section>}

          {page === "incidents" && <section className="panel full-panel">
            <div className="panel-header"><div><h2>Incident management</h2><p>Update workflow status for each demo incident.</p></div><span className="planned-chip">{openIncidents} OPEN / ACTIVE</span></div>
            <div className="incident-table">
              {incidents.map((incident) => <article className="incident-card" key={incident.id}>
                <div className="incident-card-top"><div><span className="incident-id">{incident.id}</span><h3>{incident.title}</h3></div><SeverityBadge severity={incident.severity} /></div>
                <div className="incident-meta"><span><Network size={14} /> {incident.asset}</span><span><Clock3 size={14} /> {formatTime(incident.createdAt)}</span><span>Event: {incident.eventId}</span></div>
                <p className="incident-notes">{incident.notes}</p>
                <div className="incident-card-bottom"><span className={`status-label ${incident.status.toLowerCase()}`}>{incident.status}</span><label className="status-select-label">Update status <select value={incident.status} disabled={updatingId === incident.id} onChange={(event) => changeIncident(incident.id, event.target.value)}><option>Open</option><option>Investigating</option><option>Resolved</option></select></label></div>
              </article>)}
              {!incidents.length && <EmptyState text="No incidents returned by the API." />}
            </div>
          </section>}

          <footer className="footer"><span><ShieldCheck size={14} /> Sentinel SOC learning project</span><span><span className="footer-dot" /> {health === "online" ? "API reachable" : "API connection needs attention"}</span><span>Use authorized lab telemetry only.</span></footer>
        </div>
      </main>
    </div>
  );
}

function EventTable({ events }) {
  if (!events.length) return <EmptyState text="No events match the current filters." />;
  return <div className="table-scroll"><table className="events-table"><thead><tr><th>Event</th><th>Severity</th><th>Source IP</th><th>Asset</th><th>Time</th></tr></thead><tbody>
    {events.map((event) => <tr key={event.id}><td><div className="event-title"><span className={`event-dot ${event.severity}`} /><div><strong>{event.title}</strong><small>{event.source} · {event.id}</small></div></div></td><td><SeverityBadge severity={event.severity} /></td><td className="mono">{event.sourceIp}</td><td>{event.asset}</td><td className="time-cell">{formatTime(event.timestamp)}</td></tr>)}
  </tbody></table></div>;
}

function SourceCard({ icon, name, detail, status }) {
  return <div className="source-card"><div className="source-icon">{icon}</div><div className="source-copy"><strong>{name}</strong><span>{detail}</span><small><span className="source-status-dot" />{status}</small></div></div>;
}

function EmptyState({ text }) {
  return <div className="empty-state"><Siren size={22} /><p>{text}</p></div>;
}
