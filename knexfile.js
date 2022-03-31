const knexFirebirdDialect = require("knex-firebird-dialect").default;

module.exports = {
  client: knexFirebirdDialect,
  connection: {
    host: "localhost",
    port: 3050,
    user: "sysdba",
    password: "vectordba",
    database: "C:/Projetos/taskBackend/EXPRESS.FDB",
    schemaName: "EXPRESS",
    lowercase_keys: true,
  },
  createDatabaseIfNotExists: true,
  debug: false,
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
