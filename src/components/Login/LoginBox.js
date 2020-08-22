import React, { useState, useEffect } from 'react';
import { makeStyles, TextField, Button, Box } from '@material-ui/core';

//Estilo
const useStyle = makeStyles((theme) => ({
  boxText: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(3),
  },
}));

//Inicio de sesion
const LoginBox = (props) => {
  const classes = useStyle();
  const [user, setUser] = useState({
    body: { email: '', password: '' },
    use: ['coach', 'login'],
    mod: 'POST',
    action: 'USER_LOGIN',
  });

  // Manejo de faltas
  const handleConfirmacion = () => {
    user.body.password.length === 0 &&
      props.handleClick({message:'Debe ingresar una contraseña'});
    user.body.email.length === 0 &&
      props.handleClick({message:'Debe ingresar un email'});  
      if( user.body.password.length > 0 &&  user.body.email.length > 0){
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
      <Box className={classes.boxText} m={3}>
        <TextField
          id="password"
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
      </Box>
    </div>
  );
};

export default LoginBox;
