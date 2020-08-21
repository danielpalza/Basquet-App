import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/stats/reducer';
import { mapDispatchToProps } from '../../store/stats/actions';
import Chart from "react-apexcharts";


const useStyle = makeStyles((theme) => ({
  root: {
    width: '80vw',
  },
}));

function PieChart(props) {
  const classes = useStyle();
  const [body, setBody] = useState({
    body: {},
    use: ['tiro', 'getAllTiro'],
    mod: 'GET',
    action: 'TIRO_LOAD',
    token: props.state.statReducer.user.token,
  });

  if (props.state.statReducer.reload) {
    props.loadBody(body);
    props.fetchTrue();
    props.reloadFalse();
  }

  let serie = props.state.statReducer.tiros;
  let label = "Tiros";
  let options = {
        options: {},
        series: serie,
        chartOptions: {
            labels: label,
        },
    };


  return (
    <div className={classes.root}>
        <Charts
            options={options.chartOptions}
            series={options.series}
            type="pie"
            width="400"
        />
    </div>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(PieChart);
//
