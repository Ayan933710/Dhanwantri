import { useEffect, useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  ChevronDown,
  Home,
  PawPrint,
  LineChart,
  History,
} from 'lucide-react';
import AmbientBackground from '../shared/AmbientBackground.jsx';
import ThemeToggle from '../shared/ThemeToggle.jsx';
import LanguageSelect from '../shared/LanguageSelect.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

const NAV_ITEMS = [
  { to: '/', label: 'Main Page', icon: Home, end: true },
  { to: '/dashboard', label: 'Herd Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
  { to: '/dashboard/predictions', label: 'Predictions', icon: AlertTriangle },
  { to: '/dashboard/history', label: 'History', icon: History },
];

const ANIMAL_ITEMS = [
  { to: '/dashboard/species/cow', label: 'Cows' },
  { to: '/dashboard/species/goat', label: 'Goats' },
  { to: '/dashboard/species/buffalo', label: 'Buffaloes' },
];

export default function DashboardLayout() {
  const { t } = useLanguage();
  const { pathname } = useLocation();
  const animalsActive = pathname.startsWith('/dashboard/species/');
  const [animalsOpen, setAnimalsOpen] = useState(animalsActive);

  useEffect(() => {
    if (animalsActive) setAnimalsOpen(true);
  }, [animalsActive]);

  return (
    <div className="relative flex min-h-screen isolate bg-theme-bg-main text-theme-text-dark">
      <AmbientBackground variant="dashboard" />
      <div className="dashboard-background-mesh" aria-hidden="true" />
      <aside className="relative z-10 dashboard-sidebar hidden w-60 shrink-0 border-r border-slate-200 bg-theme-bg-card px-4 py-6 shadow-sm md:block">
        <div className="flex items-center gap-2 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-theme-primary" />
          <span className="font-display text-base text-theme-text-dark">
            DairyGuard <span className="text-theme-primary">AI</span>
          </span>
        </div>

        <nav className="mt-8 space-y-1">
          {NAV_ITEMS.slice(0, 2).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                      ? 'bg-sky-50 text-theme-primary'
                    : 'text-theme-text-muted hover:bg-slate-50 hover:text-theme-text-dark'
                }`
              }
            >
              <Icon size={16} />
              {to === '/' ? t('mainPage') : t('herdOverview')}
            </NavLink>
          ))}

          <div className="pt-2">
            <button
              type="button"
              aria-expanded={animalsOpen}
              onClick={() => setAnimalsOpen((isOpen) => !isOpen)}
              className={`focus-ring flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition ${
                animalsActive ? 'text-theme-primary' : 'text-theme-text-muted'
              }`}
            >
              <span className="flex items-center gap-3">
                <PawPrint size={16} />
                <span>{t('animals')}</span>
              </span>
              <ChevronDown
                size={15}
                className={`transition-transform ${animalsOpen ? 'rotate-180' : ''}`}
              />
            </button>
            {animalsOpen && (
              <div className="ml-4 space-y-1 border-l border-slate-200 pl-3">
                {ANIMAL_ITEMS.map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    className={({ isActive }) =>
                      `focus-ring block rounded-lg px-3 py-2 text-sm transition ${
                        isActive
                          ? 'bg-sky-50 text-theme-primary'
                          : 'text-theme-text-muted hover:bg-slate-50 hover:text-theme-text-dark'
                      }`
                    }
                  >
                    {label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          {NAV_ITEMS.slice(2).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-sky-50 text-theme-primary'
                    : 'text-theme-text-muted hover:bg-sky-50/70 hover:text-theme-text-dark'
                }`
              }
            >
              <Icon size={16} />
              {to.endsWith('analytics') ? t('analytics') : to.endsWith('predictions') ? t('predictions') : t('history')}
            </NavLink>
          ))}
        </nav>

        <div className="mt-10 rounded-lg border border-slate-200 bg-theme-bg-card p-3 shadow-sm">
          <p className="text-[11px] text-theme-text-muted">
            Prototype data — for demo purposes. Not a certified diagnostic
            output.
          </p>
        </div>
      </aside>

      <div className="relative z-10 min-w-0 flex-1">
        <header className="dashboard-topbar flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-theme-bg-card px-4 py-4 shadow-sm sm:px-6 md:px-8">
          <div className="min-w-0">
            <p className="dashboard-kicker text-xs text-theme-text-muted">Kolar Village / milk cooperative</p>
            <p className="truncate font-display text-lg text-theme-text-dark">Herd Health Console</p>
          </div>
          <div className="dashboard-status flex shrink-0 items-center gap-2 text-xs text-theme-text-muted">
            <span className="h-2 w-2 rounded-full bg-theme-risk-none" />
            Gateway online · 99.4% uptime
          </div>
          <ThemeToggle />
          <LanguageSelect />
        </header>

        <nav className="dashboard-mobile-nav md:hidden" aria-label="Dashboard navigation">
          {NAV_ITEMS.slice(1).map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `dashboard-mobile-link ${isActive ? 'is-active' : ''}`}
            >
              <Icon size={15} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <main className="dashboard-main min-w-0 px-4 py-6 sm:px-6 sm:py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
