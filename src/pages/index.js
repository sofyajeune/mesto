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
  popupAvatarSaveButton,
  popupAddButton,
  popupGeneralButtonSubmit,
  currentId,
  popupDeleteCard,
  popupDeleteCardSubmit
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
    console.log(data);
    userInfo.setUserInfo(data);
    cardList.renderItems(cards.reverse());
  })
  .catch(err => {
    console.log(err);
  });

const like = id => api.like(id);
const dislike = id => api.dislike(id);



//Функция для изменения кнопки на режим сохранения
function showLoading(isLoading, button, defaultText) {
  if (isLoading) {
    button.textContent = "Сохранение..."
  } else {
    button.textContent = defaultText
  }
};


//Создать карточку
function createCard(item) {
  const card = new Card(item, '#cardsTemplate', like, dislike, currentId, 
  () => popupOpenImage.open({ name: item.name, link: item.link }), //handleCardClick 
  () => {
    confirmPopup.open();
    confirmPopup.handleConfirm(() => {
      showLoading(true, popupDeleteCardSubmit)
      api.removeCard(item._id)
        .then(() => card.removeCard())
        .then(confirmPopup.close.bind(confirmPopup))
        .catch(err => console.log(err))
        .finally(() => {
          showLoading(false, popupDeleteCardSubmit, "Да")
        })
    })
  });//handleDeleteClick
  const cardElement = card.createCard();
  return cardElement;
};


const cardList = new Section({
  renderer: (item) => {
    cardList.addItem(createCard(item));
  }
},
  cards);

// const createCard = (item) => {
//   const cardElement = new Card(item, '#cardsTemplate', {
//     handleCardClick: () => {
//       popupOpenImage.open(item);
//     }
//   });
//   return cardElement;
// }


// const defaultCardList = new Section({
//   renderer: (item) => {
//     const card = createCard(item)
//     const cardElement = card.createCard();
//     defaultCardList.addItem(cardElement);
//   }
// }, cards);



// function submitPopupProfile(data) {
//   userInfo.setUserInfo(data);
// }

//Сабмит инфы профиля 
function submitPopupProfile(data) {
  showLoading(true, popupGeneralButtonSubmit)
  api.setUserInfo(data.name, data.about)
    .then(() => {
      userInfo.setUserInfo(data);
      popupProfile.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      showLoading(false, popupGeneralButtonSubmit, "Сохранить")
    });
}

//Сабмит карточки 
function submitPopupCard(data) {
  showLoading(true, popupAddButton)
  api.addNewCard(data.name, data.link)
    .then((data) => {
      cardList.addItem(createCard(data))
      popupCard.close();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      showLoading(false, popupAddButton, "Создать")
    })
}

//Сабмит аватарки 
function submitNewAvatar(data) {
  showLoading(true, popupAvatarSaveButton)
  api.addNewAvatar(data)
    .then((data) => {
      userInfo.setUserInfo(data)
    })
    .catch((err) => console.log(err))
    .finally(() => {
      showLoading(false, popupAvatarSaveButton, "Сохранить")
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




