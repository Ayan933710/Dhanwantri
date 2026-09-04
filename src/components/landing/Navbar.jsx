import { motion } from 'framer-motion';

export default function Navbar({ onLogin, onSignup, onEnterPlatform }) {
  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-5 md:px-12 lg:px-16"
    >
      <div className="flex items-center gap-2">
        <span className="brand-mark"><span /></span>
        <span className="font-display text-lg tracking-tight text-milk">
          DairyGuard <span className="text-turmeric">AI</span>
        </span>
      </div>

      <nav className="flex items-center gap-3">
        <button
          onClick={onLogin}
          className="focus-ring hidden rounded-full px-4 py-2 text-sm text-milk-dim transition hover:text-milk sm:block"
        >
          Log in
        </button>
        <button
          onClick={onSignup}
          className="focus-ring hidden rounded-full border border-milk/20 px-4 py-2 text-sm text-milk transition hover:border-turmeric hover:text-turmeric sm:block"
        >
          Sign up
        </button>
        <button
          onClick={onEnterPlatform}
          className="focus-ring nav-cta rounded-full bg-turmeric px-5 py-2 text-sm font-semibold text-night transition hover:bg-turmeric-soft"
        >
          Enter Platform
        </button>
      </nav>
    </motion.header>
  );
}
