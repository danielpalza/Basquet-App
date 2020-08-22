import React, { useState } from 'react';
import { TextField, makeStyles, MenuItem, Button, Dialog } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';


//Carga de estilo

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),

    },
  },
  box:{
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    padding:"0.3vw",
    '& > *': {
      margin: theme.spacing(2),

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
    event.target.name === 'firstName' &&
      setPlayer({ ...player, firstName: event.target.value });
    event.target.name === 'lastName' &&
        setPlayer({ ...player, lastName: event.target.value });
    event.target.name === 'legajo' &&
        setPlayer({ ...player, legajo: event.target.value });
  };

  async function CargarPlayer () {
    const state = {
      body: { ...player},
      use: ['player', 'createPlayer'],
      mod: 'POST',
      token: props.action.state.statReducer.user.token,
      action: 'MESSAGE_IN',
    };
    props.action.loadBody(state);
    await props.action.fetchTrue();
    props.action.reloadTrue();
    props.handleRoute("");
  };

  return (
    <Dialog
      open={props.open}
      onClose={()=>props.handleRoute("")}
      aria-labelledby="simple-dialog-title"
    >
    <div className={classes.root}>
      <div className={classes.box}>
        <TextField
          id="filled-basic"
          name="firstName"
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
      <div className={classes.box}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={CargarPlayer}
        >
          Agregar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
          onClick={()=>props.handleRoute("")}
        >
          Cancelar
        </Button>
      </div>
      </div>
    </Dialog>
  );
}

export default AgregarPlayer
