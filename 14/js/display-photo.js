import { isEscapeKey } from './util.js';
const COMMENTS_LOAD_STEP =5;

const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const bigPictureClose = document.querySelector('.big-picture__cancel');
const commentList = document.querySelector('.social__comments');
const commentTemplate = commentList.querySelector('.social__comment');


let commentsLoaded = [];

const commentCount = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

let commentsCount = COMMENTS_LOAD_STEP;


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
  commentsCount = (comments.length < COMMENTS_LOAD_STEP) ? comments.length : commentsCount;
  commentsLoaded = comments.slice(0, commentsCount);
  commentList.innerHTML = '';
  commentCount.textContent = `${commentsLoaded.length} из ${comments.length} комментариев`;
  const commentsListFragment = document.createDocumentFragment();
  commentsLoaded.forEach((comment) => {
    commentsListFragment.appendChild(renderComment(comment));
  });
  commentList.appendChild(commentsListFragment);
  if (comments.length > COMMENTS_LOAD_STEP && commentsLoaded.length < comments.length) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
  }
  commentsCount += COMMENTS_LOAD_STEP;
};

// Отображение Попапа большой картинки
const showPicture = (picture) => {

  const onCommentsLoaderClick = () => {
    renderComments(picture.comments.slice());
  };
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img > img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.social__caption').textContent =picture.description;

  bigPicture.classList.remove('hidden');

  renderComments(picture.comments.slice());

  const closeModalDisplayPhoto = (evt) => {
    bigPicture.classList.add('hidden');
    body.classList.remove('modal-open');
    bigPictureClose.removeEventListener('click', closeModalDisplayPhoto);
    commentList.innerHTML = '';
    commentsCount = COMMENTS_LOAD_STEP;
    commentsLoaded = [];
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    body.removeEventListener('keydown', closeModalDisplayPhoto);
    if (isEscapeKey(evt)){
      closeModalDisplayPhoto();
    }
  };

  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  bigPictureClose.addEventListener('click', closeModalDisplayPhoto);
  body.addEventListener('keydown', closeModalDisplayPhoto);

};

export { showPicture };
