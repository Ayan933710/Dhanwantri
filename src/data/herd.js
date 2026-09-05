export const SPECIES = ['cow', 'buffalo', 'goat'];

export const RISK_LEVELS = ['No Risk', 'Low Risk', 'Moderate Risk', 'High Risk'];

const riskColor = {
  'No Risk': '#22C55E',
  'Low Risk': '#38BDF8',
  'Moderate Risk': '#F59E0B',
  'High Risk': '#EF4444',
};
export { riskColor };

function quarterSet(baseRisk) {
  const jitter = () => Math.round((Math.random() - 0.5) * 10);
  return ['LF', 'RF', 'LR', 'RR'].map((q, i) => ({
    quarter: q,
    ecDelta: baseRisk === 'High Risk' && i === 0 ? 22 : Math.max(0, 4 + jitter()),
    tempDelta: baseRisk === 'High Risk' && i === 0 ? 0.9 : +(Math.random() * 0.3).toFixed(1),
    yieldDrop: baseRisk === 'High Risk' && i === 0 ? 15 : Math.round(Math.random() * 5),
  }));
}

function trend(days, driftUp) {
  let v = 20 + Math.random() * 10;
  return Array.from({ length: days }, (_, i) => {
    v += (driftUp ? 1 : -0.3) * (Math.random() * 2);
    return { day: `D-${days - i}`, risk: Math.max(2, Math.min(96, Math.round(v))) };
  });
}

export const HERD = [
  {
    id: 'C-104',
    name: 'Gauri',
    species: 'cow',
    breed: 'Sahiwal Cross',
    age: 5,
    lactation: 3,
    risk: 'High Risk',
    riskScore: 84,
    rumination: -28,
    thi: 78,
    quarters: quarterSet('High Risk'),
    trend: trend(14, true),
  },
  {
    id: 'C-118',
    name: 'Radha',
    species: 'cow',
    breed: 'Gir',
    age: 4,
    lactation: 2,
    risk: 'Moderate Risk',
    riskScore: 58,
    rumination: -12,
    thi: 71,
    quarters: quarterSet('Moderate Risk'),
    trend: trend(14, true),
  },
  {
    id: 'C-129',
    name: 'Lakshmi',
    species: 'cow',
    breed: 'Crossbred HF',
    age: 6,
    lactation: 4,
    risk: 'No Risk',
    riskScore: 9,
    rumination: 2,
    thi: 62,
    quarters: quarterSet('No Risk'),
    trend: trend(14, false),
  },
  {
    id: 'B-021',
    name: 'Kajal',
    species: 'buffalo',
    breed: 'Murrah',
    age: 7,
    lactation: 5,
    risk: 'Low Risk',
    riskScore: 32,
    rumination: -6,
    thi: 69,
    quarters: quarterSet('Low Risk'),
    trend: trend(14, false),
  },
  {
    id: 'B-034',
    name: 'Kali',
    species: 'buffalo',
    breed: 'Mehsana',
    age: 5,
    lactation: 3,
    risk: 'No Risk',
    riskScore: 6,
    rumination: 1,
    thi: 64,
    quarters: quarterSet('No Risk'),
    trend: trend(14, false),
  },
  {
    id: 'G-007',
    name: 'Chandni',
    species: 'goat',
    breed: 'Jamunapari',
    age: 2,
    lactation: 1,
    risk: 'Moderate Risk',
    riskScore: 49,
    rumination: -15,
    thi: 66,
    quarters: quarterSet('Moderate Risk'),
    trend: trend(14, true),
  },
  {
    id: 'G-012',
    name: 'Pari',
    species: 'goat',
    breed: 'Beetal',
    age: 3,
    lactation: 2,
    risk: 'No Risk',
    riskScore: 4,
    rumination: 0,
    thi: 60,
    quarters: quarterSet('No Risk'),
    trend: trend(14, false),
  },
];

export const RECOMMENDATIONS = [
  {
    id: 'r1',
    animalId: 'C-104',
    profile: 'Acute / Environmental',
    action:
      'Immediate veterinary examination; supportive anti-inflammatory therapy; replace bedding in this stall.',
    urgency: 'High Risk',
  },
  {
    id: 'r2',
    animalId: 'C-118',
    profile: 'Subclinical / Contagious',
    action:
      'Post-milking chlorhexidine teat dip; milk this cow last to avoid cross-transmission via the milker\u2019s hands.',
    urgency: 'Moderate Risk',
  },
  {
    id: 'r3',
    animalId: 'G-007',
    profile: 'Heat-stress linked',
    action: 'Increase shed ventilation; shift milking to early morning while THI is elevated.',
    urgency: 'Moderate Risk',
  },
];

export const HISTORY_LOG = [
  { id: 'h1', date: '2026-08-30', animalId: 'C-104', event: 'Risk escalated to High Risk (84%)' },
  { id: 'h2', date: '2026-08-28', animalId: 'C-104', event: 'Quarter 3 EC delta crossed +18% threshold' },
  { id: 'h3', date: '2026-08-27', animalId: 'C-118', event: 'Rumination declined 12% over 48h' },
  { id: 'h4', date: '2026-08-25', animalId: 'G-007', event: 'THI exceeded 70 for 3 consecutive days' },
  { id: 'h5', date: '2026-08-20', animalId: 'B-021', event: 'Monthly probe calibration completed' },
  { id: 'h6', date: '2026-08-14', animalId: 'C-129', event: 'Clear CMT result, herd baseline updated' },
];
