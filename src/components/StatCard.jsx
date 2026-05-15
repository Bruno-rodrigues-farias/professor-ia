export default function StatCard({ title, value, icon, color }) {
  return (
    <div className="stat-card">
      <div className="stat-icon" style={{ background: color }}>
        {icon}
      </div>
      <div>
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
}