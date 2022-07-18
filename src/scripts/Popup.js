export class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickOutsideClose = this._handleClickOutsideClose.bind(this);
  }

  open() {
    this._popup.classList.add("popup_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_active");
    document.removeEventListener("keydown", this._handleEscClose);
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
