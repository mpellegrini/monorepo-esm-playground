import {
  POSTGRES_HOST,
  POSTGRES_PORT,
  POSTGRES_DATABASE,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_APP_NAME,
} from '$env/static/private'

import type { IConnectionParameters } from 'pg-promise/typescript/pg-subset.js'
import pgPromise, { type IDatabase, type IInitOptions } from 'pg-promise'

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
  host: POSTGRES_HOST,
  port: Number(POSTGRES_PORT),
  ssl: true,
  database: POSTGRES_DATABASE,
  user: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  statement_timeout: 5000,
  connectionTimeoutMillis: 5000,
  max: 10,
  application_name: POSTGRES_APP_NAME ?? 'pg-promise',
}
export const db: IDatabase<unknown> = pgp(dbParams)
