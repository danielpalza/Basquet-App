import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Theme from '../jsonMUI/materialConfig';
import Snack from './Snack';
import Fetch from './Fetch';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store/stats/reducer';
import Login from './Login/Login';
import Main from './Main/Main.js';

function App(props) {
  const logged = props.state.statReducer.logged;

  return (
    <React.Fragment>
      <ThemeProvider theme={Theme}>
        {logged ? <Main /> : <Login />}
        <Snack />
        <Fetch />
      </ThemeProvider>
    </React.Fragment>
  );
}

export default connect(mapStateToProps)(App);
