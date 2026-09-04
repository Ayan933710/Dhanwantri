import { useState } from 'react';
import { motion } from 'framer-motion';
import MiniDeviceViewer from '../shared/MiniDeviceViewer.jsx';
import { COLLAR_PARTS, CUP_PARTS, HUB_PARTS, WORKFLOW_STEPS } from '../../data/parts.js';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

function PartRow({ part }) {
  return (
    <motion.div
      variants={fadeUp}
      className="feature-signal-row flex gap-4 rounded-lg border border-milk/10 bg-night-card/60 p-4"
    >
      <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-turmeric" />
      <div>
        <p className="font-display text-sm text-milk">
          {part.name} <span className="text-milk-dim">· {part.role}</span>
        </p>
        <p className="mt-1 text-sm leading-relaxed text-milk-dim">{part.detail}</p>
      </div>
    </motion.div>
  );
}

function DevicePanel({ title, subtitle, viewerType, parts }) {
  const callouts = viewerType === 'collar'
    ? [['MPU6050', 'Motility'], ['LoRa radio', '3–5 km range'], ['Solar cell', '195-day reserve']]
    : viewerType === 'cup'
      ? [['EC + pH', 'Chemistry'], ['IR probe', 'Temperature'], ['RFID', 'Animal ID']]
      : [['LoRa', 'Signal bridge'], ['Wi-Fi + 4G', 'Cloud sync'], ['250+', 'Devices connected']];
  const flow = viewerType === 'collar'
    ? ['Sense motion + temperature', 'Compress a live behaviour signal', 'Broadcast over LoRa']
    : viewerType === 'cup'
      ? ['Identify the animal by RFID', 'Sample all four quarters', 'Return chemistry + rheology']
      : ['Collect collar and cup packets', 'Buffer readings at the edge', 'Sync one herd timeline'];

  return (
    <div className="device-feature-panel">
      <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp} className="device-feature-heading">
        <div>
          <h3 className="font-display text-2xl text-milk md:text-3xl">{title}</h3>
          <p className="mt-2 max-w-lg text-sm leading-6 text-milk-dim">{subtitle}</p>
          <div className="device-flow" aria-label={`${title} signal flow`}>
            {flow.map((step, stepIndex) => (
              <div key={step} className="device-flow-step">
                <span>0{stepIndex + 1}</span>
                <p>{step}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
      <div className="device-feature-stage">
        <div className="device-stage-halo" />
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}>
          <div className="device-diagram">
            <MiniDeviceViewer type={viewerType} />
            <div className="device-callouts" aria-hidden="true">
              {callouts.map(([label, detail], index) => (
                <div key={label} className={`device-callout device-callout-${index + 1}`}>
                  <span className="device-callout-line" />
                  <b>{label}</b><small>{detail}</small>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className="device-parts-grid"
          >
            {parts.map((part) => (
              <PartRow key={part.id} part={part} />
            ))}
          </motion.div>
    </div>
  );
}

export default function FeaturesSection() {
  const [activeDevice, setActiveDevice] = useState('collar');
  const devices = {
    collar: {
      title: 'Smart Collar',
      subtitle: 'Worn continuously, it watches behaviour, rumination and motility for the earliest signal of systemic distress.',
      parts: COLLAR_PARTS,
      
    },
    cup: {
      title: 'Smart Cup v2.1',
      subtitle: "At milking time, it reads each quarter's chemistry and rheology directly in under 45 seconds per cow.",
      parts: CUP_PARTS,
      
    },
    hub: {
      title: 'DairyGuard Hub',
      subtitle: 'The always-on gateway collects every collar and cup signal, buffers it locally and keeps the cloud timeline alive.',
      parts: HUB_PARTS,
      
    },
  };
  const selected = devices[activeDevice];

  return (
    <section id="features" className="features-stage relative overflow-hidden bg-night px-6 py-24 md:px-12">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeUp}
        className="mx-auto max-w-2xl text-center"
      >
        <p className="text-xs tracking-wide text-turmeric-soft">Features &amp; Working</p>
        <h2 className="mt-3 font-display text-3xl text-milk md:text-4xl">
          Three devices. One connected forecast.
        </h2>
        <p className="mt-3 text-sm text-milk-dim">
          Every signal has a place: on the animal, at milking time and at the gateway.
        </p>
      </motion.div>

      <div className="device-switcher mx-auto mt-12 max-w-5xl" role="tablist" aria-label="DairyGuard devices">
        {Object.entries(devices).map(([key, device], index) => (
          <button
            key={key}
            type="button"
            role="tab"
            aria-selected={activeDevice === key}
            className={`device-tab ${activeDevice === key ? 'is-active' : ''}`}
            onClick={() => setActiveDevice(key)}
          >
            <span>{index + 1}</span>
            <strong>{device.title}</strong>
            <small>{key === 'collar' ? 'Always-on sensing' : key === 'cup' ? 'Milking intelligence' : 'Farm-wide relay'}</small>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-5xl">
        <DevicePanel
          key={activeDevice}
          title={selected.title}
          subtitle={selected.subtitle}
          viewerType={activeDevice}
          parts={selected.parts}
        />
      </div>

      {/* Workflow timeline */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.1 }}
        className="workflow-timeline mx-auto mt-28 max-w-6xl"
      >
        <motion.h1
          variants={fadeUp}
          className="workflow-heading text-center font-display text-milk"
        >
          From teat to alert, in five steps
        </motion.h1>

        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-5">
          {WORKFLOW_STEPS.map((s) => (
            <motion.div
              key={s.step}
              variants={fadeUp}
              className="feature-step min-h-60 rounded-lg border border-milk/10 bg-night-card/60 p-6"
            >
              <span className="font-display text-xl text-turmeric">{s.step}</span>
              <p className="mt-2 font-display text-sm text-milk">{s.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-milk-dim">{s.detail}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
