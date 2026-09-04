export default function DeviceTooltip({ device, compact = false }) {
  return (
    <div className={`device-tooltip ${compact ? 'device-tooltip-compact' : ''}`}>
      <p className="font-display text-sm text-milk">{device.name}</p>
      <p className="mt-0.5 text-[11px] text-turmeric-soft">{device.tagline}</p>
      <ul className="mt-2 space-y-1">
        {device.specs.map((s) => (
          <li key={s.label} className="text-[11px] leading-snug text-milk-dim">
            <span className="text-milk">{s.label}:</span> {s.value}
          </li>
        ))}
      </ul>
      <p className="mt-2 text-[11px] font-medium text-turmeric">{device.price}</p>
    </div>
  );
}
