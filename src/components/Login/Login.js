import React, { useState, useEffect } from 'react';
import { makeStyles, Button, Box, Snackbar } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Snack from '../Snack';
import LoginBox from './LoginBox';
import RegisterBox from './RegisterBox';
import Fetch from '../Fetch';
import LastUser from './LastUser';
import { connect } from 'react-redux';
import { mapStateToProps } from '../../store/stats/reducer';
import { mapDispatchToProps } from '../../store/stats/actions';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background:
      'linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(176,97,48,1) 88%)',
    height: '100vh',
    width: '100vw',
  },
  boxLogin: {
    backgroundColor: 'white',
    borderRadius: '.5vh',
  },
}));

function Login(props) {
  const [ruta, setRuta] = useState("LOGIN");
  const classes = useStyle();

  // Manejo de faltas
  function handleClick(text) {
    props.messageIn(text);
  }

  function userLoad(user) {
    if (
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        user.body.email
      )
    ) {
      props.loadBody(user);
      props.fetchTrue();
    } else {
      handleClick({ message: 'Ingrese un email valido' });
    }
  }

  useEffect(()=>{
    if (
      localStorage.getItem('lastUserLogin') !== '' ||
      localStorage.getItem('lastUserLogin') !== null
    ) {
      setRuta('LASTUSER');
    }
  },[])
  

  return (
    <Box className={classes.root}>
      <Box className={classes.boxLogin}>
        {ruta === 'LOGIN' ? (
          <LoginBox
            handleClick={handleClick}
            userLoad={userLoad}
            setRuta={setRuta}
          />
        ) : ruta === 'REGISTER' ? (
          <RegisterBox
            handleClick={handleClick}
            userLoad={userLoad}
            setRuta={setRuta}
          />
        ) : (
          <LastUser
            handleClick={handleClick}
            userLoad={userLoad}
            setRuta={setRuta}
          />
        )}
      </Box>
    </Box>
  );
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);

//
