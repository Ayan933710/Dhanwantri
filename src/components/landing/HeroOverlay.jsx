import { motion } from 'framer-motion';
import { ArrowDownRight, ArrowUpRight, Play, Radio, ShieldCheck, Sparkles } from 'lucide-react';

export default function HeroOverlay() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 px-6 pb-16 pt-28 md:px-12 lg:px-16">
      <motion.div
        initial={{ y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
        className="hero-copy max-w-2xl text-left"
      >
        <div className="hero-eyebrow mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-turmeric-soft">
          <span className="status-dot" /> Live herd intelligence
        </div>
        <h1 className="font-display text-5xl leading-[0.92] text-milk sm:text-7xl md:text-8xl">
          See the signal.
          <span className="hero-title-accent"> Shape what happens next.</span>
        </h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-milk-dim md:text-base">
          A connected intelligence layer for healthier animals, calmer decisions and a clearer view of every day in the shed.
        </p>
        <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-3">
          <a href="#features" className="hero-primary-button">
            Explore the system <ArrowDownRight size={17} />
          </a>
          <span className="hero-secondary-note"><Play size={12} fill="currentColor" /> Live from animal to alert</span>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="hero-metric-card hero-card-one"
      >
        <div className="flex items-center justify-between gap-8"><span className="hero-card-label"><Radio size={13} /> Signal watch</span><span className="hero-card-live">● LIVE</span></div>
        <div className="mt-3 flex items-end justify-between"><strong>94.8%</strong><span className="hero-card-positive"><ArrowUpRight size={14} /> 12.4%</span></div>
        <div className="hero-signal-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
        <span className="mt-2 block text-[10px] text-milk-dim/70">Behaviour confidence · herd average</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 18 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="hero-metric-card hero-card-two"
      >
        <div className="flex items-center gap-2 text-xs text-milk"><ShieldCheck size={15} className="text-pasture-light" /> Early care window</div>
        <p className="mt-2 font-display text-2xl text-milk">7–14 days</p>
        <span className="text-[10px] text-milk-dim/70">before symptoms surface</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        className="hero-annotation"
      >
        <Sparkles size={14} className="text-turmeric" />
        <span>One connected view<br /><b>for the whole herd</b></span>
        <ArrowUpRight size={15} />
      </motion.div>
    </div>
  );
}
