const jwt = require('jsonwebtoken');

//Valida el host del pedido
const isValidHostname = (req, res, next) => {
  const hostValid = ['baloncesto-app.herokuapp.com','localhost'];

  if (hostValid.includes(req.hostname)) {
    next();
  } else {
    res.status(403).send({ status: 'ACCESS_DENIED', message: 'WRONG_HOST' });
  }
};

//Verifica que el token enviado sea correcto
const isAuth = (req, res, next) => {
  try {
    const { token } = req.headers;
    if (token) {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } else {
      throw {
        code: 403,
        status: 'ACCESS_DENIED',
        message: 'missing header: token',
      };
    }
  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};

module.exports = { isAuth, isValidHostname };
