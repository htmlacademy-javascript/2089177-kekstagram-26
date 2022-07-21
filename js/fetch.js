const Links = {
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram/',
};
const Metods ={
  GET:'GET',
  POST:'POST',
};
const request = (onSuccess, onError, method, data) => {
  fetch(Links[method],
    {
      method: method,
      body: data,
    })
    .then((response) => response.json())
    .then((response) => {
      onSuccess(response);

    })
    .catch(() => {
      onError();
    });
};

export { request,Metods };
