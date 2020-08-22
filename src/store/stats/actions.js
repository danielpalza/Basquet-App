//Login
export function userLogin(stat) {
  return {
    type: 'USER_LOGIN',
    stat,
  };
}
export function userOutSession(stat) {
  return {
    type: 'USER_OUT',
  };
}

//Carga tiros
export function tiroLoad(stat) {
  return {
    type: 'TIRO_LOAD',
    stat,
  };
}

//Carga jugadores

export function playerLoad(stat) {
  return {
    type: 'PLAYER_LOAD',
    stat,
  };
}
export function reTrue(stat) {
  return {
    type: 'RELOAD_TRUE',
  };
}
export function reFalse(stat) {
  return {
    type: 'RELOAD_FALSE',
  };
}

//Message
export function meIn(stat) {
  return {
    type: 'MESSAGE_IN',
    stat,
  };
}
export function meOut(stat) {
  return {
    type: 'MESSAGE_OUT',
  };
}

//Fetch
export function fetching(stat) {
  return {
    type: 'FETCH',
  };
}
export function unFetching(stat) {
  return {
    type: 'UNFETCH',
  };
}

export function ldBody(stat) {
  return {
    type: 'LOAD_BODY',
    stat,
  };
}

// mapDispatchToProps
export const mapDispatchToProps = (dispatch) => ({
  login: (stat) => dispatch(userLogin(stat)),
  unLogin: () => dispatch(userOutSession()),
  playerLoad: (stat) => dispatch(playerLoad(stat)),
  tiroLoad: (stat) => dispatch(tiroLoad(stat)),
  reloadTrue: () => dispatch(reTrue()),
  reloadFalse: () => dispatch(reFalse()),
  messageIn: (stat) => dispatch(meIn(stat)),
  messageOut: () => dispatch(meOut()),
  fetchTrue: () => dispatch(fetching()),
  fetchFalse: () => dispatch(unFetching()),
  loadBody: (stat) => dispatch(ldBody(stat)),
});
