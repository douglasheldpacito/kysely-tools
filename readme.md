# kysely-tools CLI

A CLI for kysely-tools.

## Installation

```shell
$ npm install kysely-tools --save-dev
```

or

```shell
$ yarn add -D kysely-tools
```

## Configuration

Create the file configuration for the kysely-tools in the root directory.
kysely-tools.json

```json
{
  "DATABASE_URL": "${DATABASE_URL}",
  "MIGRATION_PATH": "./migrations"
}
```

## Running

```shell
$ npx kysely-tools
```

## Commands and Helpers

**Create migration**
Generate a migration file.

```shell
$ npx kysely-tools migrate create MigrationFileName

# alias
# $ npx kysely-tools m c MigrationFileName
```

**Latest migration**
Run all pending migrations.

```shell
$ npx kysely-tools migrate latest

# alias
# $ npx kysely-tools m l
```

**Up migration**
Run a pending migration.

```shell
$ npx kysely-tools migrate up

# alias
# $ npx kysely-tools m u
```

**Down migration**
Rollback the last migration.

```shell
$ npx kysely-tools migrate down

# alias
# $ npx kysely-tools m d
```

**Redo migration**
Down and Up the latest migration.

```shell
$ npx kysely-tools migrate redo

# alias
# $ npx kysely-tools m r
```

**To migration**
The migration will be to the specified file.

```shell
$ npx kysely-tools migrate to 20231124185924_this_is_a_test

# alias
# $ npx kysely-tools m t 20231124185924_this_is_a_test
```

or

In case you want to migrate all the way down, you can use a special constant NO_MIGRATIONS

```shell
$ npx kysely-tools migrate to NO_MIGRATIONS

# alias
# $ npx kysely-tools m t NO_MIGRATIONS
```

# License

MIT - see LICENSE
