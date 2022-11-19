import Popup from "./Popup.js";
import { nameInput, jobInput, photoInput, urlInput } from '../utils/constants.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitForm = submitForm;
  }

  _getInputValues() {
return {
  name: nameInput.value,
  job: jobInput.value,
  place: photoInput.value,
  url: urlInput.value,
}
  }

  /*

      this._formValues = {};
    this._inputList.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues; 

если this._formValues  - это пустой объект, то да, ты наполняешь объект парами ключ: значение

если this._formValues  - это объект с данными, то ты их по ключам перезаписываешь новыми значениями

input.name отдаст нам строку, при помощи квадратных скобок ['строка'] динамически определим ключ в объекте
...

а если просто вернуть значения из переменных*/

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitForm(this._getInputValues());
      this.close();
    });
  }
}

