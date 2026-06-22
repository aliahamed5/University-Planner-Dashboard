export default function StatCard({ icon: Icon, title, value, subtitle, colorClass }) {
  return (
    <div className="bg-[var(--bg-secondary)] p-5 rounded-2xl border border-[var(--border-color)] flex items-center gap-4 transition-all hover:shadow-md">
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${colorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <h3 className="text-sm font-medium text-[var(--text-secondary)]">{title}</h3>
        <div className="text-2xl font-bold text-[var(--text-primary)] mt-1">{value}</div>
        <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
      </div>
    </div>
  );
}
