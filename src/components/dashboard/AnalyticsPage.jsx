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
import { motion } from 'framer-motion';
import { HERD, RISK_LEVELS, riskColor } from '../../data/herd.js';
import AnimatedChartTooltip, { AnimatedActiveDot } from '../shared/AnimatedChartTooltip.jsx';
import InteractiveCard from '../shared/InteractiveCard.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

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
  // Synthetic 30-day shed heat-stress index trend for the demo.
  return Array.from({ length: 30 }, (_, i) => ({
    day: `D-${i + 1}`,
    thi: 58 + Math.round(Math.sin(i / 2) * 6 + i * 1.2),
  }));
}

const CARD = 'rounded-xl border border-slate-200 bg-theme-bg-card p-5 shadow-sm';
const chartGroupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.12 } },
};

export default function AnalyticsPage() {
  const { t } = useLanguage();
  const dist = riskDistribution();
  const speciesAvg = speciesAverage();
  const thi = herdThiTrend();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="font-display text-2xl text-theme-text-dark">Analytics</h2>
        <p className="mt-1 text-sm text-theme-text-muted">{t('herdTrends')}</p>
      </div>

      <motion.div
        variants={chartGroupVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-6 lg:grid-cols-2"
      >
        <InteractiveCard className={`${CARD} min-w-0`}>
          <p className="mb-4 font-display text-lg text-theme-text-dark">{t('riskDistribution')}</p>
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
                  wrapperStyle={{ fontSize: 12, color: '#64748B' }}
                  formatter={(v) => <span style={{ color: '#64748B' }}>{v}</span>}
                />
                <Tooltip
                  content={<AnimatedChartTooltip />}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </InteractiveCard>

        <InteractiveCard className={`${CARD} min-w-0`}>
          <p className="mb-4 font-display text-lg text-theme-text-dark">{t('averageRisk')}</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={speciesAvg}>
                <CartesianGrid stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="species" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} width={30} />
                <Tooltip
                  content={<AnimatedChartTooltip />}
                />
                <Bar dataKey="avgRisk" radius={[6, 6, 0, 0]} fill="#0EA5E9" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </InteractiveCard>

        <InteractiveCard className={`${CARD} min-w-0 lg:col-span-2`}>
          <p className="mb-4 font-display text-lg text-theme-text-dark">{t('thi')}</p>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={thi}>
                <CartesianGrid stroke="#E2E8F0" vertical={false} />
                <XAxis dataKey="day" stroke="#64748B" fontSize={12} tickLine={false} />
                <YAxis stroke="#64748B" fontSize={12} tickLine={false} width={30} />
                <Tooltip
                  content={<AnimatedChartTooltip />}
                />
                <Line
                  type="monotone"
                  dataKey="thi"
                  stroke="#0EA5E9"
                  strokeWidth={2}
                  dot={false}
                  activeDot={<AnimatedActiveDot />}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </InteractiveCard>
      </motion.div>
    </div>
  );
}
