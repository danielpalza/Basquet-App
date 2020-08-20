import React, { useState } from 'react';
import { TextField, makeStyles, MenuItem, Button, Dialog } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';


//Carga de estilo

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
      width: '25ch',
    },
  },
}));

//Funcion agregar

function AgregarPlayer(props) {
  const classes = useStyles();
  const [player, setPlayer] = useState({
    firstName: '',
    lastName:'',
    legajo: '',
  })

  const handleChange = (event) => {
    event.target.name === 'fistName' &&
      setPlayer({ ...player, fistName: event.target.value });
    event.target.name === 'lastName' &&
        setPlayer({ ...player, lastName: event.target.value });
    event.target.name === 'legajo' &&
        setPlayer({ ...player, legajo: event.target.value });
  };

  const HandleRoute = () => {
    props.setRuta('');
  };

  const CargarPlayer = () => {
    const state = {
      body: { ...player},
      use: ['player', 'createPlayer'],
      mod: 'POST',
      token: props.action.state.statReducer.user.token,
      action: 'MESSAGE_IN',
    };
    props.action.loadBody(state);
    props.action.fetchTrue();
    props.action.reloadTrue();
    HandleRoute();
  };

  return (
    <Dialog
      open={props.open}
      onClose={HandleRoute}
      aria-labelledby="simple-dialog-title"
    >
      <div className={classes.root}>
        <TextField
          id="filled-basic"
          name="fistName"
          label="Nombre"
          variant="filled"
          onChange={handleChange}
        />
        <TextField
          id="filled-basic"
          name="lastName"
          label="Apellido"
          variant="filled"
          onChange={handleChange}
        />
        <TextField
          id="filled-basic"
          name="legajo"
          label="Legajo"
          variant="filled"
          onChange={handleChange}
        />
      </div>
      <div className={classes.root}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={AgregarEquipo}
        >
          Agregar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={HandleRoute}
        >
          Cancelar
        </Button>
      </div>
    </Dialog>
  );
}

export default AgregarPlayer
