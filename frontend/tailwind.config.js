import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tokopedia: {
          50: '#e6f8ee',
          100: '#c2edd5',
          200: '#97e1b8',
          300: '#69d499',
          400: '#43c980',
          500: '#03AC0E', // Official Tokopedia Green
          600: '#02920b',
          700: '#017807',
          800: '#005e04',
          900: '#004702',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-up': 'floatUp 2s ease-out forwards',
      },
      keyframes: {
        floatUp: {
          '0%': { opacity: '1', transform: 'translateY(0) scale(1)' },
          '100%': { opacity: '0', transform: 'translateY(-100px) scale(1.3)' },
        },
      },
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        tokopedia: {
          "primary": "#03AC0E",
          "secondary": "#20ce64",
          "accent": "#ff5722",
          "neutral": "#1f2937",
          "base-100": "#0b0f17",
          "info": "#3abff8",
          "success": "#36d399",
          "warning": "#fbbd23",
          "error": "#f87272",
        },
      },
    ],
  },
};