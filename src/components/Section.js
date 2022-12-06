export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer,
    this._container = containerSelector;
  }
// Отрисовка всех элементов
  renderItems(cardElements) {
    cardElements.forEach(item => this._renderer(item));
  }
//Принимает DOM-элемент и добавляет его 
  addItem(cardElement) {
    this._container.prepend(cardElement);
  }
}


  