module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': 'standard',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': '@typescript-eslint/parser',
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
    'project': './tsconfig.json'
  },
  'plugins': ['@typescript-eslint'],
  'rules': {
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }]
  }
}
