module.exports = {
  'env': {
    "jest/globals": true,
    'browser': true,
    'es6': true
  },
  'extends': [
    'standard',
    'standard-with-typescript'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'project': './tsconfig.eslint.json'
  },
  'plugins': [
    '@typescript-eslint',
    'jest'
  ]
}
