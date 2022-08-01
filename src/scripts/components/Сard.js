export class Card {
  constructor(
    data,
    cardSelector,
    handlePlaceClick,
    handlePlaceDeleteClick,
    api,
    currentUserId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._api = api;
    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handlePlaceClick = handlePlaceClick;
    this._handlePlaceDeleteClick = handlePlaceDeleteClick;
    this._likeCounter = data.likes.length;
    this._likeIsActive = data.likes.some((user) => {
      if (data.likes.length !== 0) {
        if (currentUserId === user._id) {
          return true;
        } 
      }
    });
  }

  _toggleLike() {
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
      if (this._likeIsActive) {
        this._likeCounter--;
        this._likeButton.textContent = this._likeCounter;
        this._api
          .removeLike(this._id)
          .then(() => {
            this._likeIsActive = false;
            this._toggleLike();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        this._likeCounter++;
        this._likeButton.textContent = this._likeCounter;
        this._api
          .setLike(this._id)
          .then(() => {
            this._likeIsActive = true;
            this._toggleLike();
          })
          .catch((err) => {
            console.log(err);
          });
      }
    });

    this._deleteButton.addEventListener("click", () => {
      this._handlePlaceDeleteClick(this._element, this._id);
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
    this._element.id = this._id;

    
    this._likeButton.textContent = this._likeCounter;

    if (this._likeIsActive) {
      this._likeButton.classList.add("place__like-button_active");
    }

    if (this._ownerId === this._currentUserId) {
      this._deleteButton.classList.add("place__delete-button_visible");
    }

    return this._element;
  }
}
