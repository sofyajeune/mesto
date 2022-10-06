// включение валидации вызовом enableValidation
// все настройки передаются при вызове

const settingsList = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'form__input-error'
  }
  

  function enableValidation(settings) {
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', evt => {
        evt.preventDefault();
      });
      setEventListeners(formElement, settings);
    });
  }

  
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

  //const checkInputValidity = () => {
//if (!formInput.validity.valid) {
  //showError(formInput)
//}
//else {
   //   hideError(formInput)
  //}
//};
  
  function showInputError(formElement, inputElement, errorMessage, settings) {
    const errorElement = formElement.querySelector(`.form__input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
    errorElement.textContent = errorMessage;
    inputElement.classList.add(settings.inputErrorClass);
  }
  
  function hideInputError(formElement, inputElement, settings) {
    const errorElement = formElement.querySelector(`.form__input-error_${inputElement.id}`); // Выбираем элемент ошибки на основе уникального класса
    errorElement.textContent = "";
    inputElement.classList.remove(settings.inputErrorClass);
  }
  
  enableValidation(settingsList);