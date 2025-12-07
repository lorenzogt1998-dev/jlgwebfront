// postcss.config.cjs
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {}, // 👈 nuevo nombre del plugin
    autoprefixer: {},
  },
};