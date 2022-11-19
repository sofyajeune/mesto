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
    constructor({ name, job }) {
      this._nameSelector = name;
      this._jobSelector = job;
    }

  //возвращает данные пользователи 
    getUserInfo() {
      return {
        name: this._nameSelector.textContent,
        job:  this._jobSelector.textContent
      }
    }
  // отправляет данные пользователи в разметку
    setUserInfo(data) {
      this._nameSelector.textContent = data.name;
      this._jobSelector.textContent = data.job;
    }
  }