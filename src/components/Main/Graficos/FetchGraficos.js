async function Fetch(state) {
  let token = state.token;
  let body = state;

  /**User routes */
  let urlUse = `api/v1/${body.use[0]}/${body.use[1]}`;

  // arreglar fallas en envios
  let myInitPost = {
    method: body.mod,
    body: JSON.stringify(body.body),

    headers: {
      'Content-Type': 'application/json',
      token,
    },
  };
  let myInitGet = {
    method: body.mod,
    headers: {
      'Content-Type': 'application/json',
      token,
    },
  };

  //Configuracion de request
  let myRequest = new Request(
    urlUse,
    body.mod === 'POST' ? myInitPost : myInitGet
  );
  await fetch(myRequest)
    .then((res) => res.json())
    .then((data) => {
      state.action(data);
    })
    .catch((e) => console.log({ Status: 'ERROR_FETCH', message: e }));
}

export default Fetch;
