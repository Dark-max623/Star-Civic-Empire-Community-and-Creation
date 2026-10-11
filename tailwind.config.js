// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-dark': '#161616',
        'bg-dark-elevated': '#1E1E1E',
        'gold-primary': '#FF8800',
        'gold-hover': '#FFA733',
        'text-primary': '#FFFFFF',
        'text-subtle': '#AAAAAA',
        'text-muted': '#666666',
      },
      fontFamily: {
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient':
          'linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(22,22,22,0.9))',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [],
};