exports.up = function (knex) {
  return knex.schema.createTable("Tasks", (table) => {
    table.increments("id").primary();
    table.string("descricao").notNull();
    table.date("dataEstimada").notNull();
    table.date("DataConclusao").notNull();
    table.integer("IdUsuario").references("ID").inTable("Usuarios").notNull();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable('Tasks')
};
