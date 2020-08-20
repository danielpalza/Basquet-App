/* eslint-disable comma-dangle */
/* eslint-disable no-var */
/* eslint-disable no-confusing-arrow */
/* eslint-disable linebreak-style */
import React from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store/stats/reducer';
import { mapDispatchToProps } from '../store/stats/actions';

function Fetch(props) {
  const token = props.state.statReducer.user.token;
  const body = props.state.statReducer.body;
  let action = '';
  switch (body.action) {
    case 'USER_LOGIN':
      action = props.login;
      break;
    case 'USER_OUT':
      action = props.unLogin;
      break;
    case 'EQUIPMENT_LOAD':
      action = props.equipLoad;
      break;
    case 'RELOAD_TRUE':
      action = props.reloadTrue;
      break;
    case 'RELOAD_FALSE':
      action = props.reloadFalse;
      break;
    case 'MESSAGE_IN':
      action = props.messageIn;
      break;
    case 'MESSAGE_OUT':
      action = props.messageOut;
      break;
    case 'FETCH':
      action = props.fetchTrue;
      break;
    case 'UNFETCH':
      action = props.fetchFalse;
      break;
    case 'LOAD_BODY':
      action = props.loadBody;
      break;
  }

  //Funcion asincrona
  async function Fetching() {
      /**User routes */
    const urlUse = `api/v1/${body.use[0]}/${body.use[1]}`;

    // arreglar fallas en envios
    const myInitPost = {
      method: body.mod,
      body: JSON.stringify(body.body),

      headers: {
        'Content-Type': 'application/json',
        token,
      },
    };
    const myInitGet = {
      method: body.mod,
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    };

    //Configuracion de request
    var myRequest = new Request(
      urlUse,
      body.mod === 'POST' ? myInitPost : myInitGet
    );

    await fetch(myRequest)
      .then((res) => res.json())
      .then((data) => {
        console.log('data fetch:', data);
        action(data);
        props.fetchFalse();
      })
      .catch((e) => console.log({ Status: 'ERROR_FETCH', message: e }));
  }

  if (props.state.statReducer.fetch) {
    Fetching();
  }
  return <span></span>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Fetch);
