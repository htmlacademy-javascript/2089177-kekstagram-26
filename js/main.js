
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

const filterElement = document.querySelector('.img-filters');

let photos = [];

const  removeActiveClass = () => {
  const activeFilter = document.querySelector('.img-filters__button--active');
  activeFilter.classList.remove('img-filters__button--active');
};

const removePhotos = () => {
  const images = document.querySelectorAll('.picture');
  if (images) {
    images.forEach((element) => {
      element.remove();
    });
  }
};

const filters = {
  'filter-default': () => {
    renderPhotos(photos.slice(0, DEFAULT_PREVIEW_LOAD));
  },
  'filter-random': () => {
    renderPhotos(shuffleArray(photos.slice()).slice(0, RANDOM_PREVIEW_LOAD));

  },
  'filter-discussed': () => {
    renderPhotos(photos.slice().sort((a, b) => b.comments.length - a.comments.length));
  },
};


const onSuccess = (data) => {
  filterElement.classList.remove('img-filters--inactive');
  photos = data.slice();
  renderPhotos(data.slice(0,DEFAULT_PREVIEW_LOAD));
};

const onError = () => {
  showError('Ошибка загрузки!', 'Закрыть');
};

request(onSuccess, onError,Metods.GET);

const onFilterClick = debounce((evt) => {
  if (evt.target.classList.contains('img-filters__button')) {
    removeActiveClass();
    removePhotos();
    evt.target.classList.add('img-filters__button--active');
    filters[evt.target.id]();
  }
},DEBOUNCE_INTERVAL);

filterElement.addEventListener('click', onFilterClick);
