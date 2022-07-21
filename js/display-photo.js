import { isEscapeKey } from './util.js';
const COMMENTS_LOAD_STEP =5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const commentListElement = document.querySelector('.social__comments');
const commentTemplateElement = commentListElement.querySelector('.social__comment');


let commentsLoaded = [];

const commentCountElement = bigPictureElement.querySelector('.social__comment-count');
const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

let commentsCount = COMMENTS_LOAD_STEP;

// рендерю комент
const renderComment = (comment) => {
  const commentSimilarElement = commentTemplateElement.cloneNode(true);
  const socialPictureElement = commentSimilarElement.querySelector('.social__picture');
  socialPictureElement.src = comment.avatar;
  socialPictureElement.alt = comment.name;
  commentSimilarElement.querySelector('.social__text').textContent = comment.message;

  return commentSimilarElement;
};

// рендерю коменты
const renderComments = (comments) => {
  commentsCount = (comments.length < COMMENTS_LOAD_STEP) ? comments.length : commentsCount;
  commentsLoaded = comments.slice(0, commentsCount);
  commentListElement.innerHTML = '';
  commentCountElement.textContent = `${commentsLoaded.length} из ${comments.length} комментариев`;
  const commentsListFragment = document.createDocumentFragment();
  commentsLoaded.forEach((comment) => {
    commentsListFragment.appendChild(renderComment(comment));
  });
  commentListElement.appendChild(commentsListFragment);
  if (comments.length > COMMENTS_LOAD_STEP && commentsLoaded.length < comments.length) {
    commentsLoaderElement.classList.remove('hidden');
  } else {
    commentsLoaderElement.classList.add('hidden');
  }
  commentsCount += COMMENTS_LOAD_STEP;
};

// Отображение Попапа большой картинки
const showPicture = (picture) => {
  renderComments(picture.comments.slice());

  const onCommentsLoaderClick = () => {
    renderComments(picture.comments.slice());
  };
  bodyElement.classList.add('modal-open');
  bigPictureElement.querySelector('.big-picture__img > img').src = picture.url;
  bigPictureElement.querySelector('.likes-count').textContent = picture.likes;
  bigPictureElement.querySelector('.social__caption').textContent =picture.description;

  bigPictureElement.classList.remove('hidden');

  const onModalCloseDisplayPhotoEsc =(evt)=>{
    if (isEscapeKey(evt)){
      evt.preventDefault();
      // eslint-disable-next-line no-use-before-define
      onModalCloseDisplayPhoto();
    }
  };
  const onModalCloseDisplayPhoto = () => {
    bigPictureElement.classList.add('hidden');
    bodyElement.classList.remove('modal-open');
    bigPictureCloseElement.removeEventListener('click', onModalCloseDisplayPhoto);
    commentListElement.innerHTML = '';
    commentsCount = COMMENTS_LOAD_STEP;
    commentsLoaded = [];
    commentsLoaderElement.removeEventListener('click', onCommentsLoaderClick);
    bodyElement.removeEventListener('keydown', onModalCloseDisplayPhotoEsc);

  };
  commentsLoaderElement.addEventListener('click', onCommentsLoaderClick);
  bigPictureCloseElement.addEventListener('click', onModalCloseDisplayPhoto);
  bodyElement.addEventListener('keydown', onModalCloseDisplayPhotoEsc);
};

export { showPicture };
