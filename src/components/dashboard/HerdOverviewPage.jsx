import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Plus, X } from 'lucide-react';
import { HERD, riskColor } from '../../data/herd.js';
import RiskBadge from './RiskBadge.jsx';
import InteractiveCard from '../shared/InteractiveCard.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

const cardGroupVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

function StatCard({ label, value, sub, to }) {
  return (
    <InteractiveCard className="rounded-xl">
      <Link
        to={to}
        className="focus-ring block rounded-xl border border-slate-200 bg-theme-bg-card p-5 shadow-sm transition-shadow hover:border-sky-300 hover:shadow-[0_16px_36px_rgba(14,165,233,0.12)]"
        aria-label={`${label}: ${value}. Open details`}
      >
        <p className="text-xs text-milk-dim">{label}</p>
        <p className="mt-2 font-display text-3xl text-milk">{value}</p>
        {sub && <p className="mt-1 text-xs text-milk-dim">{sub}</p>}
      </Link>
    </InteractiveCard>
  );
}

function HerdCard({ animal }) {
  return (
    <InteractiveCard className="rounded-xl">
      <Link
        to={`/dashboard/species/${animal.species}/${animal.id}`}
        className="focus-ring flex min-h-[138px] min-w-0 flex-col justify-between rounded-xl border border-slate-200 bg-theme-bg-card p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 hover:bg-sky-50/50 hover:shadow-[0_12px_30px_rgba(14,165,233,0.12)]"
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
    </InteractiveCard>
  );
}

const EMPTY_FORM = {
  species: 'cow',
  name: '',
  id: '',
  breed: '',
  age: '',
  ownerId: '',
};

function ManualAnimalModal({ onClose, onAdd, existingIds }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [error, setError] = useState('');
  const { t } = useLanguage();

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (existingIds.includes(form.id.trim().toLowerCase())) {
      setError(t('duplicateId'));
      return;
    }
    onAdd({
      ...form,
      name: form.name.trim(),
      id: form.id.trim().toUpperCase(),
      breed: form.breed.trim(),
      age: Number(form.age),
      risk: 'No Risk',
      riskScore: 0,
      rumination: 0,
      thi: 0,
      quarters: [],
      trend: [],
    });
  }

  return (
    <div className="dashboard-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="manual-animal-title"
        className="dashboard-modal"
        initial={{ opacity: 0, y: 18, scale: .97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.16em] text-pasture">{t('newHerdRecord')}</p>
            <h2 id="manual-animal-title" className="mt-1 font-display text-2xl text-milk">{t('addAnimal')}</h2>
            <p className="mt-2 text-sm text-milk-dim">Enter the profile details to place this animal in your live herd view.</p>
          </div>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close add animal dialog">
            <X size={18} />
          </button>
        </div>

        <form className="dashboard-animal-form" onSubmit={handleSubmit}>
          <label><span>{t('animalType')}</span><select name="species" value={form.species} onChange={updateField}><option value="cow">Cow</option><option value="buffalo">Buffalo</option><option value="goat">Goat</option></select></label>
          <label><span>{t('name')}</span><input name="name" value={form.name} onChange={updateField} placeholder="e.g. Ganga" required /></label>
          <label><span>{t('animalId')}</span><input name="id" value={form.id} onChange={updateField} placeholder="e.g. C-142" required /></label>
          <label><span>{t('breed')}</span><input name="breed" value={form.breed} onChange={updateField} placeholder="e.g. Sahiwal Cross" required /></label>
          <label><span>{t('age')}</span><input name="age" type="number" min="0" max="30" value={form.age} onChange={updateField} required /></label>
          <label><span>{t('ownerId')}</span><input name="ownerId" value={form.ownerId} onChange={updateField} placeholder="e.g. OWN-204" required /></label>
          {error && <p className="dashboard-form-error" role="alert">{error}</p>}
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="dashboard-secondary-button" onClick={onClose}>{t('cancel')}</button>
            <button type="submit" className="dashboard-primary-button"><Plus size={16} /> {t('addToHerd')}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default function HerdOverviewPage() {
    const { t } = useLanguage();
  const [addedAnimals, setAddedAnimals] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const animals = [...HERD, ...addedAnimals];
  const highRisk = animals.filter((a) => a.risk === 'High Risk' || a.risk === 'Moderate Risk').sort(
    (a, b) => b.riskScore - a.riskScore
  );
  const avgRisk = Math.round(animals.reduce((s, a) => s + a.riskScore, 0) / animals.length);

  function addAnimal(animal) {
    setAddedAnimals((current) => [...current, animal]);
    setIsModalOpen(false);
  }

  return (
    <div className="space-y-10">
      <section className="dashboard-intro">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-pasture">{t('todayInHerd')}</p>
          <h1 className="mt-2 font-display text-3xl text-milk md:text-4xl">{t('earlierSignal')}</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-milk-dim">
            {t('liveReadings')}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <button type="button" className="dashboard-primary-button" onClick={() => setIsModalOpen(true)}>
            <Plus size={17} /> {t('addAnimal')}
          </button>
          <div className="dashboard-intro-mark" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
        </div>
      </section>
      <motion.div
        variants={cardGroupVariants}
        initial="hidden"
        animate="visible"
        className="dashboard-stat-grid grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        <StatCard label={t('herdSize')} value={animals.length} sub={t('acrossSpecies')} to="/dashboard/species/cow" />
        <StatCard
          label="High risk now"
            value={animals.filter((a) => a.risk === 'High Risk').length}
          sub={t('needsVet')}
          to="/dashboard/predictions"
        />
        <StatCard label={t('averageRiskScore')} value={`${avgRisk}%`} sub={t('herdWide')} to="/dashboard/analytics" />
        <StatCard label={t('gatewayUptime')} value="99.4%" sub={t('last30Days')} to="/dashboard/analytics" />
      </motion.div>

      {/* Live herd review strip */}
      <section className="dashboard-review-section rounded-2xl p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-xl text-milk">{t('liveHerdReview')}</h2>
          <span className="text-xs text-milk-dim">{t('updatedMoments')}</span>
        </div>
        <motion.div
          variants={cardGroupVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {animals.map((animal) => (
            <HerdCard key={animal.id} animal={animal} />
          ))}
        </motion.div>
      </section>

      {/* High risk board */}
      <section className="dashboard-risk-section rounded-2xl p-4 sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl text-milk">{t('highRiskBoard')}</h2>
          <span className="text-xs text-milk-dim">{highRisk.length} {t('animalsFlagged')}</span>
        </div>

        {highRisk.length === 0 ? (
          <p className="rounded-xl border border-milk/10 bg-night-card/60 p-6 text-sm text-milk-dim">
            {t('noRiskAnimals')}
          </p>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-milk/10">
            <table className="min-w-[680px] w-full text-left text-sm">
              <thead className="high-risk-table-head text-xs uppercase tracking-wide text-milk-dim">
                <tr>
                  <th className="px-4 py-3 font-medium">{t('animal')}</th>
                  <th className="px-4 py-3 font-medium">{t('species')}</th>
                  <th className="px-4 py-3 font-medium">{t('risk')}</th>
                  <th className="px-4 py-3 font-medium">{t('score')}</th>
                  <th className="px-4 py-3 font-medium">{t('rumination')}</th>
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
                        className="focus-ring text-xs font-medium text-sky-600 transition-colors hover:text-sky-700"
                      >
                        {t('view')} →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <AnimatePresence>
        {isModalOpen && (
          <ManualAnimalModal
            onClose={() => setIsModalOpen(false)}
            onAdd={addAnimal}
            existingIds={animals.map((animal) => animal.id.toLowerCase())}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
