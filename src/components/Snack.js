import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store/stats/reducer';
import { mapDispatchToProps } from '../store/stats/actions';

//Muestra mensajes generales
function Snack(props) {
  let message = props.state.statReducer.message;

  //Maneja el cierre del mensaje
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    props.messageOut();
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={message.show}
        autoHideDuration={5000}
        onClose={() => handleClose()}
        message={message.text}
        action={
          <React.Fragment>
            <Button
              color="secondary"
              size="small"
              onClick={() => handleClose()}
            >
              CERRAR
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={() => handleClose()}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Snack);
