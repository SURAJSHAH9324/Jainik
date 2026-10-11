/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cocoa: {
          DEFAULT: '#241611',
          dark: '#1A0F0B',
          light: '#2E1D17',
        },
        cashew: {
          DEFAULT: '#F3E8DD',
          light: '#FBF5EE',
          dark: '#E7D5C4',
        },
        gold: {
          DEFAULT: '#C9A46C',
          light: '#D8BA8A',
          dark: '#A88349',
        },
        champagne: '#D8C08A',
        warmwhite: '#FFFBED',
        espresso: '#281A14',
        leaf: '#5C7548',
        chocolate: '#4A241B',
        warm: {
          50: '#FDFBF7',   // ultra-clean warm ivory
          100: '#FAF6F0',  // soft cream canvas
          150: '#F5EFEB',  // subtle section background
          200: '#EFE5DA',  // soft warm border / badge
          300: '#DEC8B5',  // distinct border
          400: '#BA9475',  // muted brown
          500: '#946645',  // warm caramel
          600: '#754B2E',  // rich hazelnut brown
          700: '#5C361D',  // deep chocolate brown
          800: '#3D2211',  // espresso
          900: '#241611',  // deep cocoa brown
          950: '#170B04',  // deepest brown
        },
        sage: {
          50: '#F2F7F4',
          100: '#E1EDE6',
          500: '#5C7548',
          700: '#3D5430',
          900: '#1F3018',
        },
        whatsapp: {
          500: '#25D366',
          600: '#128C7E',
          700: '#075E54',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Cormorant Garamond', 'Georgia', 'serif'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px -2px rgba(61, 34, 17, 0.05)',
        'warm-md': '0 8px 24px -6px rgba(61, 34, 17, 0.08)',
        'warm-lg': '0 16px 36px -8px rgba(61, 34, 17, 0.12)',
        'warm-xl': '0 24px 50px -12px rgba(61, 34, 17, 0.16)',
      }
    },
  },
  plugins: [],
}
