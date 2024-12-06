/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  testEnvironment: 'node',
  roots: ["src"],
  transform: {
    '^.+.tsx?$': ['ts-jest', {}]
  },
  testMatch: [
    '**/*.test.ts', // Include only 'test' files, excluding type-only spec files
  ],
  passWithNoTests: true
}
