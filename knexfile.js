const knexFirebirdDialect = require("knex-firebird-dialect").default;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  client: knexFirebirdDialect,
  connection: {
    database: "C:/FDB/EXPRESS.FDB",
    user: "sysdba",
    password: "vectordba",
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
