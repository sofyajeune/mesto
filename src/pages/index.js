import './index.css'; 

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import {
  profileUserName,
  profileUserJob,
  popupEditForm,
  nameInput,
  jobInput,
  profileEditButton,
  plusButton,
  formElementPhoto,
  cards,
  popupOpenPhoto,
  initialCards,
  settingsValidation,
   photoInput, 
   urlInput

} from '../utils/constants.js';

const profileValidator = new FormValidator(settingsValidation, popupEditForm);
const cardValidator = new FormValidator(settingsValidation, formElementPhoto);

const popupOpenImage = new PopupWithImage(popupOpenPhoto);
const popupCard = new PopupWithForm(formElementPhoto, submitPopupCard); 
const popupProfile = new PopupWithForm(popupEditForm, submitPopupProfile);
const userInfo = new UserInfo({
  userNameSelector: profileUserName,
  userJobSelector: profileUserJob,
});

const createCard = (item) => {
  const cardElement = new Card(item, '#cardsTemplate', {
      handleCardClick: () => {
        popupOpenImage.open(item);
      }
  });
  return cardElement;
}


const defaultCardList = new Section({
  renderer: (item) => {
    const card = createCard(item)
    const cardElement = card.createCard();
    defaultCardList.addItem(cardElement);
  }
}, cards);



profileEditButton.addEventListener('click', () => {
  popupProfile.open();
  const userInfoNow = userInfo.getUserInfo();
  nameInput.value = userInfoNow.userNameSelector,
  jobInput.value = userInfoNow.userJobSelector,
  profileValidator.enableButton();
});

plusButton.addEventListener('click', () => {
  popupCard.open();
  cardValidator.disableButton();
});

function submitPopupProfile(data) {
  userInfo.setUserInfo(data);
}

function submitPopupCard() {
  const card = createCard({
      name: photoInput.value,
      link: urlInput.value
  });
  const cardElement = card.createCard();
  defaultCardList.addItem(cardElement);
}

defaultCardList.renderItems(initialCards);

popupOpenImage.setEventListeners();
popupCard.setEventListeners();
popupProfile.setEventListeners();

profileValidator.enableValidation();
cardValidator.enableValidation();




