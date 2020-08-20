import React from 'react';

//Login
export function userLogin(stat) {
  console.log(stat);
  return {
    type: 'USER_LOGIN',
    stat,
  };
}
export function userOutSession(stat) {
  console.log(stat);
  return {
    type: 'USER_OUT',
  };
}

//Carga objetos

export function equipmentLoad(stat) {
  console.log(stat);
  return {
    type: 'EQUIPMENT_LOAD',
    stat,
  };
}
export function reTrue(stat) {
  console.log(stat);
  return {
    type: 'RELOAD_TRUE',
  };
}
export function reFalse(stat) {
  console.log(stat);
  return {
    type: 'RELOAD_FALSE',
  };
}

//Message
export function meIn(stat) {
  console.log(stat);
  return {
    type: 'MESSAGE_IN',
    stat,
  };
}
export function meOut(stat) {
  console.log(stat);
  return {
    type: 'MESSAGE_OUT',
  };
}

//Fetch
export function fetching(stat) {
  console.log(stat);
  return {
    type: 'FETCH',
  };
}
export function unFetching(stat) {
  console.log(stat);
  return {
    type: 'UNFETCH',
  };
}

export function ldBody(stat) {
  console.log(stat);
  return {
    type: 'LOAD_BODY',
    stat,
  };
}

// mapDispatchToProps
export const mapDispatchToProps = (dispatch) => ({
  login: (stat) => dispatch(userLogin(stat)),
  unLogin: () => dispatch(userOutSession()),
  equipLoad: (stat) => dispatch(equipmentLoad(stat)),
  reloadTrue: () => dispatch(reTrue()),
  reloadFalse: () => dispatch(reFalse()),
  messageIn: (stat) => dispatch(meIn(stat)),
  messageOut: () => dispatch(meOut()),
  fetchTrue: () => dispatch(fetching()),
  fetchFalse: () => dispatch(unFetching()),
  loadBody: (stat) => dispatch(ldBody(stat)),
});
