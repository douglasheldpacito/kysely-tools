import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'
import { db, migrator, showResults } from '../../config'
import { GluegunCommand } from 'gluegun'

module.exports = {
  name: 'down',
  alias: ['d'],
  description: 'Rollback the last migration',
  run: async (toolbox: GluegunMenuToolbox) => {
    const spinner = toolbox.print.spin({
      text: 'Running single migration',
    })
    const results = await migrator.migrateDown()
    showResults(toolbox, results)

    spinner.stop()
    db.destroy()
  },
} as GluegunCommand
