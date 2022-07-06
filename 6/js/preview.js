import { userPhotos } from './data.js';

const pictureTemplate = document
  .querySelector('#picture')
  .content.querySelector('.picture');
const picturesList = document.querySelector('.pictures');

const renderPhoto = ({ url, comments, likes }) => {
  const photoPreview = pictureTemplate.cloneNode(true);
  photoPreview.querySelector('.picture__img').src = url;
  photoPreview.querySelector('.picture__comments').textContent =
    comments.length;
  photoPreview.querySelector('.picture__likes').textContent = likes;
  return photoPreview;
};

const renderPhotos = () => {
  const picturesListFragment = document.createDocumentFragment();

  userPhotos.forEach((photo) => {
    picturesListFragment.appendChild(renderPhoto(photo));
  });

  picturesList.appendChild(picturesListFragment);
};

export { renderPhotos };
