import { isEscapeKey } from './util.js';


const mainElement = document.querySelector('main');
const errorTemplateElement = document.querySelector('#error').content;
const errorFragmentElement = document.createDocumentFragment();

const removeAllert = (type) => {
  document.querySelector(type).remove();
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onSuccessEscKeydown);
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', onErrorEscKeydown);
};
const removeEscapeAlert = (evt, className) => {
  if (isEscapeKey(evt)) {
    removeAllert(className);
  }
};

const onSuccessEscKeydown = (evt) => {
  removeEscapeAlert(evt, '.success');
};

const onErrorEscKeydown = (evt) => {
  removeEscapeAlert(evt, '.error');
};

const showError = (text, button) => {
  const errorElement = errorTemplateElement.cloneNode(true);
  const errorButtonElement = errorElement.querySelector('.error__button');
  errorElement.querySelector('.error__title').textContent = text;
  errorButtonElement.textContent = button;

  errorElement.querySelector('.error').addEventListener('click', (evt) => {
    const element = evt.target.classList;
    if (!element.contains('error__inner')) {
      removeAllert('.error');
    }
  });

  document.addEventListener('keydown', onErrorEscKeydown);
  errorFragmentElement.appendChild(errorElement);
  mainElement.appendChild(errorFragmentElement);
};

const successTemplateElement = document.querySelector('#success').content;
const successFragment = document.createDocumentFragment();

const showSuccess = (text) => {
  const successElement = successTemplateElement.cloneNode(true);

  successElement.querySelector('.success__title').textContent = text;

  successElement.querySelector('.success').addEventListener('click', (evt) => {
    const element = evt.target.classList;
    if (!element.contains('success__inner')) {
      removeAllert('.success');
    }
  });

  document.addEventListener('keydown', onSuccessEscKeydown);

  successFragment.appendChild(successElement);
  mainElement.appendChild(successFragment);
};

export { showError, showSuccess };
