/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
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
          900: '#261408',  // dark cocoa ink
          950: '#170B04',  // deepest brown
        },
        sage: {
          50: '#F2F7F4',
          100: '#E1EDE6',
          500: '#3B7A57',
          700: '#255239',
          900: '#153322',
        },
        whatsapp: {
          500: '#25D366',
          600: '#128C7E',
          700: '#075E54',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
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
