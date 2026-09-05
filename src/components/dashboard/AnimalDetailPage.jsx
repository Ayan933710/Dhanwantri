import { useParams, Link } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { HERD, RECOMMENDATIONS, riskColor } from '../../data/herd.js';
import RiskBadge from './RiskBadge.jsx';
import RotatingAnimal from './RotatingAnimal.jsx';
import AnimatedChartTooltip, { AnimatedActiveDot } from '../shared/AnimatedChartTooltip.jsx';

export default function AnimalDetailPage() {
  const { species, animalId } = useParams();
  const animal = HERD.find((a) => a.id === animalId);
  const recommendation = RECOMMENDATIONS.find((r) => r.animalId === animalId);

  if (!animal) {
    return (
      <div className="rounded-xl border border-milk/10 bg-night-card/60 p-6 text-sm text-milk-dim">
        Couldn't find that animal.{' '}
        <Link to={`/dashboard/species/${species}`} className="text-sky-600 transition-colors hover:text-sky-700">
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

      <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]">
        <div className="animal-detail-model-box rounded-xl border border-milk/10 bg-night-card/40">
          <RotatingAnimal species={species} className="h-full w-full" />
        </div>

        <div className="min-w-0">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0">
              <h2 className="font-display text-3xl text-milk">{animal.name}</h2>
              <p className="text-sm text-milk-dim">
                {animal.id} · {animal.breed} · Lactation #{animal.lactation}
              </p>
            </div>
            <RiskBadge risk={animal.risk} size="lg" />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
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
            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-medium text-amber-700">
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
              <CartesianGrid stroke="#E2E8F0" vertical={false} />
              <XAxis dataKey="day" stroke="#64748B" fontSize={11} tickLine={false} />
              <YAxis stroke="#64748B" fontSize={11} tickLine={false} width={30} />
              <Tooltip
                content={<AnimatedChartTooltip />}
              />
              <Line
                type="monotone"
                dataKey="risk"
                stroke="#0EA5E9"
                strokeWidth={2}
                dot={false}
                activeDot={<AnimatedActiveDot />}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
