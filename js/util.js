// Функция по поиску рандомного значения
const getRandomNumber = (first, last) => {
  const firstValue = Math.ceil(Math.min(Math.abs(first), Math.abs(last)));
  const lastValue = Math.floor(Math.max(Math.abs(first), Math.abs(last)));
  return Math.floor(Math.random() * (lastValue - firstValue + 1) + firstValue);
};
// Функция по возврату случайного элемента в массиве
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
// Проверка максимальной длинны строки

const getMaxStringLength = (string, length)=> string.length <= length;

// определениее клавиши ESC
const isEscapeKey = (evt) => evt.key === 'Escape';


const isArrayUnique = (elements) => {
  const results = [];
  elements.forEach((element) => {
    if (!results.includes(element)) {
      results.push(element);
    }
  });
  return results.length === elements.length;
};

const debounce = (callback, timeoutDelay) =>{
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const shuffleArray = (arr) => {
  let j, temp;
  for (let i = arr.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;
  }
  return arr;
};

export { getRandomNumber,getRandomArrayElement,isEscapeKey,getMaxStringLength,isArrayUnique,debounce,shuffleArray};
