/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fef9ec',
          100: '#fdf1ce',
          500: '#d6a94d',
          600: '#b88b32',
          700: '#976c22'
        },
        silver: {
          100: '#f1f5f9',
          500: '#94a3b8',
          700: '#475569'
        }
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(15, 23, 42, 0.25)'
      }
    }
  },
  plugins: []
};
