export class Card {
  constructor(data, cardSelector, handlePlaceClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handlePlaceClick = handlePlaceClick;
  }

  _setLike() {
    this._likeButton.classList.toggle("place__like-button_active");
  }

  _removeCard() {
    this._element.remove();
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".place")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._likeButton = this._element.querySelector(".place__like-button");
    this._deleteButton = this._element.querySelector(".place__delete-button");
    this._photo = this._element.querySelector(".place__photo");

    this._photo.addEventListener("click", () => {
      this._handlePlaceClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._setLike();
    });

    this._deleteButton.addEventListener("click", () => {
      this._removeCard();
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeName = this._element.querySelector(".place__name");
    const placeLink = this._photo;

    placeName.textContent = this._name;
    placeName.alt = this._name;
    placeLink.src = this._link;

    return this._element;
  }
}
