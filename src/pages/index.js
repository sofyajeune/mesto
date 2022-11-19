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

} from '../utils/constants.js';

const profileValidator = new FormValidator(settingsValidation, popupEditForm);
const cardValidator = new FormValidator(settingsValidation, formElementPhoto);

const popupOpenImage = new PopupWithImage(popupOpenPhoto);
const popupCard = new PopupWithForm(formElementPhoto, submitPopupCard); 
const popupProfile = new PopupWithForm(popupEditForm, submitPopupProfile);
const userInfo = new UserInfo({
  name: profileUserName,
  job: profileUserJob,
});



const defaultCardList = new Section({
  renderer: (item) => {
    const cardElement = new Card(item, '#cardsTemplate', popupOpenImage).createCard();
    defaultCardList.addItem(cardElement);
  }
}, cards);


/*
сonst defaultCardList = new Section({
  data: items,
  renderer: (item) => {
    const card = new DefaultCard(item, '.default-card');
    const cardElement = card.generateCard();
    defaultCardList.setItem(cardElement);
  }
}, cardListSelector);*/


profileEditButton.addEventListener('click', () => {
  popupProfile.open();
  const userInfoNow = userInfo.getUserInfo();
  nameInput.value = userInfoNow.name,
  jobInput.value = userInfoNow.job,
  profileValidator.enableValidation();
  profileValidator.enableButton();
});

plusButton.addEventListener('click', () => {
  popupCard.open();
  cardValidator.enableValidation();
});

function submitPopupProfile(data) {
  userInfo.setUserInfo(data);
  profileValidator.enableValidation();
}

function submitPopupCard(data) {
  const newImage = [{
    name: data.place,
    link: data.url
  }];

defaultCardList.renderItems(newImage);
}

defaultCardList.renderItems(initialCards);


popupOpenImage.setEventListeners();
popupCard.setEventListeners();
popupProfile.setEventListeners();

profileValidator.enableValidation();
cardValidator.enableValidation();



