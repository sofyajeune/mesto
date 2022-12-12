import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
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
  settingsValidation,
  options,
  popupAvatar,
  buttonPopupAvatar,
  profileAvatar,
  currentId,
  popupDeleteCard,
  templateSelector
} from '../utils/constants.js';

//Валидация
const profileValidator = new FormValidator(settingsValidation, popupEditForm);
const cardValidator = new FormValidator(settingsValidation, formElementPhoto);
const avatarValidator = new FormValidator(settingsValidation, popupAvatar); // нужна форма попапа 


// Попапы
const popupOpenImage = new PopupWithImage(popupOpenPhoto);
const popupCard = new PopupWithForm(formElementPhoto, submitPopupCard);
const popupProfile = new PopupWithForm(popupEditForm, submitPopupProfile);
const userInfo = new UserInfo({
  name: profileUserName,
  about: profileUserJob,
  avatar: profileAvatar,
});
const newAvatar = new PopupWithForm(popupAvatar, submitNewAvatar); //Аватар попап
const confirmPopup = new PopupWithConfirmation(popupDeleteCard); // Попап с подтверждением удаления


//API
const api = new Api(options);
Promise.all([api.getUserInfo(), api.getInitialCard()])
  .then(([data, cards]) => {
    userInfo.setUserInfo(data);
    cardList.renderItems(cards.reverse());
  })
  .catch(err => {
    console.log(err);
  });

//Создать карточку

function createCard(item) {
  const card = new Card(item, templateSelector, currentId,
    () => popupOpenImage.open({ name: item.name, link: item.link }), //handleCardClick 
    () => {
      confirmPopup.open();
      confirmPopup.handleConfirm(() => {
        confirmPopup.renderLoading(true)
        api.removeCard(item._id)
          .then(() => card.removeCard(), confirmPopup.close())
          .catch(err => console.log(err))
          .finally(() => {
            confirmPopup.renderLoading(true, 'Удалено')
          })//handleDeleteClick
      })
    },
    (id) => {
      if (card.isLiked()) {
        api.changeLikeCardStatus(id, true)
          .then((res) => {
            card.getLikesAmount(res)
          })
          .then(() => {
            card.dislikeCard()
          })
          .catch(err => console.log(err))

      } else {
        api.changeLikeCardStatus(id, false)
          .then((res) => {
            card.getLikesAmount(res);
          })
          .then(() => {
            card.likeCard()
          })
          .catch(err => console.log(err))
      }
    }); //handleLikeClick
  const cardElement = card.createCard();
  return cardElement;
};


const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
  cards);

//Сабмит инфы профиля 
function submitPopupProfile(data) {
  popupProfile.renderLoading(true)
  api.setUserInfo(data.name, data.about)
    .then(() => {
      userInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupProfile.renderLoading(false, 'Сохранено')
    });
}

//Сабмит карточки 
function submitPopupCard(data) {
  popupCard.renderLoading(true)
  api.addNewCard(data.name, data.link)
    .then((data) => {
      cardList.addItem(createCard(data))
      popupCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupCard.renderLoading(false, 'Создать')
    })
}

//Сабмит аватарки 
function submitNewAvatar(data) {
  newAvatar.renderLoading(true)
  api.addNewAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      newAvatar.renderLoading(false, 'Сохранить')
    });
  newAvatar.close();
}


//Слушатели
buttonPopupAvatar.addEventListener('click', () => {
  newAvatar.open();
});

profileEditButton.addEventListener('click', () => {
  popupProfile.open();
  const userInfoNow = userInfo.getUserInfo();
  nameInput.value = userInfoNow.name,
    jobInput.value = userInfoNow.about,
    profileValidator.enableButton();
});

plusButton.addEventListener('click', () => {
  popupCard.open();
  cardValidator.disableButton();
});

popupOpenImage.setEventListeners();
popupCard.setEventListeners();
popupProfile.setEventListeners();
newAvatar.setEventListeners();
confirmPopup.setEventListeners();

profileValidator.enableValidation();
cardValidator.enableValidation();
avatarValidator.enableValidation();
