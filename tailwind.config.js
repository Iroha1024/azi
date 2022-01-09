module.exports = {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      borderRadius: {
        inherit: 'inherit',
      },
      lineHeight: {
        0: '0',
      },
      transitionProperty: {
        height: 'height',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
