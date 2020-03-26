const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/OngController')
const incidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/PerfilController')
const SessionController = require('./controllers/SessionController')

routes.post('/ongs', ongController.create);
routes.get('/ongs', ongController.index);

// Não necessariamente criará algo no banco de dados, mas identifica a inteção que é criar uma sessão
routes.post('/sessions', SessionController.create);

routes.post('/incidents', incidentsController.create);
routes.get('/incidents', incidentsController.index);
routes.delete('/incidents/:id', incidentsController.delete);
routes.get('/profile', ProfileController.index);

module.exports = routes;