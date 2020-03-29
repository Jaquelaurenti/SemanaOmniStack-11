const express = require('express');
const routes = express.Router();
const ongController = require('./controllers/OngController')
const incidentsController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/PerfilController')
const SessionController = require('./controllers/SessionController')

const { celebrate, Segments, Joi } = require('celebrate');

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2)
    })
}), ongController.create);
routes.get('/ongs', ongController.index);

// Não necessariamente criará algo no banco de dados, mas identifica a inteção que é criar uma sessão
routes.post('/sessions', SessionController.create);

routes.post('/incidents', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown(),

    [Segments.BODY]: Joi.object().keys({
        title: Joi.string().required(),
        description: Joi.string().required().email(),
        value: Joi.number().required()
    })

}),incidentsController.create);
routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}),incidentsController.index);
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required()
    }),
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()

}),incidentsController.delete);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required()
    }).unknown()
}),ProfileController.index);

module.exports = routes;