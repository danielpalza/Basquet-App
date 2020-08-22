const jwt = require('jsonwebtoken');
const Tiro = require('../mongo/models/tiro-mongo');

const createTiro = async (req, res) => {
  try {
    const { token } = req.headers;
    const { payload } = jwt.decode(token, { complete: true });
    const { tirador, posicion, encesto, distanciaM } = req.body;

    const tiro = new Tiro();
    tiro.idCoach = payload._id
    tiro.tirador = tirador;
    tiro.posicion = posicion;
    tiro.encesto = encesto;
    tiro.distanciaM = distanciaM;
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
    const tirosRaw = await Tiro.find({ idCoach: payload._id });
    let exitos = 0;
    let fallos = 0;
    let tiradores = [];
    let tiros = [];

    //Tiradores y sus tiros
    tirosRaw.map((a, index, array) => {
      let cantidadTiros = 0;

      if(!tiradores.includes(a.tirador)){

        array.map((e) => {

            if (a.tirador == e.tirador ){
              cantidadTiros++;
            }



      })
      tiradores.push(a.tirador);
      tiros.push(cantidadTiros);

      }


    });

    //Aciertos de los encestos
    tirosRaw.map((a) =>a.encesto=="true" ? exitos++ : fallos++);
    res.send({ status: 'OK', data: {tirosRaw, tiros, tiradores, encestos:[exitos,fallos] } });
  } catch (e) {
    res.send({ status: 'ERROR', message: e.message });
  }
};

module.exports = {
  createTiro,
  getAllTiro
};
