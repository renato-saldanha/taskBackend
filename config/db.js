const config = require('../knexfile.js');
const knex = require('knex')(config);


//knex.migrate.latest([config]); //QUANDO CHAMAR O ARQUIVO, ELE RODA O "KNEX MIGRATE:LATEST"
module.exports = knex;


//knex migrate: make TABLE -- cria uma sequencia de execuções de comandos no banco