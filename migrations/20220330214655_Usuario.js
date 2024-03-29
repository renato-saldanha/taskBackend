
exports.up = function(knex) {
  return knex.schema.createTable('Usuarios', table => {
    table.increments('id').primary();
    table.string('nome').notNull();
    table.string('email').notNull();
    table.string('senha').notNull();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Usuarios');
};
