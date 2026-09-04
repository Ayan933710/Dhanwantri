import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  AlertTriangle,
  PawPrint,
  LineChart,
  ClipboardList,
  History,
} from 'lucide-react';

const NAV_ITEMS = [
  { to: '/dashboard', label: 'Herd Overview', icon: LayoutDashboard, end: true },
  { to: '/dashboard/species/cow', label: 'Cows', icon: PawPrint },
  { to: '/dashboard/species/buffalo', label: 'Buffaloes', icon: PawPrint },
  { to: '/dashboard/species/goat', label: 'Goats', icon: PawPrint },
  { to: '/dashboard/analytics', label: 'Analytics', icon: LineChart },
  { to: '/dashboard/predictions', label: 'Predictions', icon: AlertTriangle },
  { to: '/dashboard/history', label: 'History', icon: History },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-night text-milk">
      <aside className="hidden w-60 shrink-0 border-r border-milk/10 bg-night-soft px-4 py-6 md:block">
        <div className="flex items-center gap-2 px-2">
          <span className="h-2.5 w-2.5 rounded-full bg-turmeric" />
          <span className="font-display text-base text-milk">
            DairyGuard <span className="text-turmeric">AI</span>
          </span>
        </div>

        <nav className="mt-8 space-y-1">
          {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `focus-ring flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  isActive
                    ? 'bg-turmeric/15 text-turmeric'
                    : 'text-milk-dim hover:bg-milk/5 hover:text-milk'
                }`
              }
            >
              <Icon size={16} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-10 rounded-lg border border-milk/10 bg-night-card/60 p-3">
          <p className="text-[11px] text-milk-dim">
            Prototype data — for demo purposes. Not a certified diagnostic
            output.
          </p>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-milk/10 px-4 py-4 sm:px-6 md:px-8">
          <div>
            <p className="text-xs text-milk-dim">Kolar Village Milk Cooperative</p>
            <p className="font-display text-lg text-milk">Herd Health Console</p>
          </div>
          <div className="flex items-center gap-2 text-xs text-milk-dim">
            <span className="h-2 w-2 rounded-full bg-pasture-light" />
            Gateway online
          </div>
        </header>

        <main className="min-w-0 px-4 py-6 sm:px-6 sm:py-8 md:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
