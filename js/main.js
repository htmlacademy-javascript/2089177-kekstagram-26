
import { renderPhotos } from './preview-photos.js';
import { request,Metods } from './fetch.js';
import { showError } from './alerts.js';
import { debounce,shuffleArray } from './util.js';
import './editor-photo.js';
import './validation.js';
import './load-photo.js';

const DEFAULT_PREVIEW_LOAD = 25;
const RANDOM_PREVIEW_LOAD = 10;
const DEBOUNCE_INTERVAL = 300;

const filterElement = document.querySelector('.img-filterElements');

let photos = [];

const  removeActiveClass = () => {
  const activefilterElement = document.querySelector('.img-filterElements__button--active');
  activefilterElement.classList.remove('img-filterElements__button--active');
};

const removePhotos = () => {
  const imagesElements = document.querySelectorAll('.picture');
  if (imagesElements) {
    imagesElements.forEach((element) => {
      element.remove();
    });
  }
};

const filterElements = {
  'filterElement-default': () => {
    renderPhotos(photos.slice(0, DEFAULT_PREVIEW_LOAD));
  },
  'filterElement-random': () => {
    renderPhotos(shuffleArray(photos.slice()).slice(0, RANDOM_PREVIEW_LOAD));

  },
  'filterElement-discussed': () => {
    renderPhotos(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
  },
};


const onSuccess = (data) => {
  filterElement.classList.remove('img-filterElements--inactive');
  photos = data.slice();
  renderPhotos(data.slice(0,DEFAULT_PREVIEW_LOAD));
};

const onError = () => {
  showError('Ошибка загрузки!', 'Закрыть');
};

request(onSuccess, onError,Metods.GET);

const onfilterElementClick = debounce((evt) => {
  if (evt.target.classList.contains('img-filterElements__button')) {
    removeActiveClass();
    removePhotos();
    evt.target.classList.add('img-filterElements__button--active');
    filterElements[evt.target.id]();
  }
},DEBOUNCE_INTERVAL);

filterElement.addEventListener('click', onfilterElementClick);
