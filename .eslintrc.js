module.exports = {
  parserOptions: {},
  extends: 'airbnb-base',
  rules: {
    'quote-props': 'off',
    'no-console': 'off',
    'linebreak-style': 'off',
    'semi': 'off',
    'indent': 'off',
    'implicit-arrow-linebreak': 'off',
    'operator-linebreak': 'off',
    'arrow-parens': 'off',
    'no-confusing-arrow': 'off',
    'prettier/prettier': 'error',
  },
  plugins: ['prettier'],
}