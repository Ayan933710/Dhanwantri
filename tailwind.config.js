/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // DairyGuard AI token system — dusk pasture, not the generic cream/terracotta default.
        night: {
          DEFAULT: '#0F1A17', // deep pasture-at-dusk background
          soft: '#16241F',
          card: '#1B2B25',
        },
        pasture: {
          DEFAULT: '#2F5D46', // grazing-field green
          light: '#4C8A68',
        },
        turmeric: {
          DEFAULT: '#E3A23C', // turmeric/marigold accent — warm, Indian-agrarian, not clay-orange
          soft: '#F0C878',
        },
        milk: {
          DEFAULT: '#F6F2E7', // milk-white for high-contrast text on dark
          dim: '#CFC9B8',
        },
        alert: {
          low: '#4C8A68',
          moderate: '#E3A23C',
          high: '#C4553D',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        body: ['"Public Sans"', 'sans-serif'],
      },
      backgroundImage: {
        'dusk-gradient':
          'radial-gradient(120% 120% at 50% 0%, #1B2B25 0%, #0F1A17 55%, #090F0D 100%)',
      },
    },
  },
  plugins: [],
};
