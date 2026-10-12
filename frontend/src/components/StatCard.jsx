import { Activity, AlertTriangle, ShieldAlert, ClipboardList } from "lucide-react";

const icons = {
  events: Activity,
  critical: ShieldAlert,
  high: AlertTriangle,
  incidents: ClipboardList
};

export default function StatCard({ type, label, value, note }) {
  const Icon = icons[type] || Activity;
  return (
    <article className="stat-card">
      <div className={`stat-icon ${type}`}><Icon size={19} /></div>
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value ?? "—"}</div>
      <div className="stat-note">{note}</div>
    </article>
  );
}
