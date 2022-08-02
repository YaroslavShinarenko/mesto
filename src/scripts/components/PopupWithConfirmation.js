import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector, handleConfirmation) {
    super(popupSelector);
    this._confirmDeleteButton = this._popup.querySelector(
      ".popup__delete-place-button"
    );
    this._handleConfirmation = handleConfirmation;
  }

  open(removingCard, cardId) {
    super.open();
    this._removingCard = removingCard;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector(".popup__form");
    this._form.addEventListener("submit", (evt) => {
      
      evt.preventDefault();
      this._handleConfirmation(this._removingCard, this._cardId);
    });
  }
}
