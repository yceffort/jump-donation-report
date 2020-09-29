module.exports = {
  extends: [
    "eslint-config-yceffort/typescript",
  ],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@typescript-eslint/indent': ['off'],
    'react/jsx-one-expression-per-line': ['off'],
    'implicit-arrow-linebreak': ['off'],
    'react/require-default-props': ['off'],
    'react/jsx-props-no-spreading': ['off'],
    'no-nested-ternary': ['off'],
    'react/prop-types': ['off']
  },
};