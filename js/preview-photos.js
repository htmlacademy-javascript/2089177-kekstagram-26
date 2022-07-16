
import { showPicture } from './display-photo.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const renderPhoto = (picture) => {
  const photoPreview = pictureTemplate.cloneNode(true);

  photoPreview.querySelector('.picture__img').src = picture.url;
  photoPreview.querySelector('.picture__likes').textContent = picture.likes;
  photoPreview.querySelector('.picture__comments').textContent =picture.comments.length;
  // добавляем функцию отображения большой картинки
  photoPreview.addEventListener('click', (evt) => {
    evt.preventDefault();
    showPicture(picture);
  });

  return photoPreview;
};

const renderPhotos = (photos) => {
  const picturesListFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    picturesListFragment.appendChild(renderPhoto(photo));
  });
  picturesList.appendChild(picturesListFragment);
};

export { renderPhotos };
