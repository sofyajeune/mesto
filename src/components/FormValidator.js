/*Экземпляр класса FormValidator создаётся для каждой проверяемой формы. Этот класс должен:
Принимать в конструктор объект настроек с классами формы (настройки лежат в константе в index.js); 
Принимать в конструктор ссылку на HTML-элемент проверяемой формы;
Содержать приватные методы для обработки формы. В методах за объектом настроек следует
обращаться к полю класса, а не передавать его в каждый метод, как это было реализовано ранее;
Содержать публичный метод enableValidation — вызовите его после создания экземпляра класса. (вызван внизу index.js)
Каждый класс выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится в
классе. Ни один другой класс к решению этой задачи не относится.*/

export default class FormValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._submitButton = this._form.querySelector(
      settings.submitButtonSelector
    );
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputList = Array.from(
      this._form.querySelectorAll(settings.inputSelector)
    );
    this._inputErrorClass = settings.inputErrorClass;

    this._setInputListeners();
  }

  enableValidation() {
    this._inputList.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
    this._toggleButtonState();
    this.disableButton();
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }

  disableButton() {
    this._submitButton.setAttribute("disabled", true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  _hasInvalidInput = () =>
    this._inputList.some((inputElement) => !inputElement.validity.valid);

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  };

  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  };

  _checkInputValidity = (inputElement) => {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  };

  _setInputListeners() {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
}
