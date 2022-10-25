export default class Card {
  constructor(element) {
    this._name = element.name;
    this._link = element.link;
    this._openCard = element.openCard;
    this._template = document.querySelector('#cardTemplate').content;
  }

  _toggleLikeButton() {
    this._toggleLikeButton.classList.toggle('card__like-button_active')
  }

  _deleteCard() {
    this._cardElement.remove();
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector('.card__like-button');
    this._likeButton.addEventListener('click', () => {
      _toggleLikeButton()
    });

    this._cardDeleteButton = this._cardElement.querySelector('.card__button-remove');
    this._cardDeleteButton.addEventListener('click', () => {
      _deleteCard()
    });

    this._cardElement.addEventListener('click', () => {
      this.OpenCard(this)
    });
  }

  _createCardElement() {
    this._cardElement = this._template.querySelector('.card__elements').cloneNode(true);
    this._setEventListeners();

    this._cardElement = this._cardElement.querySelector('.card__text')
    this._cardElementImage = this._cardElement.querySelector('.card__photo');

    this._cardElement.textContent = this._name;
    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = this._name;

    return this._cardElement

  }
}

/*const cardTemplate = document.querySelector('#cardTemplate').content;

function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.card__elements').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.card__photo');

  const cardDeleteButton = cardElement.querySelector('.card__button-remove');
  const likeButton = cardElement.querySelector('.card__like-button');

  cardElementImage.src = link;
  cardElementImage.alt = `Изображение ${name}`;
  cardElement.querySelector('.card__text').textContent = name;

  cardElementImage.addEventListener('click', () => openCard(link, name));
  cardDeleteButton.addEventListener('click', () => cardElement.remove());

  likeButton.addEventListener('click', () => likeButton.classList.toggle('card__like-button_active'));

  return cardElement;
}

function renderCard(name, link) {
  const cardElement = createCard(name, link);
  card.prepend(cardElement);
}

initialCards.forEach((item) => renderCard(item.name, item.link));*/