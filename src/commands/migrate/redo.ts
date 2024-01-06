import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'
import { getDb, getMigrator, showResults } from '../../config'
import { GluegunCommand } from 'gluegun'

module.exports = {
  name: 'redo',
  alias: ['r'],
  description: 'Down and Up the latest migration',
  run: async (toolbox: GluegunMenuToolbox) => {
    const spinner = toolbox.print.spin({
      text: 'Reverting migration...',
    })

    const { db } = await getDb()
    const migrator = await getMigrator()

    const downResults = await migrator.migrateDown()
    showResults(toolbox, downResults)

    const upResults = await migrator.migrateUp()
    showResults(toolbox, upResults)

    spinner.stop()
    db.destroy()
  },
} as GluegunCommand
