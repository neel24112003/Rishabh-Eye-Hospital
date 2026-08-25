/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        theme: {
          lime: "#B8ED78",
          teal: "#35A6B7",
          aqua: "#51AABC",
          darkBg: "#070C14",
          darkCard: "#0E1726",
          darkBorder: "rgba(53, 166, 183, 0.25)",
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'laser-scan': 'laserScan 3s linear infinite',
        'glow-pulse': 'glowPulse 2s infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        laserScan: {
          '0%': { top: '0%', opacity: '0.8' },
          '50%': { top: '100%', opacity: '1' },
          '100%': { top: '0%', opacity: '0.8' },
        },
        glowPulse: {
          '0%': { boxShadow: '0 0 15px rgba(184, 237, 120, 0.4), 0 0 30px rgba(53, 166, 183, 0.3)' },
          '100%': { boxShadow: '0 0 25px rgba(184, 237, 120, 0.8), 0 0 50px rgba(53, 166, 183, 0.6)' },
        }
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
