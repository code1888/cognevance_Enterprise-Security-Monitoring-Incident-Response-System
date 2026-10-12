export default function SeverityBadge({ severity }) {
  return <span className={`severity-badge ${String(severity).toLowerCase()}`}>{severity}</span>;
}
