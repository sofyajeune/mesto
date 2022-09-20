const profileUserName = document.querySelector('.profile__name');
const profileUserJob = document.querySelector('.profile__position');
const popupEditForm = document.querySelector('.popup_type_edit-form');
const nameInput = popupEditForm.querySelector('.popup__input_data_name');
const jobInput = popupEditForm.querySelector('.popup__input_data_job');
const profileEditButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('#closebutton-edit-form');

const plusButton = document.querySelector('.profile__plus-button');
const popupPhotoClose = document.querySelector('#closebutton-add-card');
const formElementPhoto = document.querySelector('.popup_type_add-card');
const photoInput = document.querySelector('.popup__input_data_photo');
const urlInput = document.querySelector('.popup__input_data_url');
const cardElement = document.querySelector('.card__text');
const cardElementImage = document.querySelector('.card__photo');

const card = document.querySelector('.card');


const popupOpenPhotoImage = document.querySelector('.popup__image');
const popupOpenPhotoCaption = document.querySelector('.popup__caption');
const popupOpenPhoto = document.querySelector('.popup_type_open-image');
const popupOpenPhotoCloseButton = document.querySelector('#closebutton-open-image')



//Popup главный


function openPopup(place) {
  place.classList.add('popup_opened');
}

function closePopup(place) {
  place.classList.remove('popup_opened');
}



function openPopupEditForm() {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserJob.textContent;
  openPopup(popupEditForm)
}

function closePopupEditForm() {
  closePopup(popupEditForm)
}

function handleFormSubmit(evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;

  profileUserName.textContent = nameInput.value;
  profileUserJob.textContent = jobInput.value;

  closePopup(popupEditForm)
};

//Popup для картинок

function openPopupPhoto() {
  openPopup(formElementPhoto)
}

function closePopupPhoto() {
  closePopup(formElementPhoto)
}

function handleFormSubmitPhoto(evt) {
  evt.preventDefault();

  renderCard(photoInput.value, urlInput.value);
  photoInput.value = '';
  urlInput.value = '';

  closePopup(formElementPhoto)
};

//Popup фото

function popupOpenPhotoOpen() {
  openPopup(popupOpenPhoto)
}

function popupOpenPhotoClose() {
  closePopup(popupOpenPhoto)
}

function openCard(image, caption) {
  popupOpenPhotoOpen();
  popupOpenPhotoImage.src = image;
  popupOpenPhotoImage.alt = `Изображение ${caption}`;
  popupOpenPhotoCaption.textContent = caption;
}

popupOpenPhotoCloseButton.addEventListener('click', popupOpenPhotoClose);


// Фотографии с карточками

const cardTemplate = document.querySelector('#cardTemplate').content;

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

function renderCard(name, link) {
  const cardElement = createCard(name, link);
  card.prepend(cardElement);
}

initialCards.forEach((item) => renderCard(item.name, item.link));

profileEditButton.addEventListener('click', openPopupEditForm);
popupCloseButton.addEventListener('click', closePopupEditForm);
popupEditForm.addEventListener('submit', handleFormSubmit);


plusButton.addEventListener('click', openPopupPhoto);
popupPhotoClose.addEventListener('click', closePopupPhoto);
formElementPhoto.addEventListener('submit', handleFormSubmitPhoto);


