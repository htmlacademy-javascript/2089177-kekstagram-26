const DEFAULT_EFFECT_LEVEL = 100;

const Slider = {
  MAX: 100,
  MIN: 0,
  STEP: 1,
};

const effectRadioGroupElement = document.querySelector('.img-upload__effects');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectLevelSliderElement = document.querySelector('.effect-level__slider');
const uploadPreviewImgElement = document.querySelector('.img-upload__preview > img');
const effectLevelValueElement = document.querySelector('.effect-level__value');

effectLevelElement.classList.add('visually-hidden');

let lastClass = '';

const effects = {
  none: () => {
    effectLevelElement.classList.add('visually-hidden');
    return 'none';
  },
  chrome: () => {
    effectLevelElement.classList.remove('visually-hidden');
    return `grayscale(${parseInt(effectLevelValueElement.value, 10) * 0.01})`;
  },
  sepia: () => {
    effectLevelElement.classList.remove('visually-hidden');
    return `sepia(${parseInt(effectLevelValueElement.value, 10) * 0.01})`;
  },
  marvin: () => {
    effectLevelElement.classList.remove('visually-hidden');
    return `invert(${Math.floor(effectLevelValueElement.value)}%)`;
  },
  phobos: () => {
    effectLevelElement.classList.remove('visually-hidden');
    return `blur(${(parseInt(effectLevelValueElement.value, 10) * 3) * 0.01}px)`;
  },
  heat: () => {
    effectLevelElement.classList.remove('visually-hidden');
    return `brightness(${(parseInt(effectLevelValueElement.value, 10) * 3) * 0.01})`;
  },
};

const onEffectRadioGroupClick = (evt) => {
  if (evt.target.classList.contains('effects__preview')) {
    if (lastClass !== '') {
      uploadPreviewImgElement.classList.remove(lastClass);
    }
    effectLevelSliderElement.noUiSlider.set(DEFAULT_EFFECT_LEVEL);
    const currentClass = evt.target.classList[1];
    lastClass = currentClass;

    uploadPreviewImgElement.classList.add(currentClass);
    uploadPreviewImgElement.style.filter = effects[currentClass.replace('effects__preview--', '')]();
  }
};

effectRadioGroupElement.addEventListener('click', onEffectRadioGroupClick);

noUiSlider.create(effectLevelSliderElement, {
  range: {
    min: Slider.MIN,
    max: Slider.MAX,
  },
  start: Slider.MAX,
  connect: 'lower',
  step:Slider.STEP,
});

effectLevelSliderElement.noUiSlider.on('slide', () => {
  effectLevelValueElement.value = Math.round(effectLevelSliderElement.noUiSlider.get());

  uploadPreviewImgElement.style.filter = effects[lastClass.replace('effects__preview--', '')]();
});

const setDefaultLevel = () => {
  effectLevelSliderElement.noUiSlider.set(DEFAULT_EFFECT_LEVEL);
  effectLevelValueElement.value = DEFAULT_EFFECT_LEVEL;
  effectLevelElement.classList.add('visually-hidden');
  uploadPreviewImgElement.style.filter = null;
  if (lastClass) {
    uploadPreviewImgElement.classList.remove(lastClass);
  }
};

export { setDefaultLevel };
