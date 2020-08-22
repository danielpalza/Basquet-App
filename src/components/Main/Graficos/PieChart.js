import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import Charts from 'react-apexcharts';

//Estilos
const useStyle = makeStyles((theme) => ({
  root: {
    width: '80vw',
  },
}));

//Genera un grafico pie para los aciertos y fallos de encesto
function PieChart(props) {
  let ver = props.state.tiros.encestos[0] + props.state.tiros.encestos[1];
  const classes = useStyle();
  let serie = ver === 0 || isNaN(ver) ? [1] : props.state.tiros.encestos;
  let label =
    ver === 0 || isNaN(ver) ? ['Sin datos'] : ['Encesto', 'No encesto'];
  let options = {
    options: {},
    series: serie,
    chartOptions: {
      labels: label,
    },
  };

  return (
    <div>
      <Paper elevation={3}>
        <Charts
          options={options.chartOptions}
          series={options.series}
          type="pie"
          width="400"
        />
      </Paper>
    </div>
  );
}
export default PieChart;
//
