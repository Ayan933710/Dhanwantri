import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HERD } from '../../data/herd.js';
import RiskBadge from './RiskBadge.jsx';
import RotatingAnimal from './RotatingAnimal.jsx';

const SPECIES_LABEL = { cow: 'Cows', buffalo: 'Buffaloes', goat: 'Goats' };

export default function SpeciesListPage() {
  const { species } = useParams();
  const animals = HERD.filter((a) => a.species === species);

  return (
    <div>
      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-milk-dim">Species</p>
          <h2 className="font-display text-2xl text-milk">
            {SPECIES_LABEL[species] ?? species}
          </h2>
        </div>
        <div className="h-32 w-32 self-center sm:self-auto">
          <RotatingAnimal species={species} className="h-32 w-32" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {animals.map((a) => (
          <motion.div
            key={a.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
          >
            <Link
              to={`/dashboard/species/${species}/${a.id}`}
              className="focus-ring block rounded-xl border border-milk/10 bg-night-card/60 p-5 transition hover:border-turmeric/40"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-display text-lg text-milk">{a.name}</p>
                  <p className="text-xs text-milk-dim">
                    {a.id} · {a.breed}
                  </p>
                </div>
                <RiskBadge risk={a.risk} />
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-2 text-center text-xs text-milk-dim">
                <div>
                  <dt>Age</dt>
                  <dd className="mt-1 font-display text-sm text-milk">{a.age}y</dd>
                </div>
                <div>
                  <dt>Lactation</dt>
                  <dd className="mt-1 font-display text-sm text-milk">#{a.lactation}</dd>
                </div>
                <div>
                  <dt>Risk score</dt>
                  <dd className="mt-1 font-display text-sm text-milk">{a.riskScore}%</dd>
                </div>
              </dl>
            </Link>
          </motion.div>
        ))}

        {animals.length === 0 && (
          <p className="text-sm text-milk-dim">No animals recorded for this species yet.</p>
        )}
      </div>
    </div>
  );
}
