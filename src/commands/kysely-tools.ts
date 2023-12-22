import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'
import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'kysely-tools',
  hidden: true,
  run: async (toolbox: GluegunMenuToolbox) => {
    const { print, menu } = toolbox

    print.info('Welcome to Kysely Tools')

    await menu.showMenu(null, {
      showHelp: false,
    })
  },
} as GluegunCommand

module.exports = command
