// @ts-nocheck
module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano'),
    require('postcss-import'),
    require('postcss-url'),
    // require('tailwindcss')('./tailwind.config.js'),
    // require('tailwindcss/nesting'),
    require('postcss-combine-media-query'),
    require('postcss-combine-duplicated-selectors')({
      removeDuplicatedProperties: true,
      removeDuplicatedValues: false,
    }),

    require('postcss-reporter'),
  ],
};
