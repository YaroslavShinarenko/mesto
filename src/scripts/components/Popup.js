export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOutsideClose = this._handleClickOutsideClose.bind(this);
    this._submitButton = this._popup.querySelector('.popup__button')
  }

  open() {
    this._popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  renderLoading(isLoading, text) {
    if (isLoading) {
      this._submitButton.textContent = text;
      this._submitButton.style.pointerEvents = "none"
    }
    else {
      this._submitButton.textContent = text;
      this._submitButton.removeAttribute('style')
    } 
  }

  _handleEscClose(event) {
    if (event.key === "Escape") {
      this.close();
    }
  }

  _handleClickOutsideClose(event) {
    if (event.target.classList.contains("popup_active")) {
      this.close();
    }
    if (event.target.classList.contains("popup__close-button")) {
      this.close();
    }
  }


  setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleClickOutsideClose);
  }
}
