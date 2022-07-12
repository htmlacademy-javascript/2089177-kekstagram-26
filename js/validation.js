import { isEscapeKey,getMaxStringLength,isArrayUnique } from './util.js';

const RE = /^#[a-zA-Zа-яА-ЯёЁ0-9]{0,}$/;
const RE_SYMBOL = /[^-_=+;:,.]$/m;
const HASHTAGS_LENGTH =19;
const MAX_COMMENT_LENGTH = 140;
const MAX_HASHTAGS = 5;

const uploadForm = document.querySelector('.img-upload__form');
const textDescription = document.querySelector('.text__description');
const textHashtags = document.querySelector('.text__hashtags');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form-item__invalid',
  successClass: 'form-item__valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
}, false);

const errorMessage = {
  FIRST_SIGN_TYPE:'Хэш-тег начинается с # (решетки) и состоит только из букв и цифр.',
  HASHTAG_LENGTH: `Максимальная длина одного хэш-тега ${HASHTAGS_LENGTH} символов после # (решетки)`,
  MAX_HASHTAGS_LENGTH:`Укажите не больше ${MAX_HASHTAGS} хэш-тегов.`,
  REPEAT_HASHTAGS:'Хэш-теги не должны повторяться.',
  COMMENT_LENGTH:`Длина комментария не может составлять больше ${MAX_COMMENT_LENGTH} символов`,
  SEPARATION_HASHTAGS: 'Хэш-теги необходимо разделять только пробелом',
  SEPARATION_HASHTAG:'Поставьте пробел между хеш-тегами'
};


const preparedHashtags = (value) => value.trim().toLowerCase().split(' ');

const isSplitSpaceHashtag = (hashtags) => preparedHashtags(hashtags).some((value) => value.indexOf('#', 1) <= 1);
pristine.addValidator(textHashtags,isSplitSpaceHashtag,errorMessage.SEPARATION_HASHTAG);

const isMaxHashtagsLength = (hashtags) => preparedHashtags(hashtags).length <= MAX_HASHTAGS;
pristine.addValidator(textHashtags,isMaxHashtagsLength,errorMessage.MAX_HASHTAGS_LENGTH);

const isSeparationHashtags = (hashtags) => hashtags === '' || preparedHashtags(hashtags).some((value) => value.indexOf('#', 1) <= 1) ||  preparedHashtags(hashtags).every((value) => RE_SYMBOL.test(value));
pristine.addValidator(textHashtags,isSeparationHashtags,errorMessage.SEPARATION_HASHTAGS);

const isRepeatHashtags = (hashtags) => isArrayUnique(preparedHashtags(hashtags));
pristine.addValidator(textHashtags,isRepeatHashtags,errorMessage.REPEAT_HASHTAGS);

const isFirstSignTypeHashtag = (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => RE.test(value));
pristine.addValidator(textHashtags, isFirstSignTypeHashtag,errorMessage.FIRST_SIGN_TYPE);

const isHashtagLength = (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => getMaxStringLength(value,HASHTAGS_LENGTH));
pristine.addValidator(textHashtags, isHashtagLength,errorMessage.HASHTAG_LENGTH);

const isValidateComment = (value) => getMaxStringLength(value, MAX_COMMENT_LENGTH);
pristine.addValidator(textDescription, isValidateComment,errorMessage.COMMENT_LENGTH);


uploadForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});

const onEscapeDown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    evt.stopPropagation();
  }
};

textDescription.addEventListener('keydown', onEscapeDown);
textHashtags.addEventListener('keydown', onEscapeDown);
