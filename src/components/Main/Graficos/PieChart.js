import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../../store/stats/reducer';
import { mapDispatchToProps } from '../../../store/stats/actions';
import { Paper } from '@material-ui/core';
import Charts from 'react-apexcharts';

const useStyle = makeStyles((theme) => ({
  root: {
    width: '80vw',
  },
}));

function PieChart(props) {
  console.log('props piechart:', props);
  let ver = props.state.tiros.encestos[0] + props.state.tiros.encestos[1];
  const classes = useStyle();
  console.log('ver:', ver);
  let serie = ver === 0 || isNaN(ver) ? [1] : props.state.tiros.encestos;
  let label = ver === 0 || isNaN(ver) ? ['Sin datos'] : ['Encesto', 'No encesto'];
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
