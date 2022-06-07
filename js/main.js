function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getMaxLengthLine(LineLength, maxLength) {
  let maxLengthLine;
  if (LineLength <= maxLength) {
    maxLengthLine = true;
  } else {
    maxLengthLine = false;
  }
  return maxLengthLine;
}

const randomNumber = getRandomNumber(1, 10);
console.log(randomNumber);

const MaxLengthLine =getMaxLengthLine(12,10);
console.log(MaxLengthLine);


