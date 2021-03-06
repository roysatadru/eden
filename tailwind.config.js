/* eslint-disable @typescript-eslint/no-var-requires */
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');
const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./public/index.html', './src/**/*.{ts,tsx}'],
  theme: {
    screens: {
      'sm-mobile': '25.5rem',
      mobile: '28.5em',
      tablet: '37.5em',
      'xl-desktop': '96em',
      '2xl-desktop': '112.5em',
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
      error: colors.red,
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
      animation: {
        'hourglass-primary': 'hourglass 1.2s infinite',
      },
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
        hourglass: {
          '0%': {
            transform: 'rotate(0)',
            'animation-timing-function':
              'cubic-bezier(0.55, 0.055, 0.675, 0.19)',
          },
          '50%': {
            transform: 'rotate(900deg)',
            'animation-timing-function': 'cubic-bezier(0.215, 0.61, 0.355, 1)',
          },
          '100%': {
            transform: 'rotate(1800deg)',
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, addBase }) {
      addBase({
        html: {
          fontSize: '62.5%',

          '@screen xl-desktop': {
            fontSize: '68%',
          },

          '@screen 2xl-desktop': {
            fontSize: '75%',
          },
        },
        body: { fontSize: '1.6rem' },
        '*:focus': { outline: 'none' },
      });
      addVariant('mouse-focus', '&:focus:not(:focus-visible)');
      addVariant('except-last-children', '& > *:not(:last-of-type)');
    }),
  ],
};
