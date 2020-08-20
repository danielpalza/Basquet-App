const jwt = require('jsonwebtoken');

const isValidHostname = (req, res, next) => {
  const hostValid = [ 'localhost'];

  if (hostValid.includes(req.hostname)) {
      next();
  } else {
      res.status(403).send({ status: 'ACCESS_DENIED', message: "WRONG_HOST" });
  }
};

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
        message: 'missing header: token'
      };
    }


  } catch (e) {
    res
      .status(e.code || 500)
      .send({ status: e.status || 'ERROR', message: e.message });
  }
};


module.exports = { isAuth, isValidHostname};
