import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        mystic: {
          50: '#f8f7ff',
          100: '#f1edff',
          200: '#e6deff',
          300: '#d2c2ff',
          400: '#b598ff',
          500: '#9563ff',
          600: '#8036ff',
          700: '#7321eb',
          800: '#601bc5',
          900: '#4f1a9f',
          950: '#300f6b',
        },
      },
      backgroundImage: {
        'mystic-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'card-gradient': 'linear-gradient(145deg, #1e1b4b 0%, #312e81 100%)',
      },
      animation: {
        'card-flip': 'flip 0.6s ease-in-out',
        'deck-entrance': 'slideUp 0.8s ease-out',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '50%': { transform: 'rotateY(90deg)' },
          '100%': { transform: 'rotateY(0deg)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config