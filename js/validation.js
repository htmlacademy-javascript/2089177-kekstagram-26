import { isEscapeKey,getMaxStringLength,isArrayUnique } from './util.js';
import { showError, showSuccess } from './alerts.js';
import { request,Metods } from './fetch.js';
import { onPhotoEditorClose } from './editor-photo.js';


const RE = /^#[a-zA-Zа-яА-ЯёЁ0-9]{0,}$/;
const RE_SYMBOL = /[^-_=+;:,.]$/m;
const HASHTAGS_LENGTH =19;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;

const uploadFormElement = document.querySelector('.img-upload__form');
const textDescriptionElement = document.querySelector('.text__description');
const textHashtagElement = document.querySelector('.text__hashtags');

const pristine = new Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
},false);

const errorMessage = {
  FIRST_SIGN_TYPE:'Хэш-тег начинается с # (решетки) и состоит только из букв и цифр.',
  HASHTAG_LENGTH: `Максимальная длина одного хэш-тега ${HASHTAGS_LENGTH} символов после # (решетки)`,
  MAX_HASHTAGS_LENGTH:`Укажите не больше ${MAX_HASHTAGS} хэш-тегов.`,
  REPEAT_HASHTAGS:'Хэш-теги не должны повторяться.',
  COMMENT_LENGTH:`Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`,
  SEPARATION_HASHTAGS: 'Хэш-теги необходимо разделять только пробелом',
  SEPARATION_HASHTAG:'Не хватает пробела между хеш-тегами'
};


const preparedHashtags = (value) => value.trim().toLowerCase().split(' ');

const isSplitSpaceHashtag = (hashtags) => preparedHashtags(hashtags).some((value) => value.indexOf('#', 1) <= 1);
pristine.addValidator(textHashtagElement,isSplitSpaceHashtag,errorMessage.SEPARATION_HASHTAG);

const isMaxHashtagsLength = (hashtags) => preparedHashtags(hashtags).length <= MAX_HASHTAGS;
pristine.addValidator(textHashtagElement,isMaxHashtagsLength,errorMessage.MAX_HASHTAGS_LENGTH);

const isSeparationHashtags = (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => RE_SYMBOL.test(value));
pristine.addValidator(textHashtagElement,isSeparationHashtags,errorMessage.SEPARATION_HASHTAGS);

const isRepeatHashtags = (hashtags) => isArrayUnique(preparedHashtags(hashtags));
pristine.addValidator(textHashtagElement,isRepeatHashtags,errorMessage.REPEAT_HASHTAGS);

const isFirstSignTypeHashtag = (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => RE.test(value));
pristine.addValidator(textHashtagElement, isFirstSignTypeHashtag,errorMessage.FIRST_SIGN_TYPE);

const isHashtagLength = (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => getMaxStringLength(value,HASHTAGS_LENGTH));
pristine.addValidator(textHashtagElement, isHashtagLength,errorMessage.HASHTAG_LENGTH);

const isValidateComment = (value) => getMaxStringLength(value, MAX_COMMENT_LENGTH);
pristine.addValidator(textDescriptionElement, isValidateComment,errorMessage.COMMENT_LENGTH);

// Отправка загруженного фото

const onSuccess = () => {
  showSuccess('Изображение успешно загружено');
  onPhotoEditorClose();
  uploadFormElement.reset();
};

const onError = () => {
  showError('Что-то пошло не так', 'Загрузить другой файл');
  onPhotoEditorClose();
};

uploadFormElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (!pristine.validate()) {
    textHashtagElement.style.border = '2px solid red';
  }else{
    textHashtagElement.style.border = 'none';
    request(onSuccess, onError, Metods.POST, new FormData(evt.target));
  }
});

const onEscapeDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

textDescriptionElement.addEventListener('keydown', onEscapeDown);
textHashtagElement.addEventListener('keydown', onEscapeDown);
