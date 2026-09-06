import { useEffect, useState } from 'react';
import { ArrowRight, Check, Eye, EyeOff, Leaf, LockKeyhole, Phone, ShieldCheck, Sparkles } from 'lucide-react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import ThemeToggle from '../shared/ThemeToggle.jsx';
import LanguageSelect from '../shared/LanguageSelect.jsx';
import { useLanguage } from '../../hooks/useLanguage.jsx';

export default function AuthPage() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const routeMode = location.pathname === '/signup' ? 'signup' : 'login';
  const [activeMode, setActiveMode] = useState(routeMode);
  const mode = activeMode;
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
          <Link to="/" className="auth-home-link">{t('backHome')} <ArrowRight size={15} /></Link>
        </div>
      </header>

      <div className="auth-center auth-center-card">
        <motion.div className="auth-top-copy" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .5 }}>
          <span><Sparkles size={13} /> {t('earlyCare')}</span>
          <p>{t('authIntro')}</p>
        </motion.div>
        <motion.div layout className={`auth-card-shell auth-card-${mode}`} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ layout: { type: 'spring', stiffness: 240, damping: 28 }, opacity: { duration: .5 }, y: { duration: .5, ease: 'easeOut' } }}>
          <motion.section layout transition={{ layout: { type: 'spring', stiffness: 240, damping: 28 } }} className="auth-form-panel">
          <AnimatePresence mode="wait" initial={false}>
          {submitted ? (
            <div className="auth-success" role="status">
              <span className="auth-success-icon"><Check size={20} /></span>
              <h2>{mode === 'login' ? t('allSet') : t('workspaceReceived')}</h2>
              <p>{t('prototypeReady')}</p>
              <button type="button" className="auth-submit" onClick={() => navigate('/dashboard')}>{t('enterPlatform')} <ArrowRight size={17} /></button>
            </div>
          ) : (
            <motion.div key={mode} initial={{ opacity: 0, x: mode === 'login' ? -18 : 18 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: mode === 'login' ? 18 : -18 }} transition={{ duration: .28, ease: 'easeOut' }}>
            <div className="auth-form-heading"><span>{mode === 'login' ? t('welcomeBack') : t('createWorkspace')}</span><i /></div>
            <form className="auth-form" onSubmit={handleSubmit}>
              {mode === 'signup' && <label><span>{t('fullName')}</span><div className="auth-input-wrap"><Leaf size={16} /><input name="name" type="text" placeholder={t('yourName')} required /></div></label>}
              <fieldset className="auth-identifier-group">
                  <legend>{mode === 'signup' ? t('signupWith') : t('identifier')}</legend>
                <div className="auth-identifier-tabs">
                  <button type="button" className={identifierMode === 'phone' ? 'is-active' : ''} onClick={() => setIdentifierMode('phone')}>{t('phone')}</button>
                  <button type="button" className={identifierMode === 'uniqueId' ? 'is-active' : ''} onClick={() => setIdentifierMode('uniqueId')}>{t('uniqueId')}</button>
                </div>
              </fieldset>
              <label><span>{identifierMode === 'phone' ? t('phone') : t('uniqueId')}</span><div className="auth-input-wrap"><Phone size={16} /><input name="identifier" type={identifierMode === 'phone' ? 'tel' : 'text'} inputMode={identifierMode === 'phone' ? 'tel' : 'text'} placeholder={identifierMode === 'phone' ? t('identifierPlaceholder') : t('uniqueIdPlaceholder')} required /></div></label>
              <label><span>{t('password')}</span><div className="auth-input-wrap"><LockKeyhole size={16} /><input name="password" type={showPassword ? 'text' : 'password'} placeholder={t('passwordPlaceholder')} minLength="8" required /><button type="button" className="auth-password-toggle" onClick={() => setShowPassword((visible) => !visible)} aria-label={showPassword ? t('hidePassword') : t('showPassword')}>{showPassword ? <EyeOff size={16} /> : <Eye size={16} />}</button></div></label>
              {mode === 'login' ? <div className="auth-form-meta"><label className="auth-check"><input type="checkbox" /> <span>{t('rememberMe')}</span></label><button type="button" className="auth-text-button">{t('forgotPassword')}</button></div> : <p className="auth-terms">{t('terms')}</p>}
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
                <h1>{mode === 'login' ? t('welcomeBackBang') : t('helloPartner')}</h1>
                <p>{mode === 'login' ? t('loginDescription') : t('signupDescription')}</p>
                <button type="button" className="auth-outline-button" onClick={() => switchMode(mode === 'login' ? 'signup' : 'login')}>
                  {mode === 'login' ? t('signup') : t('login')} <ArrowRight size={16} />
                </button>
              </motion.div>
            </AnimatePresence>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}
