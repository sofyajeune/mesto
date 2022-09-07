let popup = document.querySelector('.popup');
let profileUserName = document.querySelector('.profile__name');
let profileUserJob = document.querySelector('.profile__position');
let formElement = document.querySelector('.popup');
let nameInput = formElement.querySelector('.popup__author');
let jobInput = formElement.querySelector('.popup__position');
let profileEditButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close-button');

function openPopup() {
  nameInput.value = profileUserName.textContent;
  jobInput.value = profileUserJob.textContent;
  popup.classList.add('popup__opened');
}

function closePopup() {
  popup.classList.remove('popup__opened');
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

