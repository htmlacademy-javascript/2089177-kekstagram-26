import { isEscapeKey } from './util.js';

const mainElement = document.querySelector('main');
const errorTemplateElement = document.querySelector('#error').content;
const errorFragmentElement = document.createDocumentFragment();

const removeAllert = (type) => {
  document.querySelector(type).remove();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onSuccessEscKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onAlertEscKeydown);
};
const onAlertEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    removeAllert('.error');
  }
};
const onSuccessEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    removeAllert('.success');
  }
};

const showError = (text, button) => {
  const errorElement = errorTemplateElement.cloneNode(true);
  const errorButtonElement = errorElement.querySelector('.error__button');
  errorElement.querySelector('.error__title').textContent = text;
  errorButtonElement.textContent = button;

  document.addEventListener('click', (evt) => {
    const element = document.querySelector('.error__inner');
    if (!element.contains(evt.target)) {
      removeAllert('.error');
    }
  });

  errorButtonElement.addEventListener('click', () => {
    removeAllert('.error');
  });


  document.addEventListener('keydown', onAlertEscKeydown);
  errorFragmentElement.appendChild(errorElement);
  mainElement.appendChild(errorFragmentElement);
};

const successTemplateElement = document.querySelector('#success').content;
const successFragment = document.createDocumentFragment();

const showSuccess = (text) => {
  const successElement = successTemplateElement.cloneNode(true);

  successElement.querySelector('.success__title').textContent = text;

  const successButtonElement = successElement.querySelector('.success__button');
  document.addEventListener('keydown', onSuccessEscKeydown);
  document.addEventListener('click', (evt) => {
    const element = document.querySelector('.success__inner');
    if (!element.contains(evt.target)) {
      removeAllert('.success');
    }
  });

  successButtonElement.addEventListener('click', () => {
    removeAllert('.success');
  });

  document.addEventListener('keydown', onAlertEscKeydown);

  successFragment.appendChild(successElement);
  mainElement.appendChild(successFragment);
};

export { showError, showSuccess };
