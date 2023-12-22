import { GluegunMenuToolbox } from '@lenne.tech/gluegun-menu'
import { getConfig } from '../../config'

module.exports = {
  name: 'migrate',
  alias: ['m'],
  run: async (toolbox: GluegunMenuToolbox) => {
    const { print, menu } = toolbox

    try {
      getConfig()
    } catch (error) {
      print.error(error.message)
      process.exit(1)
    }

    await menu.showMenu('migrate', { showHelp: false })
  },
}
