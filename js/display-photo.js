import { isEscapeKey } from './util.js';
const COMMENTS_LOAD_STEP =5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const bigPictureCloseElement = document.querySelector('.big-picture__cancel');
const commentListElement = document.querySelector('.social__comments');
const commentTemplateElement = commentListElement.querySelector('.social__comment');


let commentsLoaded = [];

const commentCount = bigPictureElement.querySelector('.social__comment-count');
const commentsLoader = bigPictureElement.querySelector('.comments-loader');

let commentsCount = COMMENTS_LOAD_STEP;

// рендерю комент
const renderComment = (comment) => {
  const commentSimilar = commentTemplateElement.cloneNode(true);
  const socialPicture = commentSimilar.querySelector('.social__picture');
  socialPicture.src = comment.avatar;
  socialPicture.alt = comment.name;
  commentSimilar.querySelector('.social__text').textContent = comment.message;

  return commentSimilar;
};

// рендерю коменты
const renderComments = (comments) => {
  commentsCount = (comments.length < COMMENTS_LOAD_STEP) ? comments.length : commentsCount;
  commentsLoaded = comments.slice(0, commentsCount);
  commentListElement.innerHTML = '';
  commentCount.textContent = `${commentsLoaded.length} из ${comments.length} комментариев`;
  const commentsListFragment = document.createDocumentFragment();
  commentsLoaded.forEach((comment) => {
    commentsListFragment.appendChild(renderComment(comment));
  });
  commentListElement.appendChild(commentsListFragment);
  if (comments.length > COMMENTS_LOAD_STEP && commentsLoaded.length < comments.length) {
    commentsLoader.classList.remove('hidden');
  } else {
    commentsLoader.classList.add('hidden');
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

  const closeModalDisplayPhotoEsc =(evt)=>{
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
    commentsLoader.removeEventListener('click', onCommentsLoaderClick);
    bodyElement.removeEventListener('keydown', closeModalDisplayPhotoEsc);

  };
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
  bigPictureCloseElement.addEventListener('click', onModalCloseDisplayPhoto);
  bodyElement.addEventListener('keydown', closeModalDisplayPhotoEsc);
};

export { showPicture };
