/* eslint-env node */
const properties = require('known-css-properties').all

module.exports = {
  extends: [
    'stylelint-config-recommended',
    'stylelint-config-prettier',
    'stylelint-config-html/svelte',
  ],
  plugins: ['stylelint-order'],
  rules: {
    'no-descending-specificity': null,
    // see: https://github.com/hudochenkov/stylelint-order/issues/63
    'order/properties-order': [...properties],
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global'],
      },
    ],
    'selector-class-pattern': null,
  },
  'color-no-hex': null,
  overrides: [
    {
      files: ['**/*.svelte'],
      customSyntax: 'postcss-html',
    },
  ],
}
