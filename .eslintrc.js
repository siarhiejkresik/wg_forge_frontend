module.exports = {
  env: {
    browser: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier', 'plugin:prettier/recommended'],
  rules: {
    'prettier/prettier': 'error',
  },
};
