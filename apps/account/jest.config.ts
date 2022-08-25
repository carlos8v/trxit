import { Config } from 'jest'

export default {
  preset: 'ts-jest',
  rootDir: '.',
  moduleNameMapper: {
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@typeorm/(.*)$': '<rootDir>/src/infra/db/typeorm/$1',
    '^@tests/(.*)$': '<rootDir>/tests/$1'
  }
} as Config
