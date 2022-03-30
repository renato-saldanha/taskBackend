exports.up = function (knex) {
  return knex.schema.createTable("Tasks", (table) => {
    table.increments("id").primary();
    table.string("descricao").notNull();
    table.dateTime("dataEstimada").notNull();
    table.dateTime("DataConclusao").notNull();
    table.integer("IdUsuario").references("ID").inTable("Usuarios").notNull();
  });
};

exports.down = function (knex) {
  //return knex.schema.dropTable('Tasks')
};
