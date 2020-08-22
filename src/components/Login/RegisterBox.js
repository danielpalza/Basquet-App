import React, { useState } from 'react';
import { makeStyles, TextField, Button, Box } from '@material-ui/core';

//Estilo
const useStyle = makeStyles((theme) => ({
  boxText: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1),
  },
}));

//Registro de nuevos usuarios
const RegisterBox = (props) => {
  const classes = useStyle();
  const [click, setClick] = useState(false);
  const [user, setUser] = useState({
    body: { email: '', password: '', confirmacion: '', name: '', lastName: '' },
    use: ['coach', 'createCoach'],
    mod: 'POST',
    action: 'MESSAGE_IN',
  });

  //Verificamos que las claves sean iguales
  const handleConfirmacion = () => {
    user.body.lastName.length === 0 &&
      props.handleClick({ message: 'Ingrese un Apellido' });
    user.body.name.length === 0 &&
      props.handleClick({ message: 'Ingrese un Nombre' });
    user.body.password !== user.body.confirmacion &&
      props.handleClick({ message: 'Las contraseñas no son iguales' });
    user.body.password.length === 0 &&
      props.handleClick({ message: 'Ingrese una contraseña' });
    user.body.email.length === 0 &&
      props.handleClick({ message: 'Ingrese un email' });
    if (
      user.body.password === user.body.confirmacion &&
      user.body.password.length > 0 &&
      user.body.lastName.length > 0
    ) {
      setClick(true);
      props.setRuta('LOGIN');
      props.userLoad(user);
    }
  };

  return (
    <div>
      <Box className={classes.boxText} m={3}>
        <TextField
          id="email"
          color="primary"
          label="Email"
          onChange={(e) => {
            setUser({
              ...user,
              body: { ...user.body, email: e.target.value },
            });
          }}
        />
      </Box>
      <Box display="flex">
        <Box className={classes.boxText} m={3}>
          <TextField
            id="contraseña"
            color="primary"
            type="password"
            label="Contraseña"
            onChange={(e) => {
              setUser({
                ...user,
                body: { ...user.body, password: e.target.value },
              });
            }}
          />
        </Box>
        <Box className={classes.boxText} m={3}>
          <TextField
            id="confirmacion"
            color="primary"
            type="password"
            label="Confirmación"
            onChange={(e) => {
              setUser({
                ...user,
                body: { ...user.body, confirmacion: e.target.value },
              });
            }}
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box className={classes.boxText} m={3}>
          <TextField
            id="nombre"
            color="primary"
            label="Nombre"
            onChange={(e) => {
              setUser({
                ...user,
                body: { ...user.body, name: e.target.value },
              });
            }}
          />
        </Box>
        <Box className={classes.boxText} m={3}>
          <TextField
            id="apellido"
            color="primary"
            label="Apellido"
            onChange={(e) => {
              setUser({
                ...user,
                body: { ...user.body, lastName: e.target.value },
              });
            }}
          />
        </Box>
      </Box>

      <Box justifyContent="center" padding={2}>
        <Box m={2}>
          <Button
            fullWidth
            disabled={click}
            variant="contained"
            color="primary"
            onClick={() => {
              handleConfirmacion();
            }}
          >
            Registrar
          </Button>
        </Box>
        <Box m={2}>
          <Button
            fullWidth
            variant="contained"
            color="secondary"
            onClick={(e) => {
              props.setRuta('LOGIN');
            }}
          >
            Iniciar sesion
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default RegisterBox;
