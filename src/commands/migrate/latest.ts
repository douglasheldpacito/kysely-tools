import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'
import { db, migrator, showResults } from '../../config'
import { GluegunCommand } from 'gluegun'

module.exports = {
  name: 'latest',
  alias: ['l'],
  description: 'Run all pending migrations',
  run: async (toolbox: GluegunMenuToolbox) => {
    const spinner = toolbox.print.spin({
      text: 'Running all pending migrations...',
    })

    const results = await migrator.migrateToLatest()
    showResults(toolbox, results)

    spinner.stop()
    db.destroy()
  },
} as GluegunCommand
