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

const pgp = pgPromise(initOptions)

const dbParams: IConnectionParameters = {
  host: 'ep-tiny-thunder-942611.us-east-2.aws.neon.tech',
  port: 5432,
  ssl: true,
  database: 'hglegacy',
  user: 'hguser',
  password: 'gzwN1R7sPmiO',
  statement_timeout: 5000,
  connectionTimeoutMillis: 5000,
  max: 1,
  application_name: process.env['POSTGRES_APP_NAME'] ?? '',
}
export const db: IDatabase<unknown> = pgp(dbParams)
