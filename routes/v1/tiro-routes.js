const express = require('express');
const { isAuth, isValidHostname } = require('../../middlewares/auth');
const playerController = require('../../controllers/player-controller');
const routes = express.Router();

routes.post('/createPlayer',isValidHostname, isAuth, playerController.createPlayer);
routes.get('/getAllPlayer',isValidHostname, isAuth, playerController.getAllPlayer);

module.exports = routes;
