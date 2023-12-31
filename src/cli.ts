import * as path from 'path'
import { build } from 'gluegun'

/**
 * Load Dotenv if the module exists.
 */
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require('dotenv').config()
} catch {}

/**
 * Create the cli and kick it off
 */
async function run(argv) {
  // create a CLI runtime
  const cli = build()
    .brand('kysely-tools')
    .src(__dirname)
    .plugins('./node_modules', { matching: 'kysely-tools-*', hidden: true })
    .plugin(
      path.resolve(process.cwd(), 'node_modules/@lenne.tech/gluegun-menu/dist'),
      {
        commandFilePattern: ['*.js'],
        extensionFilePattern: ['*.js'],
      }
    )
    .help() // provides default for help, h, --help, -h
    .version() // provides default for version, v, --version, -v
    .create()
  // enable the following method if you'd like to skip loading one of these core extensions
  // this can improve performance if they're not necessary for your project:
  // .exclude(['meta', 'strings', 'print', 'filesystem', 'semver', 'system', 'prompt', 'http', 'template', 'patching', 'package-manager'])
  // and run it
  const toolbox = await cli.run(argv)

  // send it back (for testing, mostly)
  return toolbox
}

module.exports = { run }
