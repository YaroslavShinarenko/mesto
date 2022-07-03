import { openPopup } from "./index.js";

const placeInspector = document.querySelector(".popup_place-inspector");
const placeInspectorImage = document.querySelector(".place-inspector__image");
const placeInspectorName = document.querySelector(".place-inspector__name");

export class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _setLike() {
    this._element
      .querySelector(".place__like-button")
      .classList.toggle("place__like-button_active");
  }

  _removeCard() {
    this._element.remove();
  }

  _openPlaceInspector() {
    placeInspectorImage.alt = this._name;
    placeInspectorImage.src = this._link;
    placeInspectorName.textContent = this._name;

    openPopup(placeInspector);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element
      .querySelector(".place__photo")
      .addEventListener("click", () => {
        this._openPlaceInspector();
      });

    this._element
      .querySelector(".place__like-button")
      .addEventListener("click", () => {
        this._setLike();
      });

    this._element
      .querySelector(".place__delete-button")
      .addEventListener("click", () => {
        this._removeCard();
      });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeName = this._element.querySelector(".place__name");
    const placeLink = this._element.querySelector(".place__photo");

    placeName.textContent = this._name;
    placeName.alt = this._name;
    placeLink.src = this._link;

    return this._element;
  }
}
