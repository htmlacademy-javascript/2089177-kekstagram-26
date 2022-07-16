
import { renderPhotos } from './preview-photos.js';
import { request } from './fetch.js';
import { showError } from './alerts.js';
import './editor-photo.js';
import './validation.js';


const onSuccess = (data) => {
  renderPhotos(data.slice());
};

const onError = () => {
  showError('Ошибка загрузки!', 'Закрыть');
};

request(onSuccess, onError, 'GET');
