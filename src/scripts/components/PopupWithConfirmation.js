import { Popup } from "./Popup.js";

export class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmDeleteButton = this._popup.querySelector(
      ".popup__delete-place-button"
    );
  }

  open(cardId, removingCard) {
    super.open();
    this._removingCard = removingCard;
    this._cardId = cardId;
  }

  setSubmitAction() {
  }

  setEventListeners() {
    super.setEventListeners();
    this._form = this._popup.querySelector(".popup__form");
    this._form.addEventListener("submit", (evt) => {

      this.setSubmitAction();
      
      evt.preventDefault();

      console.log('Submit')
    });
  }
}
