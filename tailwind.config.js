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
      primary: '#664de5',
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
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
    plugin(function ({ addVariant, addBase }) {
      addBase({
        html: { fontSize: '62.5%' },
      });
      addVariant('mouse-focus', '&:focus:not(:focus-visible)');
    }),
  ],
};
