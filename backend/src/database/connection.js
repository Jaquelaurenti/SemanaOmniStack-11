const knex = require('knex');
const config = require('../../knexfile');
// Verifico se estou no ambiente de Teste ou no Ambiente de Dev da aplicação 
// para que os bancos não sejam sobrepostos;
const configAmbiente  = process.env.NODE_ENV === 'test' ? config.test : config.development;
const connection = knex(configAmbiente);

module.exports = connection;