module.exports = {
  moduleFileExtensions: [
    'ts',
    'js'
  ],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
  },
  globals: {
    'ts-jest': {
      tsConfig: 'tsconfig.json'
    }
  },
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  testMatch: [
    '**/tests/**/*.test.ts'
  ]
}
