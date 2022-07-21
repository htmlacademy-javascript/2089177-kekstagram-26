
import { showPicture } from './display-photo.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesListElement = document.querySelector('.pictures');

const renderPhoto = (picture) => {
  const photoPreviewElement = pictureTemplateElement.cloneNode(true);

  photoPreviewElement.querySelector('.picture__img').src = picture.url;
  photoPreviewElement.querySelector('.picture__likes').textContent = picture.likes;
  photoPreviewElement.querySelector('.picture__comments').textContent =picture.comments.length;
  // добавляем функцию отображения большой картинки
  photoPreviewElement.addEventListener('click', (evt) => {
    evt.preventDefault();
    showPicture(picture);

  });

  return photoPreviewElement;
};

const renderPhotos = (photos) => {
  const picturesListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    picturesListFragment.appendChild(renderPhoto(photo));
  });
  picturesListElement.appendChild(picturesListFragment);
};

export { renderPhotos };
