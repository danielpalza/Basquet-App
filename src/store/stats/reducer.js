const iniState = {
  players: [],
  tiros: { encestos: [], tiradores: [], tiros: [], tirosRaw: [] },
  user: { email: '', token: '' },
  body: {},
  fetch: false,
  reload: true,
  message: { text: '', show: false },
  logged: false,
};

export default function Reducer(state = iniState, action) {
  /*Acciones login*/
  if (action.type === 'USER_LOGIN') {
    return Object.assign({}, state, {
      ...state,
      user: { email: action.stat.data.email, token: action.stat.data.token },
      logged: true,
    });
  }
  if (action.type === 'USER_OUT') {
    return Object.assign({}, state, {
      ...state,
      user: { ...state.user, token: '' },
      logged: false,
    });
  }

  //Carga de tiros
  if (action.type === 'TIRO_LOAD') {
    return Object.assign({}, state, {
      ...state,
      tiros: action.stat.data,
    });
  }

  // Carga de jugadores
  if (action.type === 'PLAYER_LOAD') {
    return Object.assign({}, state, {
      ...state,
      players: action.stat.data,
    });
  }
  if (action.type === 'RELOAD_TRUE') {
    return Object.assign({}, state, {
      ...state,
      reload: true,
    });
  }
  if (action.type === 'RELOAD_FALSE') {
    return Object.assign({}, state, {
      ...state,
      reload: false,
    });
  }

  //Mensajes
  if (action.type === 'MESSAGE_IN') {
    console.log('mensaje in: ', action.stat.message);
    return Object.assign({}, state, {
      ...state,
      message: { text: action.stat.message, show: true },
    });
  }
  if (action.type === 'MESSAGE_OUT') {
    return Object.assign({}, state, {
      ...state,
      message: { text: '', show: false },
    });
  }

  //Fetch
  if (action.type === 'FETCH') {
    return Object.assign({}, state, {
      ...state,
      fetch: true,
    });
  }
  if (action.type === 'UNFETCH') {
    return Object.assign({}, state, {
      ...state,
      fetch: false,
    });
  }
  if (action.type === 'LOAD_BODY') {
    return Object.assign({}, state, {
      ...state,
      body: action.stat,
    });
  }

  /*Retornamos el estado actualizado*/
  return state;
}

// mapStateToProps
export const mapStateToProps = (state) => {
  return {
    state,
  };
};
