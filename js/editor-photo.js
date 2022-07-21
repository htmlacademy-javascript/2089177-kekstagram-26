import { isEscapeKey } from './util.js';
import { setDefaultLevel } from './effects-photo.js';
import { showError, showSuccess } from './alerts.js';
import { request,Metods } from './fetch.js';
import {uploadFormElement,pristine,textHashtagsElement} from './validation.js';


const bodyElement = document.querySelector('body');
const uploadModalElement = document.querySelector('.img-upload__overlay');
const buttonPlusElement = uploadModalElement.querySelector('.scale__control--bigger');
const buttonMinusElement = uploadModalElement.querySelector('.scale__control--smaller');
const scaleValueElement = uploadModalElement.querySelector('.scale__control--value');
const imagePreviewElement = uploadModalElement.querySelector('.img-upload__preview > img');
const uploadPhotoElement = document.querySelector('#upload-file');
const uploadModalCloseElement = document.querySelector('#upload-cancel');

// Сброс настроек редактирования фото
const resetSettings = () => {
  imagePreviewElement.style = 'transform: scale(1.00)';
  scaleValueElement.value = '100%';
  setDefaultLevel();
};
// Закрытие окна
const onPhotoEditorCloseEsc =(evt)=>{
  if (isEscapeKey(evt)){
    evt.preventDefault();
    // eslint-disable-next-line no-use-before-define
    onPhotoEditorClose();
  }
};
const onPhotoEditorClose = () => {
  uploadPhotoElement.value = '';
  uploadModalElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  setDefaultLevel();
  resetSettings();
  document.removeEventListener('keydown',onPhotoEditorCloseEsc);
  uploadModalCloseElement.removeEventListener('click', onPhotoEditorClose);

};
// Открытие окна редактирования загруженного фото
uploadPhotoElement.addEventListener('change', () => {
  resetSettings();
  uploadModalElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown',onPhotoEditorCloseEsc);

  uploadModalCloseElement.addEventListener('click', onPhotoEditorClose);
});

// Изменение размера фото
const ScalePhoto = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
};
buttonPlusElement.addEventListener('click', () => {
  let scale = parseInt(scaleValueElement.value, 10) + ScalePhoto.STEP;

  if (scale >= ScalePhoto.MAX) {
    scale = ScalePhoto.MAX;
  }

  scaleValueElement.value = `${scale}%`;
  scale = scale / 100;
  imagePreviewElement.style.transform = `scale(${scale})`;
});

buttonMinusElement.addEventListener('click', () => {
  let scale = parseInt(scaleValueElement.value, 10) - ScalePhoto.STEP;

  if (scale <= ScalePhoto.MIN) {
    scale = ScalePhoto.MIN;
  }

  scaleValueElement.value = `${scale}%`;
  scale = scale / 100;
  imagePreviewElement.style.transform = `scale(${scale})`;
});

const onSuccess = () => {
  showSuccess('Изображение успешно загружено');
  onPhotoEditorClose();
  uploadFormElement.reset();
};

const onError = () => {
  showError('Что-то пошло не так', 'Загрузить другой файл');
  document.removeEventListener('keydown',onPhotoEditorCloseEsc);
};

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    textHashtagsElement.style.border = '2px solid red';
  }else{
    textHashtagsElement.style.border = 'none';
    request(onSuccess, onError, Metods.POST, new FormData(evt.target));
  }

});


export { onPhotoEditorClose };
