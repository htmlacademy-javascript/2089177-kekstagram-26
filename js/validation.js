import { isEscapeKey } from './util.js';

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

const Hashtagslength = {
  MIN: 2,
  MAX: 20,
};
const maxCommentlength = 140;
const maxHashtags = 5;
const validateComment = (value) => value.length <= maxCommentlength;
const preparedHashtags = (value) => value.trim().toLowerCase().split(' ');

const isArrayInique = (arrayToCheck) => {
  const length = arrayToCheck.length;

  for (let i = 0; i < length; i++) {
    const comparedElement = arrayToCheck[i];

    for (let j = i + 1; j < length; j++) {
      const elementToCompare = arrayToCheck[j];

      if (comparedElement === elementToCompare && comparedElement !== '#') {
        return false;
      }
    }
  }
  return true;
};

pristine.addValidator(textHashtags, (hashtags) => preparedHashtags(hashtags).length <= maxHashtags,
  'Укажите не больше 5 хэштегов');

pristine.addValidator(textHashtags, (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => /[^-_=+;:,.]$/m.test(value)),
  'Хэштеги необходимо разделить пробелом');

pristine.addValidator(textHashtags, (hashtags) => isArrayInique(preparedHashtags(hashtags)),
  'Хэштеги не должны повторяться');

pristine.addValidator(textHashtags, (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => /^#[a-zA-Zа-яА-ЯёЁ0-9]{0,}$/.test(value)),
  'Хэштег начинается с # (решетки) и состоит только из букв и цифр');

pristine.addValidator(textHashtags, (hashtags) => hashtags === '' || preparedHashtags(hashtags).every((value) => value.length >= Hashtagslength.MIN && value.length <= Hashtagslength.MAX),
  'Длина хэштега — от 1 до 19 символов после # (решетки)');

pristine.addValidator(textDescription, validateComment,
  'Комментарий не должен быть длиннее 140 символов');


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
