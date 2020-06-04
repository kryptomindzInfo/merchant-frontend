const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier', 'prettier/react', 'plugin:react/recommended'],
  plugins: ['prettier', 'redux-saga', 'react', 'react-hooks', 'jsx-a11y'],
  env: {
    jest: true,
    browser: true,
    node: true,
    es6: true,
  },
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'prettier/prettier': ['error', prettierOptions],
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    'import/no-extraneous-dependencies': 0,
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/no-this-in-sfc": 0,
    "array-callback-return":0,
    "consistent-return": 0,
    "no-unused-vars": 0,
    "linebreak-style": ['error', 'unix'],
    'redux-saga/no-yield-in-race': 2,
    'redux-saga/yield-effects': 2,
    'require-yield': 0,
    'no-underscore-dangle': 0,
    "react/prop-types": 0,
    "no-param-reassign": 0,
    "react/prefer-stateless-function": 0,
    "react/destructuring-assignment": 0,
    "react/jsx-no-bind": 0,
    "jsx-a11y/anchor-has-content": 0,
    "react/jsx-no-target-blank": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "jsx-a11y/label-has-for": 0,
    "jsx-a11y/label-has-associated-control": 0,
    "no-nested-ternary": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/alt-text": 0,
    "import/named":0,
    indent: [
      2,
      2,
      {
        SwitchCase: 1,
      },
    ],
  },
};
