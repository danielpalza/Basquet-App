const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Coach = require('../mongo/models/coach-mongo');

// Se crea un metodo para comprobar que el password ingresado sea el mismo del usuario en la base
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const coach = await Coach.findOne({ email });

    if (coach) {
      const isOk = await bcrypt.compare(password, coach.password);

      if (isOk) {
        const token = jwt.sign(
          {
            _id: coach._id,
            firstName: coach.firstName,
            lastName: coach.lastName,
            email: coach.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: 60 * 120,
          }
        );
        res.send({ status: 'OK', data: { token, expiresIn: 60 * 60, email } });
      } else {
        throw { message: 'INVALID_PASSWORD' };
      }
    } else {
      throw { message: 'USER_NOT_FOUND' };
    }
  } catch (e) {
    res.status(500).send({ status: 'ERROR', message: e.message });
  }
};

//Crea un nuevo coach
const createCoach = async (req, res) => {
  try {
    const { password, email, name, lastName } = req.body;
    const salt = 10;

    let newName = name[0].toUpperCase() + name.slice(1);
    let newLastName = lastName[0].toUpperCase() + lastName.slice(1);

    const coach = new Coach();

    coach.password = await bcrypt.hash(password, salt);
    coach.firstName = newName;
    coach.lastName = newLastName;
    coach.email = email;

    await coach.save();

    res.send({ status: 'USER_CREATED', message: 'Usuario creado' });
  } catch (e) {
    if (e.code && e.code === 11000) {
      res
        .status(400)
        .send({ status: 'DUPLICATED', message: 'El email ya esta registrado' });
    } else {
      res.status(400).send({ status: 'ERROR', message: 'Error en el proceso' });
    }
  }
};

module.exports = {
  createCoach,
  login,
};
