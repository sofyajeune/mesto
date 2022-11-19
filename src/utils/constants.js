export const profileUserName = document.querySelector(".profile__name");
export const profileUserJob = document.querySelector(".profile__position");
export const popupEditForm = document.querySelector(".popup_type_edit-form");
export const nameInput = popupEditForm.querySelector(".popup__input_data_name");
export const jobInput = popupEditForm.querySelector(".popup__input_data_job");
export const profileEditButton = document.querySelector(".profile__edit-button");

export const plusButton = document.querySelector(".profile__plus-button");
export const formElementPhoto = document.querySelector(".popup_type_add-card");
export const photoInput = document.querySelector(".popup__input_data_photo");
export const urlInput = document.querySelector(".popup__input_data_url");

export const cards = document.querySelector(".cards");

export const popupOpenPhotoImage = document.querySelector(".popup__image");
export const popupOpenPhotoCaption = document.querySelector(".popup__caption");
export const popupOpenPhoto = document.querySelector(".popup_type_open-image");

export const popups = document.querySelectorAll(".popup");
export const popupGeneralButtonSubmit = popupEditForm.querySelector(".popup__save");

export const initialCards = [
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

export const settingsValidation = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__save",
    inactiveButtonClass: "popup__save_disabled",
    inputErrorClass: "popup__input_error",
};