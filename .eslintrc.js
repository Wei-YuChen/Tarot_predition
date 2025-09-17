module.exports = {
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
    'react/jsx-curly-brace-presence': ['error', 'never'],
    'prefer-const': 'error',
    'react/no-unescaped-entities': 'off',
  },
};
