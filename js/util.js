// Функция по поиску рандомного значения
function getRandomNumber(first, last) {
  const firstValue = Math.ceil(Math.min(Math.abs(first), Math.abs(last)));
  const lastValue = Math.floor(Math.max(Math.abs(first), Math.abs(last)));
  return Math.floor(Math.random() * (lastValue - firstValue + 1) + firstValue);
}
// Функция по возврату случайного элемента в массиве
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];
// Проверка максимальной длинны строки
function getMaxStringLength(string, length) {
  return string.length <= length;
}
// Закрываем попап на esc
const bigPictureExit =() => {document.addEventListener('keydown',  (evt) => {
  if(evt.key === 'Escape') {
    evt.preventDefault();
    document.body.classList.remove('modal-open');
    document.querySelector('.big-picture').classList.add('hidden');
  }
});
};
export { getRandomNumber,getRandomArrayElement,bigPictureExit};

