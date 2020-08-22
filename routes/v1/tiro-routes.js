const express = require('express');
const { isAuth, isValidHostname } = require('../../middlewares/auth');
const tiroController = require('../../controllers/tiro-controller');
const routes = express.Router();

routes.post('/createTiro',isValidHostname, isAuth, tiroController.createTiro);
routes.get('/getAllTiro',isValidHostname, isAuth, tiroController.getAllTiro);


module.exports = routes;
