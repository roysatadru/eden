/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./public/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      tablet: '40em',
      'large-tablet': '48em',
      laptop: '64em',
      desktop: '80em',
      'large-desktop': '96em',
    },

    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: {
        DEFAULT: '#664de5',
        'medium-dark': '#593ee3',
        dark: '#4d2fe1',
      },
      white: colors.white,
      gray: {
        100: '#f8f9fc',
        200: '#eaeef5',
        300: '#8b97b1',
        400: '#5c6984',
        500: '#4e5a74',
        600: '#364259',
        700: '#2f2e41',
        800: '#151b28',
        900: '#080b11',
      },
    },

    extend: {
      fontFamily: { sans: ['Inter', ...defaultTheme.fontFamily.sans] },
      borderRadius: { primary: '0.6rem' },
      keyframes: ({ theme }) => ({
        stroke: {
          '100%': { 'stroke-dashoffset': '0' },
        },
        scale: {
          '0%, 100%': { transform: 'none' },
          '50%': { transform: 'scale3d(1.1, 1.1, 1)' },
        },
        fill: {
          '100%': {
            boxShadow: `inset 0 0 0 5rem ${theme('colors.primary.DEFAULT')}`,
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, addBase }) {
      addBase({
        html: { fontSize: '62.5%' },
        body: { fontSize: '1.6rem' },
        '*:focus': { outline: 'none' },
      });
      addVariant('mouse-focus', '&:focus:not(:focus-visible)');
      addVariant('except-last-children', '& > *:not(:last-of-type)');
    }),
  ],
};
