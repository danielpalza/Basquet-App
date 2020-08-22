import React, { useState, useEffect } from 'react';
import {
  TextField,
  makeStyles,
  MenuItem,
  Button,
  Dialog,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';
import Fetch from './FetchBotones';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

//Estilos
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(2),
    },
  },
  box: {
    display: 'flex',
    justifyContent: 'center',
    padding: '0.3vw',
    '& > *': {
      margin: theme.spacing(2),
    },
  },
}));


let posiciones = [
  {
    value: 'puntaIzq',
    label: 'Punta izquierda',
  },
  {
    value: 'puntaDer',
    label: 'Punta derecha',
  },
  {
    value: 'ladoIzq',
    label: 'Lado izquierdo',
  },
  {
    value: 'ladoDer',
    label: 'Lado derecho',
  },
  {
    value: 'frente',
    label: 'Frente',
  },
];

//Agrega un nuevo tiro
function AgregarTiro(props) {
  let players =
    props.action.state.statReducer.players.length === 0
      ? [{ value: 'Seleccione' }]
      : props.action.state.statReducer.players.map((a) => {
          return { value: `${a.firstName} ${a.lastName}` };
        });
  const classes = useStyles();
  const [tiro, setTiro] = useState({
    tirador: '',
    distanciaM: 0,
    encesto: false,
    posicion: '',
  });

  //Manejo de cambios en el estado
  const handleChange = (event) => {
    event.target.name === 'tirador' &&
      setTiro({ ...tiro, tirador: event.target.value });
    event.target.name === 'distanciaM' &&
      setTiro({ ...tiro, distanciaM: event.target.value });
    event.target.name === 'encesto' &&
      setTiro({ ...tiro, encesto: !tiro.encesto });
    event.target.name === 'posicion' &&
      setTiro({ ...tiro, posicion: event.target.value });
  };

  //Validacion de datos
  function ValidacionTiro() {
    tiro.posicion.length == 0 &&
      props.action.messageIn({ message: 'Ingrese la posicion' });
    tiro.distanciaM == 0 &&
      props.action.messageIn({ message: 'Ingrese la distancia' });
    tiro.tirador.length == 0 &&
      props.action.messageIn({ message: 'Ingrese un tirador' });
    if (
      tiro.tirador.length != 0 &&
      tiro.distanciaM > 0 &&
      tiro.posicion.length != 0
    ) {
      CargarTiro();
    }
  }

  //Carga de tiradores
  async function CargarTiradores() {
    const state = {
      body: {},
      use: ['player', 'getAllPlayer'],
      mod: 'GET',
      token: props.action.state.statReducer.user.token,
      action: props.action.playerLoad,
    };

    await Fetch(state);
    props.action.reloadFalse();
  }

  //Carga de nuevo tiro
  async function CargarTiro() {
    const state = {
      body: { ...tiro },
      use: ['tiro', 'createTiro'],
      mod: 'POST',
      token: props.action.state.statReducer.user.token,
      action: props.action.messageIn,
    };

    await Fetch(state);
    props.action.reloadTrue();
    props.handleRoute('');
  }

  //Actualiza los tiradores si surgio un cambio
  useEffect(() => {
    CargarTiradores();
  }, [props.action.state.statReducer.reload]);

  return (
    <Dialog
      open={props.open}
      onClose={() => props.handleRoute('')}
      aria-labelledby="simple-dialog-title"
    >
      <div className={classes.root}>
        <div className={classes.box}>
          <TextField
            id="standard-select-mes"
            select
            name="tirador"
            label="Tirador"
            value={tiro.tirador}
            onChange={handleChange}
            helperText="Seleccione el tirador"
          >
            {players.map((e) => (
              <MenuItem key={e.value} value={e.value}>
                {e.value}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="filled-basic"
            name="distanciaM"
            label="Distancia en metros"
            variant="filled"
            onChange={handleChange}
          />
        </div>
        <div className={classes.box}>
          <FormControlLabel
            control={
              <Checkbox
                checked={tiro.encesto}
                onChange={handleChange}
                name="encesto"
              />
            }
            label="¿El tiro encesto?"
          />

          <TextField
            id="standard-select-mes"
            select
            name="posicion"
            label="Posicion"
            value={tiro.posicion}
            onChange={handleChange}
            helperText="Seleccione la posicion"
          >
            {posiciones.map((e) => (
              <MenuItem key={e.value} value={e.value}>
                {e.label}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className={classes.box}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => ValidacionTiro()}
          >
            Agregar
          </Button>
          <Button
            variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => props.handleRoute('')}
          >
            Cancelar
          </Button>
        </div>
      </div>
    </Dialog>
  );
}

export default AgregarTiro;
