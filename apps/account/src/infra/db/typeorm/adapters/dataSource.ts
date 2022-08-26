import 'dotenv/config'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { resolve } from 'path'

export const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  schema: process.env.DB_SCHEMA,
  entities: [`${resolve(__dirname, '..', 'entities')}/*.{ts,js}`],
  migrations: [`${resolve(__dirname, '..', 'migrations')}/*.{ts,js}`],
  connectTimeoutMS: 1000 * 10,
  migrationsRun: true
})

export const initializeDatabaseConnection = async () => {
  try {
    if (dataSource.isInitialized) return
    await dataSource.initialize()
    console.log('[@cube/auth]: Database connection established')
  } catch (error) {
    console.log(error)
    console.error('Database not initialized')
    process.exit(1)
  }
}

export const destroyDatabaseConnection = async () => dataSource.destroy()
