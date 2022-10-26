
/*Экземпляр класса FormValidator создаётся для каждой проверяемой формы. Этот класс должен:
Принимать в конструктор объект настроек с классами формы (настройки лежат в константе в index.js); 
Принимать в конструктор ссылку на HTML-элемент проверяемой формы;
Содержать приватные методы для обработки формы. В методах за объектом настроек следует
обращаться к полю класса, а не передавать его в каждый метод, как это было реализовано ранее;
Содержать публичный метод enableValidation — вызовите его после создания экземпляра класса. (вызван внизу index.js)
Каждый класс выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится в
классе. Ни один другой класс к решению этой задачи не относится.*/

export default class formValidator {
  constructor(settings, formElement) {
    this._form = formElement;
    this._submitButton = this._form.querySelector(settings.submitButtonSelector);
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputList = Array.from(this._form.querySelectorAll(settings.inputSelector));
    this._inputErrorClass = settings.inputErrorClass;
  }

  _hasInvalidInput = () => this._inputList.some(inputElement => !inputElement.validity.valid);

  _toggleButtonState = () => {
    if (this._hasInvalidInput()) {
      this._submitButton.setAttribute('disabled', true);
      this._submitButton.classList.add(this._inactiveButtonClass);
    } else {
      this._submitButton.classList.remove(this._inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  };

  _showInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.popup__form-input-error_${inputElement.id}`);
    errorElement.textContent = inputElement.validationMessage;
    inputElement.classList.add(this._inputErrorClass);
  };

  _hideInputError = (inputElement) => {
    const errorElement = this._form.querySelector(`.popup__form-input-error_${inputElement.id}`);
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
    this._inputList.forEach(inputElement => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  enableValidation() {
    this._setInputListeners();
  }

  resetValidation() {
    this._inputList.forEach(inputElement => {
      this._hideInputError(inputElement)
    });
    this._toggleButtonState();
  }
}

/*

const settingsList = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save',
  inactiveButtonClass: 'popup__save_disabled',
  inputErrorClass: 'popup__input_error'
}


function enableValidation(settings) {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    setEventListeners(formElement, settings);
  });
};


function setEventListeners(formElement, settings) {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, settings);
      toggleButtonState(inputList, buttonElement, settings);
    })
  })
}

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

function toggleButtonState(inputList, buttonElement, settings) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(settings.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(settings.inactiveButtonClass);
    buttonElement.removeAttribute('disabled')
  }
}

function checkInputValidity(formElement, inputElement, settings) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, settings);
  } else {
    hideInputError(formElement, inputElement, settings);
  }
}


function showInputError(formElement, inputElement, errorMessage, settings) {
  const errorElement = formElement.querySelector(`.popup__form-input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
  errorElement.textContent = errorMessage;
  inputElement.classList.add(settings.inputErrorClass);
}

function hideInputError(formElement, inputElement, settings) {
  const errorElement = formElement.querySelector(`.popup__form-input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
  errorElement.textContent = "";
  inputElement.classList.remove(settings.inputErrorClass);
}

enableValidation(settingsList)




/*export default class formValidator {
  constructor(settings, form) {
    this._form = form;
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._inputErrorClass = settings.inputErrorClass;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
    this._inputList = Array.from(this._form.querySelectorAll(this._inputSelector));
  }

  enableValidation() {
    this._setEventListeners(this._form)
  };

  // Обработчики
  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      })
    })
  }

  // Проверка валидности формы
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.popup__form-input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
    errorElement.textContent = errorMessage;
    inputElement.classList.add(this._inputErrorClass);
  }

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.popup__form-input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
    errorElement.textContent = "";
    inputElement.classList.remove(this._inputErrorClass);
  }

  _hasInvalidInput = () => this._inputList.some(inputElement => !inputElement.validity.valid);

  // Изменяет состояние кнопки сабмита
  _toggleButtonState() {
    if (this._buttonElement.disabled) {
      this._buttonElement.classList.add(this._inactiveButtonClass)
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }
}


/*Экземпляр класса FormValidator создаётся для каждой проверяемой формы. Этот класс должен:
Принимать в конструктор объект настроек с классами формы (настройки лежат в константе в index.js); 
Принимать в конструктор ссылку на HTML-элемент проверяемой формы;
Содержать приватные методы для обработки формы. В методах за объектом настроек следует
обращаться к полю класса, а не передавать его в каждый метод, как это было реализовано ранее;
Содержать публичный метод enableValidation — вызовите его после создания экземпляра класса. (вызван внизу index.js)
Каждый класс выполняет строго одну задачу. Всё, что относится к решению этой задачи, находится в
классе. Ни один другой класс к решению этой задачи не относится.*/




/*const settingsList = {
formSelector: '.popup__form',
inputSelector: '.popup__input',
submitButtonSelector: '.popup__save',
inactiveButtonClass: 'popup__save_disabled',
inputErrorClass: 'popup__input_error'
}


function enableValidation(settings) {
const formList = Array.from(document.querySelectorAll(settings.formSelector));
formList.forEach((formElement) => {
  setEventListeners(formElement, settings);
});
};


function setEventListeners(formElement, settings) {
const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
const buttonElement = formElement.querySelector(settings.submitButtonSelector);
toggleButtonState(inputList, buttonElement, settings);
inputList.forEach((inputElement) => {
  inputElement.addEventListener('input', () => {
    checkInputValidity(formElement, inputElement, settings);
    toggleButtonState(inputList, buttonElement, settings);
  })
})
}

function hasInvalidInput(inputList) {
return inputList.some((inputElement) => {
  return !inputElement.validity.valid;
})
}

function toggleButtonState(inputList, buttonElement, settings) {
if (hasInvalidInput(inputList)) {
  buttonElement.classList.add(settings.inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
} else {
  buttonElement.classList.remove(settings.inactiveButtonClass);
  buttonElement.removeAttribute('disabled')
}
}

function checkInputValidity(formElement, inputElement, settings) {
if (!inputElement.validity.valid) {
  showInputError(formElement, inputElement, inputElement.validationMessage, settings);
} else {
  hideInputError(formElement, inputElement, settings);
}
}


function showInputError(formElement, inputElement, errorMessage, settings) {
const errorElement = formElement.querySelector(`.popup__form-input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
errorElement.textContent = errorMessage;
inputElement.classList.add(settings.inputErrorClass);
}

function hideInputError(formElement, inputElement, settings) {
const errorElement = formElement.querySelector(`.popup__form-input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
errorElement.textContent = "";
inputElement.classList.remove(settings.inputErrorClass);
}

enableValidation(settingsList) */