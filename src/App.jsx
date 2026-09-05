import { lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HeroSection from './components/landing/HeroSection.jsx';
import FooterSection from './components/landing/FooterSection.jsx';
import AmbientBackground from './components/shared/AmbientBackground.jsx';

const FeaturesSection = lazy(() => import('./components/landing/FeaturesSection.jsx'));
const AuthPage = lazy(() => import('./components/auth/AuthPage.jsx'));
const DashboardLayout = lazy(() => import('./components/dashboard/DashboardLayout.jsx'));
const HerdOverviewPage = lazy(() => import('./components/dashboard/HerdOverviewPage.jsx'));
const SpeciesListPage = lazy(() => import('./components/dashboard/SpeciesListPage.jsx'));
const AnimalDetailPage = lazy(() => import('./components/dashboard/AnimalDetailPage.jsx'));
const AnalyticsPage = lazy(() => import('./components/dashboard/AnalyticsPage.jsx'));
const PredictionsPage = lazy(() => import('./components/dashboard/PredictionsPage.jsx'));
const HistoryPage = lazy(() => import('./components/dashboard/HistoryPage.jsx'));

function RouteLoading() {
  return <div className="route-loading" role="status" aria-label="Loading page"><span /></div>;
}

function FeatureLoading() {
  return <section className="feature-loading" aria-label="Loading features"><span /><span /><span /></section>;
}

function LandingPage() {
  const navigate = useNavigate();

  return (
    <main className="landing-page relative isolate min-h-screen text-theme-text-dark">
      <AmbientBackground variant="landing" />
      <HeroSection
        onLogin={() => navigate('/login')}
        onSignup={() => navigate('/signup')}
        onEnterPlatform={() => navigate('/dashboard')}
      />
      <Suspense fallback={<FeatureLoading />}>
        <FeaturesSection />
      </Suspense>
      <FooterSection />
    </main>
  );
}

export default function App() {
  const location = useLocation();
  const animationKey = ['/login', '/signup'].includes(location.pathname) ? '/auth' : location.pathname;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={animationKey}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Suspense fallback={<RouteLoading />}>
          <Routes location={location}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<AuthPage />} />
            <Route path="/signup" element={<AuthPage />} />

            <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<HerdOverviewPage />} />
              <Route path="species/:species" element={<SpeciesListPage />} />
              <Route path="species/:species/:animalId" element={<AnimalDetailPage />} />
              <Route path="analytics" element={<AnalyticsPage />} />
              <Route path="predictions" element={<PredictionsPage />} />
              <Route path="history" element={<HistoryPage />} />
            </Route>
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  );
}
