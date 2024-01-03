import * as fs from 'fs'
import * as path from 'path'
// import { Pool } from 'pg'
import {
  FileMigrationProvider,
  Kysely,
  MigrationResultSet,
  Migrator,
  // PostgresDialect,
} from 'kysely'
import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'

const CONFIG_FILE_NAME = 'kysely-tools.json'

type LoadConfigProps = {
  root?: string
  configPath: string
}
type LoadConfig = KyselyConfig
const loadConfig = async ({
  root,
  configPath,
}: LoadConfigProps): Promise<LoadConfig> => {
  const configFile = path.resolve(root || process.cwd(), configPath)

  if (!fs.existsSync(configFile)) {
    throw new Error(`Config not found at ${configFile}`)
  }

  const { kyselyToolsConfig } = await import(configFile)

  return kyselyToolsConfig
}

type KyselyConfigProps = {
  db: Kysely<unknown>
  migrationFolder?: string
}
type KyselyConfig = {
  db: Kysely<unknown>
  migrationFolder: string
}
const defineConfig = ({
  db,
  migrationFolder,
}: KyselyConfigProps): KyselyConfig => ({
  db,
  migrationFolder: migrationFolder || path.resolve(process.cwd(), 'migrations'),
})

type Config = {
  DATABASE_URL: string
  MIGRATION_PATH: string
}

function getConfig(): Config {
  try {
    const configPath = path.resolve(process.cwd(), CONFIG_FILE_NAME)
    const fileConfig = fs.readFileSync(configPath, 'utf8')
    const config = JSON.parse(fileConfig) as Config

    return {
      ...config,
      DATABASE_URL: config.DATABASE_URL.replace(
        '${DATABASE_URL}',
        process.env.DATABASE_URL
      ),
    }
  } catch (error) {
    throw new Error(
      `Error loading configuration, check if the ${CONFIG_FILE_NAME} file exist.`
    )
  }
}

// const db = new Kysely({
//   dialect: new PostgresDialect({
//     pool: new Pool({
//       connectionString: getConfig().DATABASE_URL,
//     }),
//   }),
// })

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function showResults(
  toolbox: GluegunMenuToolbox,
  { error, results }: MigrationResultSet
) {
  toolbox.print.info('')

  if (results) {
    results.forEach(({ status, migrationName, direction }) => {
      const message = `> ${status}: ${migrationName} (${direction})`
      switch (status) {
        case 'Success':
          toolbox.print.success(message)
          break
        case 'Error':
          toolbox.print.error(message)
          break

        default:
          toolbox.print.info(message)
          break
      }
    })
    if (results.length === 0) {
      toolbox.print.info('> No pending migrations to execute')
    }
  }
  if (error) {
    toolbox.print.error(error)
    process.exit(1)
  }
}

const getDb = async (): Promise<LoadConfig> =>
  loadConfig({ configPath: 'kysely-tools.config.ts' })

const getMigrator = async (): Promise<Migrator> => {
  const { db, migrationFolder } = await getDb()

  const migrator = new Migrator({
    db,
    provider: new FileMigrationProvider({
      path,
      fs: fs.promises,
      migrationFolder,
    }),
  })

  return migrator
}

export { getConfig, getMigrator, getDb, showResults, loadConfig, defineConfig }
