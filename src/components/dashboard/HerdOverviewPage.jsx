import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { HERD, riskColor } from '../../data/herd.js';
import RiskBadge from './RiskBadge.jsx';

function StatCard({ label, value, sub }) {
  return (
    <div className="rounded-xl border border-milk/10 bg-night-card/60 p-5">
      <p className="text-xs text-milk-dim">{label}</p>
      <p className="mt-2 font-display text-3xl text-milk">{value}</p>
      {sub && <p className="mt-1 text-xs text-milk-dim">{sub}</p>}
    </div>
  );
}

function HerdCard({ animal }) {
  return (
    <Link
      to={`/dashboard/species/${animal.species}/${animal.id}`}
      className="focus-ring flex min-w-0 flex-col justify-between rounded-xl border border-milk/10 bg-night-card/60 p-4 transition hover:border-turmeric/40"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-display text-base text-milk">{animal.name}</p>
          <p className="text-xs capitalize text-milk-dim">
            {animal.species} · {animal.id}
          </p>
        </div>
        <div
          className="grid h-10 w-10 place-items-center rounded-full text-xs font-semibold"
          style={{
            color: riskColor[animal.risk],
            border: `1px solid ${riskColor[animal.risk]}55`,
          }}
        >
          {animal.riskScore}%
        </div>
      </div>
      <div className="mt-4">
        <RiskBadge risk={animal.risk} />
      </div>
    </Link>
  );
}

export default function HerdOverviewPage() {
  const highRisk = HERD.filter((a) => a.risk === 'High Risk' || a.risk === 'Moderate Risk').sort(
    (a, b) => b.riskScore - a.riskScore
  );
  const avgRisk = Math.round(HERD.reduce((s, a) => s + a.riskScore, 0) / HERD.length);

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Herd size" value={HERD.length} sub="across 3 species" />
        <StatCard
          label="High risk now"
          value={HERD.filter((a) => a.risk === 'High Risk').length}
          sub="needs vet attention"
        />
        <StatCard label="Average risk score" value={`${avgRisk}%`} sub="herd-wide" />
        <StatCard label="Gateway uptime" value="99.4%" sub="last 30 days" />
      </div>

      {/* Live herd review strip */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-xl text-milk">Live Herd Review</h2>
          <span className="text-xs text-milk-dim">Updated moments ago</span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {HERD.map((animal) => (
            <motion.div
              key={animal.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
            >
              <HerdCard animal={animal} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* High risk board */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-milk">High Risk Board</h2>
          <span className="text-xs text-milk-dim">{highRisk.length} animals flagged</span>
        </div>

        {highRisk.length === 0 ? (
          <p className="rounded-xl border border-milk/10 bg-night-card/60 p-6 text-sm text-milk-dim">
            No moderate or high risk animals right now.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-milk/10">
            <table className="min-w-[680px] w-full text-left text-sm">
              <thead className="bg-night-card/80 text-xs uppercase tracking-wide text-milk-dim">
                <tr>
                  <th className="px-4 py-3 font-medium">Animal</th>
                  <th className="px-4 py-3 font-medium">Species</th>
                  <th className="px-4 py-3 font-medium">Risk</th>
                  <th className="px-4 py-3 font-medium">Score</th>
                  <th className="px-4 py-3 font-medium">Rumination Δ</th>
                  <th className="px-4 py-3 font-medium" />
                </tr>
              </thead>
              <tbody>
                {highRisk.map((a) => (
                  <tr key={a.id} className="border-t border-milk/10 hover:bg-milk/5">
                    <td className="px-4 py-3 font-display text-milk">
                      {a.name} <span className="text-milk-dim">· {a.id}</span>
                    </td>
                    <td className="px-4 py-3 capitalize text-milk-dim">{a.species}</td>
                    <td className="px-4 py-3">
                      <RiskBadge risk={a.risk} />
                    </td>
                    <td className="px-4 py-3 text-milk">{a.riskScore}%</td>
                    <td className="px-4 py-3 text-milk-dim">{a.rumination}%</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/dashboard/species/${a.species}/${a.id}`}
                        className="focus-ring text-xs font-medium text-turmeric hover:text-turmeric-soft"
                      >
                        View →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
