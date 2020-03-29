const express = require('express');
const routes = require('./routes')
const app = express();
// Importando o CORS para controle de segurança da aplicação
const cors = require('cors');
// Importando o errors do celebrate para maniular os erros de uma forma melhor
const {errors} = require('celebrate')

// desta forma permitimos que todo o nosso front end tenha acesso a aplicação
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;