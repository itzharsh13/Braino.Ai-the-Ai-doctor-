import React from 'react';

const stats = [
  { value: '24/7', label: 'AI Support' },
  { value: '150+', label: 'Resources' },
  { value: '100%', label: 'Private' },
  { value: 'CBT', label: 'Evidence-based' },
];

export default function StatsRow() {
  return (
    <div className="stats-row">
      {stats.map((s) => (
        <div key={s.label} className="stat-card">
          <span className="stat-card__value">{s.value}</span>
          <span className="stat-card__label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}
