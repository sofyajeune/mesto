import { initialCards } from "./InitialCards.js";
import Card from "./Card.js";
import FormValidator from "./FormValidator.js";

//------------------------- КОНФИГ --------------------//
const settingsValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save",
  inactiveButtonClass: "popup__save_disabled",
  inputErrorClass: "popup__input_error",
};
//------------------------- КОНФИГ --------------------//


//------------------------- ЭЛЕМЕНТЫ --------------------//
const profileUserName = document.querySelector(".profile__name");
const profileUserJob = document.querySelector(".profile__position");
const popupEditForm = document.querySelector(".popup_type_edit-form");
const nameInput = popupEditForm.querySelector(".popup__input_data_name");
const jobInput = popupEditForm.querySelector(".popup__input_data_job");
const profileEditButton = document.querySelector(".profile__edit-button");

const plusButton = document.querySelector(".profile__plus-button");
const formElementPhoto = document.querySelector(".popup_type_add-card");
const photoInput = document.querySelector(".popup__input_data_photo");
const urlInput = document.querySelector(".popup__input_data_url");

const cards = document.querySelector(".cards");

const popupOpenPhotoImage = document.querySelector(".popup__image");
const popupOpenPhotoCaption = document.querySelector(".popup__caption");
const popupOpenPhoto = document.querySelector(".popup_type_open-image");

const popups = document.querySelectorAll(".popup");
const popupGeneralButtonSubmit = popupEditForm.querySelector(".popup__save");
//------------------------- ЭЛЕМЕНТЫ --------------------//



//------------------------- ВАЛИДАТОРЫ --------------------//
const profileValidator = new FormValidator(settingsValidation, popupEditForm);
const cardValidator = new FormValidator(settingsValidation, formElementPhoto);
//------------------------- ВАЛИДАТОРЫ --------------------//


//------------------------- ОБЩИЕ ФУНКЦИИ --------------------//
// функция создания карточки
function createCard(cardObject) {
  const cardElement = new Card(cardObject, openCard).createCard();
  return cardElement;
}


// обработка нажатия esc
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const popupOpened = document.querySelector(".popup_opened");
    closePopup(popupOpened);
  }
}
// Универсальные для открытия/закрытия попапа
function openPopup(place) {
  place.classList.add("popup_opened");
  document.addEventListener("keydown", handleEscape);
}
function closePopup(place) {
  place.classList.remove("popup_opened");
  document.removeEventListener("keydown", handleEscape);
}
// открытие попапа профиля
function openProfileEditPopup() {
  openPopup(popupEditForm);
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserJob.textContent;
}

// сабмит попапа профиля
function handleFormSubmitEditProfile(evt) {
  evt.preventDefault();

  nameInput.value;
  jobInput.value;

  profileUserName.textContent = nameInput.value;
  profileUserJob.textContent = jobInput.value;

  closePopup(popupEditForm);
}
// открытие попапа создания новых карточек
function openCardFormPopup() {
  openPopup(formElementPhoto);
  cardValidator.resetValidation();
}
// сабмит попапа создания новых карточек
function handleFormSubmitCard(evt) {
  evt.preventDefault();
  const card = createCard({ name: photoInput.value, link: urlInput.value })
    cards.prepend(card);
  photoInput.value = "";
  urlInput.value = "";
  closePopup(formElementPhoto);
}
// открытие попапа карточки
function openCard(image, caption) {
  openPopup(popupOpenPhoto);
  popupOpenPhotoImage.src = image;
  popupOpenPhotoImage.alt = `Изображение ${caption}`;
  popupOpenPhotoCaption.textContent = caption;
}
//------------------------- ОБЩИЕ ФУНКЦИИ --------------------//


//-------------------------ПОДПИСКА НА СОБЫТИЯ --------------------//
// закрытие попапов
popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (
      evt.target.classList.contains("popup_opened") ||
      evt.target.classList.contains("popup__close-button")
    ) {
      closePopup(popup);
    }
  });
});

// Слушатели
profileEditButton.addEventListener("click", openProfileEditPopup);
popupEditForm.addEventListener("submit", handleFormSubmitEditProfile);
plusButton.addEventListener("click", openCardFormPopup);
formElementPhoto.addEventListener("submit", handleFormSubmitCard);
//-------------------------ПОДПИСКА НА СОБЫТИЯ --------------------//


//-------------------------ОТРИСОВКА КАРТОЧЕК --------------------//
// Рисуем карточки из начального массива
initialCards.forEach((object) => {
  const card = createCard(object);
  cards.append(card);
});
//-------------------------ОТРИСОВКА КАРТОЧЕК --------------------//
