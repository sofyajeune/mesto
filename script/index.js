let popup = document.querySelector('.popup');
let popupOpen = document.querySelector('.profile__link');
let paragraphName = document.querySelector('.profile__name');
let paragraphJob = document.querySelector('.profile__position');
let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__author');
let jobInput = formElement.querySelector('.popup__position');
let addButton = document.querySelector('.popup__save');
let openButton = document.querySelector('.profile__link');
let closeButton = document.querySelector('.popup__close');

function openPopup() {
popup.classList.add('popup__open');
}

function closePopup() {
    popup.classList.remove('popup__open');  
}

function formSubmitHandler(evt) {
    evt.preventDefault();

    nameInput.value;
    jobInput.value;

  paragraphName.textContent =  nameInput.value;
  paragraphJob.textContent = jobInput.value;
};


openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
addButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

