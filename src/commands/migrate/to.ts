import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'
import { db, migrator, showResults } from '../../config'
import { GluegunCommand } from 'gluegun'
import { NO_MIGRATIONS } from 'kysely'

module.exports = {
  name: 'to',
  alias: ['t'],
  description:
    'The migration will be to the specified file. In case you want to migrate all the way down, you can use a special constant NO_MIGRATIONS',
  run: async (toolbox: GluegunMenuToolbox) => {
    const { prompt, parameters } = toolbox

    let migrationName = parameters.first

    if (!migrationName) {
      const resultPrompt = await prompt.ask({
        type: 'input',
        name: 'migrationName',
        message: 'Enter the migration name.',
      })

      if (resultPrompt.migrationName.trim() === '') {
        toolbox.print.error(
          "error: missing required argument 'migration name'."
        )
        process.exit(1)
      }

      migrationName = resultPrompt.migrationName
    }

    if (migrationName === 'NO_MIGRATIONS') {
      const { options } = parameters

      const isConfirmed =
        options.y || (await prompt.confirm("Ya'll ready for this?"))
      if (isConfirmed) {
        const spinner = toolbox.print.spin({
          text: 'Running all migrations...',
        })
        const results = await migrator.migrateTo(NO_MIGRATIONS)
        showResults(toolbox, results)

        spinner.stop()
      } else {
        toolbox.print.info('Cancelled migration')
      }
    } else {
      const spinner = toolbox.print.spin({
        text: `Running all migrations until ${migrationName}...`,
      })
      const results = await migrator.migrateTo(migrationName)
      showResults(toolbox, results)

      spinner.stop()
    }

    db.destroy()
  },
} as GluegunCommand
