import React, { useState } from 'react';
import { TextField, makeStyles, MenuItem, Button, Dialog, FormControlLabel, Checkbox } from '@material-ui/core';
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
    justifyContent:"center",
    padding:"0.3vw",
    '& > *': {
      margin: theme.spacing(2),

    },

  },

}));

let posiciones=[
  {
    value:"puntaIzq",
    label:"Punta izquierda"
  },
  {
    value:"puntaDer",
    label:"Punta derecha"
  },
  {
    value:"ladoIzq",
    label:"Lado izquierdo"
  },
  {
    value:"ladoDer",
    label:"Lado derecho"
  },
  {
    value:"frente",
    label:"Frente"
  },
]

//Funcion agregar

function AgregarTiro(props) {
  console.log("agregar tiro props:",props)
  const classes = useStyles();
  const [tiro,  setTiro] = useState({
    tirador: '',
    distanciaM: 0,
    encesto: false,
    posicion:''
  });

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

    const CargarTiro = () => {
    const state = {
      body: { ...tiro},
      use: ['tiro', 'createTiro'],
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
      onClose={()=>props.handleRoute("")}
      aria-labelledby="simple-dialog-title"
    >
    <div className={classes.root}>
      <div className={classes.box}>
        <TextField
          id="filled-basic"
          name="tirador"
          label="Tirador"
          variant="filled"
          onChange={handleChange}
        />

        <TextField
          id="filled-basic"
          name="distanciaM"
          label="Distancia en metros"
          variant="filled"
          onChange={handleChange}
        />


      </div>
      <div  className={classes.box}>
          <FormControlLabel
         control={<Checkbox checked={tiro.encesto} onChange={handleChange} name="encesto" />}
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
          onClick={CargarTiro}
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

export default AgregarTiro
