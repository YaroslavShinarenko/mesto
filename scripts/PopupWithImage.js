import { Popup } from "./Popup.js";

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".place-inspector__image");
    this._name = this._popup.querySelector(".place-inspector__name");
  }

  open(name, link) {
    super.open();
    this._image.alt = name;
    this._image.src = link;
    this._name.textContent = name;
  }
}
