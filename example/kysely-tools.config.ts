import { Pool } from 'pg'
import { Kysely, PostgresDialect } from 'kysely'
import { defineConfig } from '../src/config'

const kyselyToolsConfig = defineConfig({
  db: new Kysely({
    dialect: new PostgresDialect({
      pool: new Pool({
        connectionString:
          'postgresql://test:test@localhost:5432/db-name?schema=public',
      }),
    }),
  }),
})

export { kyselyToolsConfig }
