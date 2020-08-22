const jwt = require('jsonwebtoken');
const Player = require('../mongo/models/player-mongo');

const createPlayer = async (req, res) => {
  try {
    const { token } = req.headers;
    const { payload } = jwt.decode(token, { complete: true });

    const { firstName, lastName, legajo } = req.body;

    const player = new Player();
    player.firstName = firstName;
    player.lastName = lastName;
    player.legajo = legajo;
    player.idCoach = payload._id;
    await player.save();

    res.send({ status: 'OK', message: 'Jugador creado' });
  } catch (error) {
    if (error.code && error.code === 11000) {
      res.status(400).send({ status: 'DUPLICATED', message: error.message });
    } else {
      res.status(400).send({ status: 'ERROR', message: error.message });
    }
  }
};

const getAllPlayer = async (req, res) => {
  try {
    const { token } = req.headers;
    const { payload } = jwt.decode(token, { complete: true });
    const query = await Player.find({ idCoach: payload._id });
    res.send({ status: 'OK', data: query });
  } catch (e) {
    res.send({ status: 'ERROR', message: e.message });
  }
};

module.exports = {
  createPlayer,
  getAllPlayer,
};
