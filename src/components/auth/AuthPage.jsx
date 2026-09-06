import { useEffect, useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, Leaf, LockKeyhole, Mail, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from '../shared/ThemeToggle.jsx';
import LanguageSelect from '../shared/LanguageSelect.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

const panelCopy = {
    login: {
      eyebrow: 'Already connected',
      title: 'Log in',
      description: 'Return to your herd workspace and pick up the signal.',
      popup: 'Your herd is waiting',
      popupDetail: 'Open live alerts, animal health and care windows.',
      formTitle: 'Welcome back',
      action: 'Sign in to DairyGuard',
    },
    signup: {
      eyebrow: 'Start a calmer day',
      title: 'Sign up',
      description: 'Create a shared intelligence layer for your farm.',
      popup: 'Connect your first herd',
      popupDetail: 'Set up your workspace and invite your care team.',
      formTitle: 'Create your workspace',
      action: 'Create DairyGuard account',
    },
};

export default function AuthPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const routeMode = location.pathname === '/signup' ? 'signup' : 'login';
  const [activeMode, setActiveMode] = useState(routeMode);
  const mode = activeMode;
  const copy = panelCopy[mode];
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [identifierMode, setIdentifierMode] = useState('phone');

  useEffect(() => {
    setActiveMode(routeMode);
    setSubmitted(false);
  }, [routeMode]);

  function switchMode(nextMode) {
    if (nextMode === mode) return;
    setSubmitted(false);
    setActiveMode(nextMode);
    navigate(`/${nextMode}`, { replace: true });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="auth-page">
      <div className="auth-atmosphere auth-atmosphere-one" aria-hidden="true" />
      <div className="auth-atmosphere auth-atmosphere-two" aria-hidden="true" />
      <header className="auth-header">
        <Link to="/" className="auth-brand" aria-label="DairyGuard home">
          <span className="brand-mark"><span /></span>
          <span className="font-display text-lg tracking-tight">DairyGuard <b>AI</b></span>
        </Link>
        <div className="flex items-center gap-4">
          <LanguageSelect />
          <ThemeToggle />
          <Link to="/" className="auth-home-link">Back to home <ArrowRight size={15} /></Link>
        </div>
      </header>

      <div className="auth-center auth-center-card">
        <motion.div className="auth-top-copy" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <span><Sparkles size={13} /> DairyGuard AI · Early care intelligence</span>
          <p>Sign in or create your workspace to keep every herd signal in view.</p>
        </motion.div>
        <motion.div layout className={`auth-card-shell auth-card-${mode}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ layout: { type: 'spring', stiffness: 240, damping: 28 }, opacity: { duration: .5 }, y: { duration: .5, ease: 'easeOut' } }}>
          <motion.section layout transition={{ layout: { type: 'spring', stiffness: 240, damping: 28 } }} className="auth-form-panel">
          <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <div className="auth-success" role="status">
              <span className="auth-success-icon"><Check size={20} /></span>
              <h2>{mode === 'login' ? 'You are all set.' : 'Workspace request received.'}</h2>
              <p>This prototype is ready for the next step. Continue into the platform to explore the herd view.</p>
              <button type="button" className="auth-submit" onClick={() => navigate('/dashboard')}>Enter platform <ArrowRight size={17} /></button>
            </div>
          ) : (
            <motion.div key={mode} initial={{ opacity: 0, x: mode === 'login' ? -18 : 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: mode === 'login' ? 18 : -18 }} transition={{ duration: .28, ease: 'easeOut' }}>
            <div className="auth-form-heading"><span>{copy.formTitle}</span><i /></div>
            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'signup' && <label><span>{t('fullName')}</span><div className="auth-input-wrap"><Leaf size={16} /><input name="name" type="text" placeholder="Your name" required /></div></label>}
              <fieldset className="auth-identifier-group">
                <legend>{t('identifier')}</legend>
                <div className="auth-identifier-tabs">
                  <button type="button" className={identifierMode === 'phone' ? 'is-active' : ''} onClick={() => setIdentifierMode('phone')}>{t('phone')}</button>
                  <button type="button" className={identifierMode === 'uniqueId' ? 'is-active' : ''} onClick={() => setIdentifierMode('uniqueId')}>{t('uniqueId')}</button>
                </div>
              </fieldset>
              <label><span>{identifierMode === 'phone' ? t('phone') : t('uniqueId')}</span><div className="auth-input-wrap"><Mail size={16} /><input name="identifier" type={identifierMode === 'phone' ? 'tel' : 'text'} inputMode={identifierMode === 'phone' ? 'tel' : 'text'} placeholder={identifierMode === 'phone' ? t('identifierPlaceholder') : t('uniqueIdPlaceholder')} required /></div></label>
              <label><span>{t('password')}</span><div className="auth-input-wrap"><LockKeyhole size={16} /><input name="password" type={showPassword ? 'text' : 'password'} placeholder="At least 8 characters" minLength="8" required /><button type="button" className="auth-password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
              {mode === 'login' ? <div className="auth-form-meta"><label className="auth-check"><input type="checkbox" /> <span>Remember me</span></label><button type="button" className="auth-text-button">Forgot password?</button></div> : <p className="auth-terms">By continuing, you agree to the DairyGuard workspace terms and privacy policy.</p>}
              <button type="submit" className="auth-submit">{mode === 'login' ? t('signIn') : t('createAccount')} <ArrowRight size={17} /></button>
            </form>
            </motion.div>
          )}
          </AnimatePresence>
          </motion.section>
          <motion.section layout transition={{ layout: { type: 'spring', stiffness: 240, damping: 28 } }} className="auth-welcome-panel">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={mode}
                className="auth-welcome-content"
                initial={{ opacity: 0, x: mode === 'login' ? 22 : -22 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: mode === 'login' ? -22 : 22 }}
                transition={{ duration: .34, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="auth-welcome-icon">{mode === 'login' ? <Leaf size={24} /> : <ShieldCheck size={24} />}</span>
                <span className="auth-welcome-kicker">DairyGuard AI</span>
                <h1>{mode === 'login' ? 'Welcome back!' : 'Hello, partner!'}</h1>
                <p>{mode === 'login' ? 'To keep your herd connected, sign in with your personal details.' : 'Enter your details and start your connected herd journey with us.'}</p>
                <button type="button" className="auth-outline-button" onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>
                  {mode === 'login' ? 'Sign up' : 'Sign in'} <ArrowRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
