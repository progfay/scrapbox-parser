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
  ],
  'rules': {
    '@typescript-eslint/consistent-type-assertions': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/method-signature-style': 'off',
    '@typescript-eslint/member-delimiter-style': 'off',
    '@typescript-eslint/no-namespace': 'off',
    '@typescript-eslint/no-unused-vars': [2, { args: 'none' }],
    '@typescript-eslint/prefer-nullish-coalescing': 'off',
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off'
  }
}
