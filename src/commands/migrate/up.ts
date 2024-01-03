import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'
import { getDb, getMigrator, showResults } from '../../config'
import { GluegunCommand } from 'gluegun'

module.exports = {
  name: 'up',
  alias: ['u'],
  description: 'Run a pending migration',
  run: async (toolbox: GluegunMenuToolbox) => {
    const spinner = toolbox.print.spin({
      text: 'Running single migration',
    })

    const { db } = await getDb()
    const migrator = await getMigrator()

    const results = await migrator.migrateUp()
    showResults(toolbox, results)

    spinner.stop()
    db.destroy()
  },
} as GluegunCommand
