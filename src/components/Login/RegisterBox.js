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
  const [message, setMessage] = useState('');
  const [click, setClick] = useState(false);
  const [user, setUser] = useState({
    body: { email: '', password: '', confirmacion: '', name: '', lastName: '' },
    use: ['coach', 'createCoach'],
    mod: 'POST',
    action: 'MESSAGE_IN',
  });

  //Verificamos que las claves sean iguales
  const handleConfirmacion = () => {
    if(user.body.password === user.body.confirmacion){
      setClick(true)
      props.setRuta('LOGIN');
      props.userLoad(user);
    }
    user.body.password !== user.body.confirmacion &&
      props.handleClick({message:'Las contraseñas no son iguales'});
  };

  return (
    <div>
      <Box className={classes.boxText} m={3}>
        <TextField
          id="standard-basic"
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
        <Box className={classes.boxText} m={3}>
          <TextField
            id="standard-basic"
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
            id="standard-basic"
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
            id="standard-basic"
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
