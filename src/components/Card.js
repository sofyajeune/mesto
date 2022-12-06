export default class Card {
  constructor(data, templateSelector, like, dislike, currentId, handleCardClick, handleDeleteClick) {
    this._templateSelector = templateSelector;
    this._data = data;
    this._handleCardClick = handleCardClick;
    this._like = like;
    this._dislike = dislike;
    this._userId = currentId;
    this._handleDeleteClick = handleDeleteClick;
  }

  removeCard() {
    this._element.remove();
  };


  createCard() {
    this._element = this._cardTemplate();
    this._image = this._getImage();
    this._image.src = this._data.link;
    this._image.alt = this._data.name;
    this._cardDelete = this._getDeleteButton();
    this._cardLike = this._getLikeButton();
    this._likesCounter = this._getLikesCounter();
    this._element.querySelector('.cards__text').textContent = this._data.name;
    this._setInitialCardSettings();
    this._setEventListeners();

    return this._element
  }

  _openCard() {
    this._handleCardClick.open(this._link, this._name)
  }

  _cardTemplate() {
    const cardElement = document.
      querySelector(this._templateSelector).content.querySelector('.cards__elements').cloneNode(true);
    return cardElement
  }

  _getImage() {
    const cardImage = this._element.querySelector('.cards__photo');
    return cardImage;
  };

  _getDeleteButton() {
    const cardDelete = this._element.querySelector('.cards__button-remove');
    return cardDelete;
  };

  _getLikeButton() {
    const cardLike = this._element.querySelector('.cards__like-button');
    return cardLike;
  };

  _getLikesCounter() {
    const likesCounter = this._element.querySelector('.cards__amount-likes');
    return likesCounter;
  };

  _getLikesAmount(arr) {
    this._likesCounter.textContent = arr.likes.length;
  };

  _setInitialCardSettings() {
    this._getLikesAmount(this._data)
    if (this._data.likes.some(element => element._id === this._userId)) {
      this._cardLike.classList.add('cards__like-button_active');
    }
    if (this._data.owner._id !== this._userId) {
      this._cardDelete.remove();
    }
  };

  _handleLike() {
    this._like(this._data._id)
      .then((arr) => {
        this._cardLike.classList.add('cards__like-button_active');
        this._getLikesAmount(arr)
      })
      .catch(err => console.log(err));
  };

  _handleDislike() {
    this._dislike(this._data._id)
      .then((arr) => {
        this._cardLike.classList.remove('cards__like-button_active');
        this._getLikesAmount(arr)
      })
      .catch(err => console.log(err));
  };

  _setEventListeners() {
    this._image.addEventListener('click', () => {
      this._handleCardClick();

    });
    this._cardDelete.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._cardLike.addEventListener('click', () => {
      if (this._cardLike.classList.contains('card__like_active')) {
        this._handleDislike()
      } else {
        this._handleLike()
      }
    });
  };
}