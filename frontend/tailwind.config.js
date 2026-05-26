/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        teal: '#0d9488',
        orange: '#f97316',
        'deep-slate': '#0f172a',
        'light-gray': '#f1f5f9',
        purple: '#a855f7',
        pink: '#ec4899',
        blue: '#3b82f6',
        cyan: '#06b6d4',
      },
      fontFamily: {
        heading: ['Cabinet Grotesk', 'ui-sans-serif', 'system-ui'],
        body: ['Satoshi', 'ui-sans-serif', 'system-ui'],
      },
      borderRadius: {
        xlcard: '24px',
        btn: '12px',
      },
      animation: {
        blob: 'blob 7s infinite',
        'fade-in': 'fade-in 0.8s ease-out forwards',
        'fade-in-delayed-1': 'fade-in 0.8s ease-out 0.2s forwards',
        'fade-in-delayed-2': 'fade-in 0.8s ease-out 0.4s forwards',
        'fade-in-delayed-3': 'fade-in 0.8s ease-out 0.6s forwards',
      },
      keyframes: {
        blob: {
          '0%, 100%': {
            transform: 'translate(0, 0) scale(1)',
          },
          '33%': {
            transform: 'translate(30px, -50px) scale(1.1)',
          },
          '66%': {
            transform: 'translate(-20px, 20px) scale(0.9)',
          },
        },
        'fade-in': {
          from: {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
      },
    },
  },
  plugins: [],
}

