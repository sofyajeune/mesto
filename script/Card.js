/*Экземпляр класса Card создаётся для каждой карточки. Класс Card должен:
Принимать в конструктор ссылки на изображение и текст;
Принимать в конструктор селектор для template -элемента с шаблоном разметки;

Обладать приватными методами, которые установят слушателей событий, обработают клики,
подготовят карточку к публикации;
Обладать публичным методом, который вернёт готовую разметку, с установленными слушателями
событий.*/

export default class Card {
  constructor(object, openCard) {
    this._name = object.name;
    this._link = object.link;
    this._openCard = openCard;
  }

  createCard() {
    this._object = this._cardTemplate();
    this._setEventListeners();

    this._cardElementImage.src = this._link;
    this._cardElementImage.alt = `Изображение ${this._name}`;
    this._object.querySelector('.cards__text').textContent = this._name;

    return this._object
  }

  _cardTemplate() {
    const cardElement = document.
      querySelector('#cardsTemplate').content.querySelector('.cards__elements').cloneNode(true);
    return cardElement
  }
  _setEventListeners() {

    this._cardDeleteButton = this._object.querySelector('.cards__button-remove');
    this._likeButton = this._object.querySelector('.cards__like-button');
    this._cardElementImage = this._object.querySelector('.cards__photo');

    this._cardDeleteButton.addEventListener('click', () => this._object.remove());
    this._likeButton.addEventListener('click', () => this._likeButton.classList.toggle('cards__like-button_active'));
    this._cardElementImage.addEventListener('click', () => this._openCard(this._link, this._name));
  }
}