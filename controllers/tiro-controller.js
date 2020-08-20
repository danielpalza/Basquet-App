const jwt = require('jsonwebtoken');
const Tiro = require('../mongo/models/tiro-mongo');

const createTiro = async (req, res) => {
  try {
    const { idCoach, tirador, posicion, encesto,distanciaM } = req.body;

    const tiro = new Tiro();
      tiro.idCoach= idCoach;
        tiro.tirador= tirador;
          tiro.posicion= posicion;
            tiro.encesto= encesto;
              tiro.distanciaM= distanciaM;
      await tiro.save();

    res.send({ status: 'OK', message: 'Tiro guardado' });

  } catch (error) {
    res.status(400).send({ status: 'ERROR', message: error.message });
  }
};

const getAllTiro = async (req, res) => {
  try {
    const { token } = req.headers;
    const { payload } = jwt.decode(token, { complete: true });
    const query = await Tiro.find({ idCoach: payload._id });
    res.send({ status: 'OK', data: query });
  } catch (e) {
    res.send({ status: 'ERROR', message: e.message });
  }
};


module.exports = {
  createTiro,
  getAllTiro,

};
