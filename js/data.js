import { getRandomNumber, getRandomArrayElement } from './util.js';

const PHOTO_GENERAL = 25;
const QuantityLikes = {
  MIN: 15,
  MAX: 200,
};
const QuantityComments = {
  MIN: 1,
  MAX: 3,
};
const QuantityPhotos = {
  MIN: 1,
  MAX: 6,
};
const QuantityRandomId = {
  MIN: 1,
  MAX: 999,
};
const userComments = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
const descriptions = [
  'Зацените посаны',
  'Ты только посмотри какое разрешение!',
  'Ля какой',
  'На чилле на расслабоне',
  'У меня нет фантазии подписывапть фото,сорьки',
  'Вот так вот...'
];
const names = [
  'Валера',
  'Максим',
  'Барсук',
  'Наташа',
  'Илья',
  'Олег',
  'Леграша',
  'Лика'
];

const addUserComments = () => {
  const comments = [];
  for (let i = 1; i <= getRandomNumber(QuantityComments.MIN, QuantityComments.MAX); i++) {
    comments.push({
      id: getRandomNumber(QuantityRandomId.MAX, QuantityRandomId.MIN),
      avatar: `img/avatar-${getRandomNumber(QuantityPhotos.MIN, QuantityPhotos.MAX)}.svg`,
      message: getRandomArrayElement(userComments),
      name: getRandomArrayElement(names),
    });
  }
  return comments;
};

const addUserPhotos = () => {
  const userPhotos = [];
  for (let i = 1; i <= PHOTO_GENERAL; i++) {
    userPhotos.push({
      id: i,
      url: `img/${i}.svg`,
      description: getRandomArrayElement(descriptions),
      likes: getRandomNumber(QuantityLikes.MIN, QuantityLikes.MAX),
      comments: addUserComments(),
    });
  }
  return userPhotos;
};

export { addUserPhotos };
