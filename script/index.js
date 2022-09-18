const popup = document.querySelector('.popup');
const profileUserName = document.querySelector('.profile__name');
const profileUserJob = document.querySelector('.profile__position');
const formElement = document.querySelector('.popup');
const nameInput = formElement.querySelector('.popup__input_data_name');
const jobInput = formElement.querySelector('.popup__input_data_job');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-button');

const popupPhoto = document.querySelector('.popupphoto');
const plusButton = document.querySelector('.profile__plus-button');
const popupPhotoClose = document.querySelector('.popupphoto__close-button');
const formElementPhoto = document.querySelector('.popupphoto');
const photoInput = document.querySelector('.popupphoto__input_data_photo');
const urlInput = document.querySelector('.popupphoto__input_data_url');
const cardElement = document.querySelector('.card__text');
const cardElementImage = document.querySelector('.card__photo');

const cardTemplate = document.querySelector('#cardTemplate').content;
const card = document.querySelector('.card');


const popupOpenPhotoImage = document.querySelector('.popupopenphoto__image');
const popupOpenPhotoCaption = document.querySelector('.popupopenphoto__caption');
const popupOpenPhoto = document.querySelector('.popupopenphoto');
const popupOpenPhotoCloseButton = document.querySelector('.popupopenphoto__close-button')



//Popup главный

function openPopup() {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserJob.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;

  profileUserName.textContent = nameInput.value;
  profileUserJob.textContent = jobInput.value;

  closePopup()
};

profileEditButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

//Popup для картинок

function openPopupPhoto() {
  popupPhoto.classList.add('popupphoto_opened');
}

function closePopupPhoto() {
  popupPhoto.classList.remove('popupphoto_opened');
}

function formSubmitHandlerPhoto(evt) {
  evt.preventDefault();

  renderCard(photoInput.value, urlInput.value);
  photoInput.value = '';
  urlInput.value = '';

  closePopupPhoto()
};


plusButton.addEventListener('click', openPopupPhoto);
popupPhotoClose.addEventListener('click', closePopupPhoto);
formElementPhoto.addEventListener('submit', formSubmitHandlerPhoto);

//Popup фото

function popupOpenPhotoOpen() {
  popupOpenPhoto.classList.add('popupopenphoto_opened');
}

function popupOpenPhotoClose () {
  popupOpenPhoto.classList.remove('popupopenphoto_opened');
}

function openCard(image, caption) {
  popupOpenPhotoOpen();
  popupOpenPhotoImage.src = image;
  popupOpenPhotoImage.alt = `Изображение ${caption}`;
  popupOpenPhotoCaption.textContent = caption;
}

popupOpenPhotoCloseButton.addEventListener('click', popupOpenPhotoClose);


// Фотографии с карточками

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];


function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card__elements').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__photo');

  const cardDeleteButton = cardElement.querySelector('.card__button-remove');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElementImage.src = link;
  cardElementImage.alt = `Изображение ${name}`;
  cardElement.querySelector('.card__text').textContent = name;

  cardElementImage.addEventListener('click', () => openCard(link, name));
  cardDeleteButton.addEventListener('click', () => cardElement.remove());

  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'));

  return cardElement;
}

function renderCard (name, link) {
  const cardElement = createCard(name, link);
  card.prepend(cardElement);
}

initialCards.forEach((item) => renderCard(item.name, item.link));


