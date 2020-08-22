import React, { useState } from 'react';
import {
  makeStyles,
  TextField,
  Button,
  Box,
  Typography,
} from '@material-ui/core';
import AccountCircle from '@material-ui/icons/AccountCircle';


//Estilo
const useStyle = makeStyles((theme) => ({
  boxText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
}));

// Carga datos de la ultima conexion
const LastUser = (props) => {
  const classes = useStyle();
  let email = localStorage.getItem('lastUserLogin');
  const [user, setUser] = useState({
    body: { email: email, password: '' },
    use: ['coach', 'login'],
    mod: 'POST',
    action: 'USER_LOGIN',
  });

  // Manejo de faltas
  const handleConfirmacion = () => {
    user.body.password.length === 0 &&
      props.handleClick('Debe ingresar una contraseña');
    user.body.password.length > 0 && props.userLoad(user);
  };

  return (
    <div>
      <Box className={classes.boxText} m={3}>
        <AccountCircle style={{ fontSize: '7vw', margin: '1vw' }} />
        <Typography variant="h5" align="center">
          {email}
        </Typography>
      </Box>
      <Box className={classes.boxText} m={3}>
        <TextField
          id="standard-basic"
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
      <Box justifyContent="center" padding={2}>
        <Box m={2}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={(e) => {
              handleConfirmacion();
            }}
          >
            Iniciar sesion
          </Button>
        </Box>
        <Box m={2}>
          <Button
            fullWidth={true}
            variant="contained"
            color="secondary"
            onClick={(e) => {
              props.setRuta('REGISTER');
            }}
          >
            Registrar
          </Button>
        </Box>
        <Box m={2}>
          <Button
            fullWidth={true}
            color="secondary"
            onClick={(e) => {
              props.setRuta('LOGIN');
            }}
          >
            No soy yo
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default LastUser;
