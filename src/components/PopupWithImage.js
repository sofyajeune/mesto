/*Создайте класс PopupWithImage, 
который наследует от Popup. Этот класс должен 
перезаписывать родительский метод open. 
В методе open класса PopupWithImage нужно 
вставлять в попап картинку с src изображения
 и подписью к картинке.*/

import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector('.popup__image');
    this._caption = this._popup.querySelector('.popup__caption');
  }

  open(image, caption) {
    super.open();
    this._image.src = image;
    this._image.alt = `Изображение ${caption}`;
    this._caption.textContent = caption;
  }
}

/*function openCard(image, caption) { 

  openPopup(popupOpenPhoto); 

  popupOpenPhotoImage.src = image; 

  popupOpenPhotoImage.alt = `Изображение ${caption}`; 

  popupOpenPhotoCaption.textContent = caption; 

} */