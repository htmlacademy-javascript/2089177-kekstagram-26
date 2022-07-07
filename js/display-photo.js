import { bigPictureExit } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureCancel = document.querySelector('.big-picture__cancel');


// скрываем лишнее
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
commentsCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

const bigPictureOff = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  bigPictureCancel.removeEventListener('click', bigPictureOff);
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
  bigPictureCancel.addEventListener('click', bigPictureOff);
  bigPictureExit('keydown');
  renderComments(picture.comments);
  bigPicture.classList.remove('hidden');

};

export { showPicture };
