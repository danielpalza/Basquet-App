import React, { useState, useEffect } from 'react';
import {
  makeStyles,
  useTheme,
  CssBaseline,
  Box,
  Snackbar,
  IconButton
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Barra from './Barra';
import PieChart from "./Graficos/PieChart"
import AgregarPlayer from "./Botones/AgregarPlayer"
import AgregarTiro from "./Botones/AgregarTiro"
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/stats/reducer';
import { mapDispatchToProps } from '../../store/stats/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

function Main(props) {
  //Guardado de token nuevo
  if (props.state.statReducer.user.token !== undefined) {
    localStorage.setItem('token', props.state.statReducer.user.token);
  }
  const token = props.state.statReducer.user.token
    ? props.state.statReducer.user.token
    : localStorage.getItem('token');

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [ruta, setRuta] = useState('');
  console.log("ruta:",ruta)
  //Metodos
  const handleRoute = (prop) => {
    setRuta(prop);
  };

  const handleDrawer = () => {
    setOpen(!open);
  };


  //cierre de sesion
  const handleCloseSession = () => {
    localStorage.setItem('token', '');
    props.unLogin();
  };
  ruta === 'OUT' && handleCloseSession();

  // Enviar datos del navbar a agregar
  // O poner "agregar" aqui
  //Crear tabla y navegacion
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Barra handleCloseSession={handleCloseSession} handleRoute={handleRoute} handleDrawer={handleDrawer} val={open} />
      <AgregarTiro open={ruta=="TIRO"} handleRoute={handleRoute}/>
      <AgregarPlayer  open={ruta=="PLAYER"} handleRoute={handleRoute} />
      <Box className={classes.content}>
        <Box className={classes.toolbar}></Box>
          <PieChart/>
        <Box>
        </Box>
      </Box>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
