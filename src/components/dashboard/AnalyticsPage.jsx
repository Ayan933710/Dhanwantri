import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import { HERD, RISK_LEVELS, riskColor } from '../../data/herd.js';

function riskDistribution() {
  return RISK_LEVELS.map((level) => ({
    level,
    count: HERD.filter((a) => a.risk === level).length,
  }));
}

function speciesAverage() {
  const species = ['cow', 'buffalo', 'goat'];
  return species.map((s) => {
    const animals = HERD.filter((a) => a.species === s);
    const avg = animals.length
      ? Math.round(animals.reduce((sum, a) => sum + a.riskScore, 0) / animals.length)
      : 0;
    return { species: s, avgRisk: avg };
  });
}

function herdThiTrend() {
  // Synthetic 10-day shed heat-stress index trend for the demo.
  return Array.from({ length: 10 }, (_, i) => ({
    day: `D-${10 - i}`,
    thi: 58 + Math.round(Math.sin(i / 2) * 6 + i * 1.2),
  }));
}

const CARD = 'rounded-xl border border-milk/10 bg-night-card/60 p-5';

export default function AnalyticsPage() {
  const dist = riskDistribution();
  const speciesAvg = speciesAverage();
  const thi = herdThiTrend();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-milk">Analytics</h2>
        <p className="mt-1 text-sm text-milk-dim">Herd-wide trends across all connected devices.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className={`${CARD} min-w-0`}>
          <p className="mb-4 font-display text-lg text-milk">Risk distribution</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dist}
                  dataKey="count"
                  nameKey="level"
                  innerRadius={55}
                  outerRadius={85}
                  paddingAngle={3}
                >
                  {dist.map((d) => (
                    <Cell key={d.level} fill={riskColor[d.level]} stroke="none" />
                  ))}
                </Pie>
                <Legend
                  wrapperStyle={{ fontSize: 12, color: '#CFC9B8' }}
                  formatter={(v) => <span style={{ color: '#CFC9B8' }}>{v}</span>}
                />
                <Tooltip
                  contentStyle={{
                    background: '#1B2B25',
                    border: '1px solid #F6F2E71A',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${CARD} min-w-0`}>
          <p className="mb-4 font-display text-lg text-milk">Average risk by species</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={speciesAvg}>
                <CartesianGrid stroke="#F6F2E71A" vertical={false} />
                <XAxis dataKey="species" stroke="#CFC9B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#CFC9B8" fontSize={12} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    background: '#1B2B25',
                    border: '1px solid #F6F2E71A',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Bar dataKey="avgRisk" radius={[6, 6, 0, 0]} fill="#E3A23C" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={`${CARD} min-w-0 lg:col-span-2`}>
          <p className="mb-4 font-display text-lg text-milk">Shed Temperature-Humidity Index (THI)</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={thi}>
                <CartesianGrid stroke="#F6F2E71A" vertical={false} />
                <XAxis dataKey="day" stroke="#CFC9B8" fontSize={12} tickLine={false} />
                <YAxis stroke="#CFC9B8" fontSize={12} tickLine={false} width={30} />
                <Tooltip
                  contentStyle={{
                    background: '#1B2B25',
                    border: '1px solid #F6F2E71A',
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Line type="monotone" dataKey="thi" stroke="#4C8A68" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
