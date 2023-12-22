import * as fs from 'fs'
import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'
import { getConfig } from '../../config'
import { GluegunCommand } from 'gluegun'

const TEMPLATE = `import { Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {}

export async function down(db: Kysely<any>): Promise<void> {}
`

module.exports = {
  name: 'create',
  alias: ['c'],
  hidden: false,
  description: 'Generate a migration file',
  run: async (toolbox: GluegunMenuToolbox) => {
    const { prompt, parameters } = toolbox

    let inputFile = parameters.first

    if (!inputFile) {
      const askMigrationName = {
        type: 'input',
        name: 'inputFile',
        message: 'Specify a name for the migration',
      }
      const resultPrompt = await prompt.ask([askMigrationName])

      if (resultPrompt.inputFile.trim() === '') {
        toolbox.print.error("error: missing required argument 'input file'.")
        process.exit(1)
      }

      inputFile = resultPrompt.inputFile
    }

    const wordPattern = new RegExp(
      [
        '[A-Z][a-z]+',
        '[A-Z]+(?=[A-Z][a-z])',
        '[A-Z]+',
        '[a-z]+',
        '[0-9]+',
      ].join('|'),
      'g'
    )

    const date = new Date().toISOString().replace(/[-:T]/g, '').split('.')[0]

    const formated = inputFile.match(wordPattern).join('_').toLowerCase()

    const { MIGRATION_PATH } = getConfig()

    const fileName = `${MIGRATION_PATH}/${date}_${formated}.ts`

    const mkdir = () => fs.mkdirSync(MIGRATION_PATH)
    try {
      if (!fs.lstatSync(MIGRATION_PATH).isDirectory()) {
        mkdir()
      }
    } catch {
      fs.mkdirSync(MIGRATION_PATH)
    }
    fs.writeFileSync(fileName, TEMPLATE, 'utf8')

    toolbox.print.success(`Created Migration: ${fileName}`)
  },
} as GluegunCommand
