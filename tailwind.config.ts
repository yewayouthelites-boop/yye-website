import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Brand colours from YYE Brand Guide
        'yye-green': {
          DEFAULT: '#11A32C',
          dark: '#0c7d21',
        },
        'yye-yellow': {
          // Muted golden — professional, less neon than the original #F9D503
          DEFAULT: '#D4A300',
          dark: '#B08700',
        },
        // Very light warm cream — for large section backgrounds
        'yye-cream': '#FEF6DC',
        'yye-dark': '#1E1E1E',
        'yye-gray': '#6b6b6b',
        'yye-light': '#F3FFF4',
      },
      fontFamily: {
        // Host Grotesk — brand typeface per YYE Brand Guide (Light 300 · Medium 500 · ExtraBold 800)
        sans: ['"Host Grotesk"', 'sans-serif'],
      },
      fontSize: {
        'hero': 'clamp(2.8rem, 6vw, 5rem)',
        'page-h1': 'clamp(2.4rem, 5vw, 4rem)',
        'section-h2': 'clamp(1.8rem, 3.5vw, 2.8rem)',
      },
      borderRadius: {
        'brand': '10px',
        'card': '16px',
        'card-lg': '20px',
      },
      letterSpacing: {
        'brand-tight': '-0.02em',
        'brand-wide': '0.08em',
        'brand-wider': '0.12em',
      },
      boxShadow: {
        // Subtle, neutral-toned card shadows — professional feel
        'card-hover': '0 2px 12px rgba(0,0,0,0.07)',
        'card-hover-lg': '0 4px 16px rgba(0,0,0,0.08)',
        'nav': '0 1px 12px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease both',
        'fade-up-1': 'fadeUp 0.6s 0.1s ease both',
        'fade-up-2': 'fadeUp 0.6s 0.2s ease both',
        'fade-up-3': 'fadeUp 0.6s 0.3s ease both',
        'fade-up-4': 'fadeUp 0.6s 0.4s ease both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
