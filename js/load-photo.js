const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const Photo = {
  WIDTH: 600,
  HEIGHT: 600,
};

const uploadFileElement = document.querySelector('#upload-file');
const uploadPreviewContainerElement = document.querySelector('.img-upload__preview');
const uploadPreviewImgElement = uploadPreviewContainerElement.querySelector('img');
const previewsElements = document.querySelectorAll('.effects__preview');

uploadFileElement.addEventListener('change', () => {
  const file = uploadFileElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      uploadPreviewImgElement.src = reader.result;
      uploadPreviewImgElement.width = Photo.WIDTH;
      uploadPreviewImgElement.height = Photo.HEIGHT;

      previewsElements.forEach((filterElement) => {
        filterElement.style.backgroundImage = `url(${reader.result})`;
      });
    });

    reader.readAsDataURL(file);
  }
});
