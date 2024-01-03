import { Kysely, PostgresDialect } from 'kysely'
import { defineConfig, loadConfig } from './config'
import { Pool } from 'pg'

describe('when ', () => {
  it('should ', async () => {
    const config = await loadConfig({
      configPath: './example/kysely-tools.config.ts',
    })

    expect(config).toEqual({
      db: expect.anything(),
      migrationFolder: expect.stringContaining('/migrations'),
    })
  })
})

describe('when ', () => {
  it('should ', async () => {
    const config = defineConfig({
      db: new Kysely({
        dialect: new PostgresDialect({
          pool: new Pool({
            connectionString:
              'postgresql://test:test@localhost:5432/db-name?schema=public',
          }),
        }),
      }),
    })

    expect(config).toEqual({
      db: expect.anything(),
      migrationFolder: expect.stringContaining('/migrations'),
    })
  })
})
