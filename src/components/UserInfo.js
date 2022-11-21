/*Создайте класс UserInfo
Класс UserInfo отвечает за управление отображением информации
 о пользователе на странице. Этот класс:
Принимает в конструктор объект с селекторами двух элементов: 
элемента имени пользователя и элемента информации о себе.
Содержит публичный метод getUserInfo, который возвращает объект 
с данными пользователя. Этот метод пригодится когда данные 
пользователя нужно будет подставить в форму при открытии.
Содержит публичный метод setUserInfo, который принимает 
новые данные пользователя и добавляет их на страницу.*/

export default class UserInfo {
    constructor({ userNameSelector, userJobSelector }) {
      this._userNameSelector = userNameSelector;
      this._userJobSelector = userJobSelector;
    }

  //возвращает данные пользователи 
    getUserInfo() {
      return {
        userNameSelector: this._userNameSelector.textContent,
        userJobSelector:  this._userJobSelector.textContent
      }
    }
  // отправляет данные пользователи в разметку
    setUserInfo(data) {
      this._userNameSelector.textContent = data.author;
      this._userJobSelector.textContent = data.job;
    }
  }