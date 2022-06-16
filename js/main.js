// Функция по поиску рандомного значения
function getRandomNumber(first, last) {
	const firstValue = Math.ceil(Math.min(Math.abs(first), Math.abs(last)));
	const lastValue = Math.floor(Math.max(Math.abs(first), Math.abs(last)));
	return Math.floor(Math.random() * (lastValue - firstValue + 1) + firstValue);
}
// Функция по возврату случайного элемента в массиве
const getRandomArrayElement = (elements) => {
	return elements[getRandomNumber(0, elements.length - 1)];
};
// Проверка максимальной длинны строки
function getMaxStringLength(string, length) {
	return string.length <= length;
}
// Возвращает массив случайной длины из отрезка [min, max], составленный из уникальных случайных элементов другого массива
const getRandomArray = (initialArray, min = 1, max = initialArray.length) => {
  const copiedArray = initialArray.slice();
  const length = getRandomNumber(min, max);

  const iter = (acc, array) => {
    if (acc.length === length) {
      return acc;
    }

    const randomElement = getRandomArrayElement(array, true);
    return iter([...acc, randomElement], array);
  };

  return iter([], copiedArray);
};

// задаем максимальное количество фотографий
const PHOTO_GENERAL = 25;
const USER_COMMENTS = [
	`Всё отлично!`,
	`В целом всё неплохо. Но не всё.`,
	`Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.`,
	`Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.`,
	`Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.`,
	`Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!`
];
const PHOTO_DESCRIPTIONS = [
	`Зацените посаны`,
	`Ты только посмотри какое разрешение!`,
	`Ля какой`,
	`На чилле на расслабоне`,
	`У меня нет фантазии подписывапть фото,сорьки`,
	`Вот так вот...`
];
const valueComments = {
	MIN: 1,
	MAX: 2,
};
const valueLikes = {
	MIN: 15,
	MAX: 200,
};
const createUserImg = () => {
	return {
		id:'',
		url:'',
		description: `${getRandomArrayElement(PHOTO_DESCRIPTIONS)}`,
		likes: `${getRandomNumber(valueLikes.MIN, valueLikes.MAX)}`,
		comments: `${getRandomArray(USER_COMMENTS,valueComments.MIN,valueComments.MAX)}`,
	};
};
const USER_PHOTO_SUMM = Array.from({ length: PHOTO_GENERAL }, createUserImg)
// добавляю id и url
for (let i = 0; i < USER_PHOTO_SUMM.length; i++) {
  USER_PHOTO_SUMM[i].id = i+1;
	USER_PHOTO_SUMM[i].url = `photos/${i+1}.jpg`;
}
// проверочка
console.log(USER_PHOTO_SUMM)
