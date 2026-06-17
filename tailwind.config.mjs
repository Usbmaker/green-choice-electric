/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        ha: {
          blue:     '#1abcf2',
          'blue-dark': '#007fa8',
          'blue-light': '#CCEFFE',
          dark:     '#1c1e21',
          'dark-2': '#2d2f35',
          gray:     '#f0f0f3',
          'gray-2': '#f2f4f9',
          text:     '#4f606e',
          'text-dark': '#0c0c0c',
        },
        gc: {
          green:      '#16b84a',
          'green-dark': '#0d8c32',
          'green-light': '#CCFFE4',
          teal:       '#0fb8a0',
          'teal-dark': '#0a8c7a',
        },
      },
      fontFamily: {
        sans: [
          'Figtree', '"Instrument Sans"', '-apple-system',
          'BlinkMacSystemFont', '"Helvetica Neue"', 'Arial', 'sans-serif',
        ],
        display: [
          'Figtree', '"Instrument Sans"', '-apple-system', 'sans-serif',
        ],
      },
      fontSize: {
        'hero': ['8rem', { lineHeight: '1', letterSpacing: '-2.56px', fontWeight: '800' }],
        'hero-md': ['6rem', { lineHeight: '1', letterSpacing: '-1.92px', fontWeight: '800' }],
        'hero-sm': ['4.5rem', { lineHeight: '1', letterSpacing: '-1.44px', fontWeight: '800' }],
      },
      borderRadius: {
        'card': '24px',
        'icon': '64px',
        'btn':  '32px',
      },
    },
  },
  plugins: [],
};
