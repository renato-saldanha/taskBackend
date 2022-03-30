const config = require('../knexfile.js');
const knex = require('knex')(config);


knex.migrate.lastest([config]);
module.exports = knex;


//knex migrate: make TABLE -- cria uma sequencia de execuções de comandos no banco