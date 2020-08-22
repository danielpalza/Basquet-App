import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Charts from 'react-apexcharts';
import Fetch from "./FetchGraficos"

//Estilos
const useStyle = makeStyles((theme) => ({
  root: {
    width: '30vw',
  },
}));

//Genera un grafico de barras para los jugadores y sus tiros
function LineChart(props) {
  const classes = useStyle();
  const [body, setBody] = useState({
    body: {},
    use: ['tiro', 'getAllTiro'],
    mod: 'GET',
    action: props.action.tiroLoad,
    token: props.state.user.token,
  });

  //Actualiza el grafico si surgio un cambio
  async function handleFetch(){
    await Fetch(body)
    props.action.reloadFalse()
  }
 
  useEffect(()=>{
    handleFetch()
  },[props.state.reload])


  //Variables y opciones para el grafico
  let serie =
    props.state.tiros.tiros.length === 0 ? [0] : props.state.tiros.tiros;
  let label =
    props.state.tiros.tiradores.length === 0
      ? ['Sin Datos']
      : props.state.tiros.tiradores;

  let options = {
    options: {
      chart: {
        id: 'basic-bar',
      },
      xaxis: {
        categories: label,
      },
    },
    series: [
      {
        name: 'series-1',
        data: serie,
      },
    ],
  };

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Charts
          options={options.options}
          series={options.series}
          type="bar"
          width="400"
          
        />
      </Paper>
    </div>
  );
}
export default LineChart;
//
