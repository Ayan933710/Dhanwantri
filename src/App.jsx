import { AnimatePresence, motion } from 'framer-motion';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import HeroSection from './components/landing/HeroSection.jsx';
import FeaturesSection from './components/landing/FeaturesSection.jsx';
import FooterSection from './components/landing/FooterSection.jsx';
import DashboardLayout from './components/dashboard/DashboardLayout.jsx';
import HerdOverviewPage from './components/dashboard/HerdOverviewPage.jsx';
import SpeciesListPage from './components/dashboard/SpeciesListPage.jsx';
import AnimalDetailPage from './components/dashboard/AnimalDetailPage.jsx';
import AnalyticsPage from './components/dashboard/AnalyticsPage.jsx';
import PredictionsPage from './components/dashboard/PredictionsPage.jsx';
import HistoryPage from './components/dashboard/HistoryPage.jsx';
import AmbientBackground from './components/shared/AmbientBackground.jsx';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <main className="relative isolate min-h-screen bg-theme-bg-main text-theme-text-dark">
      <AmbientBackground variant="landing" />
      <HeroSection
        onLogin={() => console.log('open login modal')}
        onSignup={() => console.log('open signup modal')}
        onEnterPlatform={() => navigate('/dashboard')}
      />
      <FeaturesSection />
      <FooterSection />
    </main>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<LandingPage />} />

          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<HerdOverviewPage />} />
            <Route path="species/:species" element={<SpeciesListPage />} />
            <Route path="species/:species/:animalId" element={<AnimalDetailPage />} />
            <Route path="analytics" element={<AnalyticsPage />} />
            <Route path="predictions" element={<PredictionsPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}
