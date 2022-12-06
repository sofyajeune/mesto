export default class UserInfo {
  constructor({ name, about, avatar }) {
    this._userName = name;
    this._userJob = about;
    this._avatar = avatar;
  }

  //возвращает данные пользователи 
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent
    }
  }
  // отправляет данные пользователи в разметку
  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userJob.textContent = data.about;
    this._avatar.src = data.avatar
  }
}