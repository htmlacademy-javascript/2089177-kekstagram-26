
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureClose = document.querySelector('.big-picture__cancel');


// скрываем лишнее
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
commentsCount.classList.add('hidden');
commentsLoader.classList.add('hidden');


const closeModalDisplayPhoto = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureClose.removeEventListener('click', onBigPictureCloseClick);
  document.removeEventListener('keydown', onBigPictureCloseKeydown);
};

const onBigPictureCloseClick = (evt) => {
  evt.preventDefault();
  closeModalDisplayPhoto();
};

const onBigPictureCloseKeydown =(evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closeModalDisplayPhoto();
  }
};

// функция вывода комментариев
const commentTemplate = document.querySelector('.social__comment');
const commentList = document.querySelector('.social__comments');
// рендерю комент
const renderComment = (comment) => {
  const commentSimilar = commentTemplate.cloneNode(true);

  commentSimilar.querySelector('.social__picture').src = comment.avatar;
  commentSimilar.querySelector('.social__picture').alt = comment.name;
  commentSimilar.querySelector('.social__text').textContent = comment.message;

  return commentSimilar;
};
// рендерю коменты
const renderComments = (comments) => {
  const commentsListFragment = document.createDocumentFragment();

  comments.forEach((comment) => {
    commentsListFragment.appendChild(renderComment(comment));
  });

  commentList.appendChild(commentsListFragment);
};

// Отображение Попапа большой картинки
const showPicture = (picture) => {
  commentList.innerHTML = '';
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent =picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent =picture.description;
  bigPictureClose.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown',  onBigPictureCloseKeydown);
  renderComments(picture.comments);
  bigPicture.classList.remove('hidden');

};

export { showPicture };
