import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { HERD, RECOMMENDATIONS, riskColor } from '../../data/herd.js';
import RiskBadge from './RiskBadge.jsx';
import RotatingAnimal from './RotatingAnimal.jsx';

export default function AnimalDetailPage() {
  const { species, animalId } = useParams();
  const animal = HERD.find((a) => a.id === animalId);
  const recommendation = RECOMMENDATIONS.find((r) => r.animalId === animalId);

  if (!animal) {
    return (
      <div className="rounded-xl border border-milk/10 bg-night-card/60 p-6 text-sm text-milk-dim">
        Couldn't find that animal.{' '}
        <Link to={`/dashboard/species/${species}`} className="text-turmeric">
          Back to {species} list
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <Link
        to={`/dashboard/species/${species}`}
        className="focus-ring text-xs text-milk-dim hover:text-milk"
      >
        ← Back to {species}s
      </Link>

      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-xl border border-milk/10 bg-night-card/40">
          <RotatingAnimal species={species} className="h-80 w-full" />
        </div>

        <div>
          <div className="flex items-start justify-between">
            <div>
              <h2 className="font-display text-3xl text-milk">{animal.name}</h2>
              <p className="text-sm text-milk-dim">
                {animal.id} · {animal.breed} · Lactation #{animal.lactation}
              </p>
            </div>
            <RiskBadge risk={animal.risk} size="lg" />
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="rounded-lg border border-milk/10 bg-night-card/60 p-3 text-center">
              <p className="text-xs text-milk-dim">Risk score</p>
              <p
                className="mt-1 font-display text-2xl"
                style={{ color: riskColor[animal.risk] }}
              >
                {animal.riskScore}%
              </p>
            </div>
            <div className="rounded-lg border border-milk/10 bg-night-card/60 p-3 text-center">
              <p className="text-xs text-milk-dim">Rumination Δ</p>
              <p className="mt-1 font-display text-2xl text-milk">{animal.rumination}%</p>
            </div>
            <div className="rounded-lg border border-milk/10 bg-night-card/60 p-3 text-center">
              <p className="text-xs text-milk-dim">Shed THI</p>
              <p className="mt-1 font-display text-2xl text-milk">{animal.thi}</p>
            </div>
          </div>

          {/* Quarter-level readings */}
          <div className="mt-6">
            <p className="mb-2 text-xs uppercase tracking-wide text-milk-dim">
              Quarter-level readings
            </p>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {animal.quarters.map((q) => (
                <div
                  key={q.quarter}
                  className="rounded-lg border border-milk/10 bg-night-card/60 p-3"
                >
                  <p className="font-display text-sm text-milk">{q.quarter}</p>
                  <p className="mt-1 text-xs text-milk-dim">EC +{q.ecDelta}%</p>
                  <p className="text-xs text-milk-dim">Temp +{q.tempDelta}°C</p>
                  <p className="text-xs text-milk-dim">Yield -{q.yieldDrop}%</p>
                </div>
              ))}
            </div>
          </div>

          {recommendation && (
            <div className="mt-6 rounded-lg border border-turmeric/30 bg-turmeric/10 p-4">
              <p className="text-xs font-medium text-turmeric">
                Recommended action · {recommendation.profile}
              </p>
              <p className="mt-1 text-sm text-milk">{recommendation.action}</p>
            </div>
          )}
        </div>
      </div>

      {/* Risk trend */}
      <div className="rounded-xl border border-milk/10 bg-night-card/60 p-5">
        <p className="mb-4 font-display text-lg text-milk">14-day risk trend</p>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animal.trend}>
              <CartesianGrid stroke="#F6F2E71A" vertical={false} />
              <XAxis dataKey="day" stroke="#CFC9B8" fontSize={11} tickLine={false} />
              <YAxis stroke="#CFC9B8" fontSize={11} tickLine={false} width={30} />
              <Tooltip
                contentStyle={{
                  background: '#1B2B25',
                  border: '1px solid #F6F2E71A',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#E3A23C"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
