import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { mapStateToProps } from '../store/stats/reducer';
import { mapDispatchToProps } from '../store/stats/actions';

//Manejo de pedidos generales a la api y la store
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
    case 'PLAYER_LOAD':
      action = props.playerLoad;
      break;
    case 'TIRO_LOAD':
      action = props.tiroLoad;
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
    //Ruta a usar
    const urlUse = `api/v1/${body.use[0]}/${body.use[1]}`;
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

    //Peticion
    if (props.state.statReducer.fetch) {
      await fetch(myRequest)
        .then((res) => res.json())
        .then((data) => {
          action(data);
          props.fetchFalse();
        })
        .catch((e) => console.log({ Status: 'ERROR_FETCH', message: e }));
    }
  }

  //Ejecuta un pedido
  useEffect(() => {
    Fetching();
  }, [props.state.statReducer.fetch]);
  return <span></span>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Fetch);
