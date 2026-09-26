/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jain: {
          red: '#DC2626',      // Siddha - Energy Red
          yellow: '#F59E0B',   // Arihant - Golden Yellow
          orange: '#EA580C',   // Saffron Energy
          white: '#FFFFFF',    // Acharya - Pure Sattvic
          green: '#16A34A',    // Upadhyaya - Vitality Green
          blue: '#1E40AF',     // Sadhu - Royal Knowledge Blue
          blueLight: '#3B82F6',
          navy: '#0F172A',
        },
        brand: {
          primary: '#1E40AF',  // Royal Blue
          saffron: '#EA580C',  // Saffron Orange
          gold: '#F59E0B',     // Amber Gold
          crimson: '#DC2626',  // Red Accent
          emerald: '#16A34A',  // Sattvic Green
          dark: '#0B132B',
          light: '#F8FAFC',
        },
        whatsapp: {
          500: '#25D366',
          600: '#128C7E',
          700: '#075E54',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'pancha-varna': 'linear-gradient(90deg, #DC2626 0%, #F59E0B 25%, #F8FAFC 50%, #16A34A 75%, #1E40AF 100%)',
        'hero-jain': 'radial-gradient(circle at 50% 0%, rgba(30, 64, 175, 0.08) 0%, rgba(234, 88, 12, 0.05) 50%, rgba(248, 250, 252, 1) 100%)',
      }
    },
  },
  plugins: [],
}
