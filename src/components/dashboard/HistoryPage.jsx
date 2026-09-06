import { HISTORY_LOG, HERD } from '../../data/herd.js';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function HistoryPage() {
  const { t } = useLanguage();
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-display text-2xl text-milk">History</h2>
        <p className="mt-1 text-sm text-milk-dim">{t('historyDescription')}</p>
      </div>

      <ol className="relative space-y-6 border-l border-milk/10 pl-6">
        {HISTORY_LOG.map((h) => {
          const animal = HERD.find((a) => a.id === h.animalId);
          return (
            <li key={h.id} className="relative">
              <span className="absolute -left-[29px] top-1.5 h-2.5 w-2.5 rounded-full bg-theme-primary" />
              <p className="text-xs text-milk-dim">{h.date}</p>
              <p className="mt-1 text-sm text-milk">
                <span className="font-display">{animal?.name ?? h.animalId}</span> — {h.event}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
