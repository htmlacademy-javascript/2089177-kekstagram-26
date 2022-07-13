import { isEscapeKey } from './util.js';
import { setDefaultLevel } from './effects.js';

const body = document.querySelector('body');
const uploadModal = document.querySelector('.img-upload__overlay');
const buttonPlus = uploadModal.querySelector('.scale__control--bigger');
const buttonMinus = uploadModal.querySelector('.scale__control--smaller');
const scaleValue = uploadModal.querySelector('.scale__control--value');
const imagePreview = uploadModal.querySelector('.img-upload__preview > img');
const uploadPhoto = document.querySelector('#upload-file');
const uploadModalClose = document.querySelector('#upload-cancel');

// Сброс настроек редактирования фото
const resetSettings = () => {
  imagePreview.style = 'transform: scale(1.00)';
  scaleValue.value = '100%';
};
// Открытие окна редактирования загруженного фото
uploadPhoto.addEventListener('change',  () => {
  uploadModal.classList.remove('hidden');
  body.classList.add('modal-open');
  resetSettings();
});

// Закрытие окна
const closePhotoEditor  = () => {
  uploadPhoto.value = '';
  uploadModal.classList.add('hidden');
  body.classList.remove('modal-open');
  setDefaultLevel();
};

uploadModalClose.addEventListener('click',  () => {
  closePhotoEditor();
});

document.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closePhotoEditor();
  }
});

// Изменение размера фото
const ScalePhoto = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};
buttonPlus.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) + ScalePhoto.STEP;

  if (scale >= ScalePhoto.MAX) {
    scale = ScalePhoto.MAX;
  }

  scaleValue.value = `${scale  }%`;
  scale = scale / 100;
  imagePreview.style.transform = `scale(${  scale  })`;
});

buttonMinus.addEventListener('click', () => {
  let scale = parseInt(scaleValue.value, 10) - ScalePhoto.STEP;

  if (scale <= ScalePhoto.MIN) {
    scale = ScalePhoto.MIN;
  }

  scaleValue.value = `${scale  }%`;
  scale = scale / 100;
  imagePreview.style.transform = `scale(${  scale  })`;
});

