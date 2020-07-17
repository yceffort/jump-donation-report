module.exports = {
  extends: ['airbnb-typescript'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/indent': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'implicit-arrow-linebreak': ['off']
  },
};