import pgPromise, { type IDatabase, type IInitOptions } from 'pg-promise'
import type { IConnectionParameters } from 'pg-promise/typescript/pg-subset.js'

const initOptions: IInitOptions = {
  capSQL: true,
  connect: ({ client, useCount }): void => {
    const { database } = client.connectionParameters
    console.info(`Connected to database: ${database ?? 'unknown'}. useCount = ${useCount}`)
  },
  disconnect: ({ client }): void => {
    const { database } = client.connectionParameters
    console.info(`Disconnecting from database ${database ?? 'unknown'}`)
  },
  error: (err: unknown): void => {
    console.error(err)
  },
}

export const pgp = pgPromise(initOptions)

const dbParams: IConnectionParameters = {
  host: 'POSTGRES_HOST',
  port: parseInt('POSTGRES_PORT', 10),
  database: 'POSTGRES_DATABASE',
  user: 'POSTGRES_USER',
  password: 'POSTGRES_PASSWORD',
  statement_timeout: 3000,
  connectionTimeoutMillis: 3000,
  max: 1,
  application_name: 'monorepo-esm-playground',
}

export const db: IDatabase<unknown> = pgp(dbParams)
