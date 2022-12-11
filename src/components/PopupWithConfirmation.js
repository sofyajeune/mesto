import Popup from '../components/Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  };

  renderLoading(isLoading, submitType) {
    if (isLoading) {
      this._popup.querySelector('.popup__save').textContent = 'Удаление...';
    } else {
      this._popup.querySelector('.popup__save').textContent = submitType;
    }
  }

  close() {
    super.close()
  }

  handleConfirm(handleDeleteCard) {
    this._handleDeleteCard = handleDeleteCard;
  }

  setEventListeners() {
    super.setEventListeners()
    this._popup.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleDeleteCard()
    });
  }
};
  