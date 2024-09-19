export default {
  roots: ['<rootDir>/src', '<rootDir>/test'],
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  testRegex: '/test/.*.test.ts$',
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    "src/**/*.ts*"
  ],
  coverageThreshold: {
    "global": {
      "lines": 90,
      "statements": 90
    }
  }
};