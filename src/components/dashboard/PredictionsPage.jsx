import { Link } from 'react-router-dom';
import { RECOMMENDATIONS, HERD } from '../../data/herd.js';
import RiskBadge from './RiskBadge.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function PredictionsPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-milk">{t('predictionTitle')}</h2>
        <p className="mt-1 text-sm text-milk-dim">
          {t('predictionDescription')}
        </p>
      </div>

      <div className="space-y-4">
        {RECOMMENDATIONS.map((r) => {
          const animal = HERD.find((a) => a.id === r.animalId);
          if (!animal) return null;
          return (
            <div
              key={r.id}
              className="rounded-xl border border-milk/10 bg-night-card/60 p-5"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="font-display text-lg text-milk">
                    {animal.name}{' '}
                    <span className="text-sm font-normal text-milk-dim">· {animal.id}</span>
                  </p>
                  <p className="text-xs text-milk-dim">{r.profile}</p>
                </div>
                <RiskBadge risk={r.urgency} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-milk">{r.action}</p>
              <Link
                to={`/dashboard/species/${animal.species}/${animal.id}`}
                className="focus-ring mt-3 inline-block text-xs font-medium text-sky-600 transition-colors hover:text-sky-700"
              >
                {t('viewRecord')}
              </Link>
            </div>
          );
        })}

        {RECOMMENDATIONS.length === 0 && (
          <p className="rounded-xl border border-milk/10 bg-night-card/60 p-6 text-sm text-milk-dim">
            {t('noRecommendations')}
          </p>
        )}
      </div>
    </div>
  );
}
