import React, { useState } from 'react';
import {
  makeStyles,
  useTheme,
  CssBaseline,
  Box,
  Grid,
  Paper,
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Barra from './Barra';
import PieChart from './Graficos/PieChart';
import LineChart from './Graficos/LineChart';
import ListaEventos from './ListaEventos';
import AgregarPlayer from './Botones/AgregarPlayer';
import AgregarTiro from './Botones/AgregarTiro';
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
  paper: {
    padding: '2vw',

  },
  element: {
    margin: '1vw',
  },

  toolbar: theme.mixins.toolbar,
}));

function Main(props) {
  //Guardado de token nuevo
  if (props.state.statReducer.user.token !== undefined) {
    localStorage.setItem('token', props.state.statReducer.user.token);
    localStorage.setItem('lastUserLogin', props.state.statReducer.user.email);
  }
  const token = props.state.statReducer.user.token
    ? props.state.statReducer.user.token
    : localStorage.getItem('token');

  const classes = useStyles();
  const theme = useTheme();

  const [open, setOpen] = useState(false);
  const [ruta, setRuta] = useState('');

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
      <Barra
        handleCloseSession={handleCloseSession}
        handleRoute={handleRoute}
        handleDrawer={handleDrawer}
        val={open}
      />
      <AgregarTiro
        open={ruta == 'TIRO'}
        action={props}
        handleRoute={handleRoute}
      />
      <AgregarPlayer
        open={ruta == 'PLAYER'}
        action={props}
        handleRoute={handleRoute}
      />
      <Box className={classes.content}>
        <Box className={classes.toolbar}></Box>
        <Paper className={classes.paper} elevation={3}>
          <Grid container spacing={3}>
            <Grid item xs>
              <ListaEventos />
            </Grid>
            <Grid item xs>
              <PieChart action={props} state={props.state.statReducer} />
            </Grid>
            <Grid item xs>
              <LineChart action={props} state={props.state.statReducer} />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
