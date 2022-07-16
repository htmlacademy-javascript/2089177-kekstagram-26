const links = {
  GET: 'https://26.javascript.pages.academy/kekstagram/data',
  POST: 'https://26.javascript.pages.academy/kekstagram/',
};

const request = (onSuccess, onError, method, data) => {
  fetch(links[method],
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

export { request };
