const express = require('express');
const { isAuth, isValidHostname } = require('../../middlewares/auth');
const coachController = require('../../controllers/coach-controller');
const routes = express.Router();

routes.post('/createCoach', isValidHostname, coachController.createCoach);
routes.post('/login', isValidHostname, coachController.login);

module.exports = routes;
