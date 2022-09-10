import { defineConfig } from 'vitest/config'

import { resolve } from 'path'

export default defineConfig({
  test: {
    alias: {
      '@application': resolve(__dirname, 'src/application'),
      '@domain': resolve(__dirname, 'src/domain'),
      '@infra': resolve(__dirname, 'src/infra'),
      '@typeorm': resolve(__dirname, 'src/infra/db/typeorm'),
      '@tests': resolve(__dirname, 'tests')
    }
  }
})
