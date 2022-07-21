
import { showPicture } from './display-photo.js';

const pictureTemplateElement = document.querySelector('#picture').content.querySelector('.picture');
const picturesListElements = document.querySelector('.pictures');

const renderPhoto = (picture) => {
  const photoPreview = pictureTemplateElement.cloneNode(true);

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
  const picturesListElementsFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    picturesListElementsFragment.appendChild(renderPhoto(photo));
  });
  picturesListElements.appendChild(picturesListElementsFragment);
};

export { renderPhotos };
