export class Card {
  constructor(
    data,
    cardSelector,
    currentUserId,
    {
    handleCardClick,
    handleLikeClick,
    handleDeleteIconClick
    }
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._ownerId = data.owner._id;
    this._currentUserId = currentUserId;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleLikeClick = handleLikeClick;
    this._handleDeleteIconClick = handleDeleteIconClick;
    this._likeCounter = data.likes.length;
    this._likes = data.likes;
  }

  addLike() {
    this.likeButton.classList.add("place__like-button_active");
    this.likeIsActive = true;
    this._likeCounter++;
    this.likeButton.textContent = this._likeCounter;
  }

  deleteLike() {
    this.likeButton.classList.remove("place__like-button_active");
    this.likeIsActive = false;
    this._likeCounter--;
    this.likeButton.textContent = this._likeCounter;
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
    this.likeButton = this._element.querySelector(".place__like-button");
    this._deleteButton = this._element.querySelector(".place__delete-button");
    this._photo = this._element.querySelector(".place__photo");

    this._photo.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this.likeButton .addEventListener("click", () => {
      this._handleLikeClick(this._id, this.likeIsActive);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteIconClick(this._element, this._id);
    });
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();

    const placeName = this._element.querySelector(".place__name");
    const placeLink = this._photo;

    this._element.id = this._id;
    placeName.textContent = this._name;
    placeName.alt = this._name;
    placeLink.src = this._link;

    this.likeButton.textContent = this._likeCounter;

    this.likeIsActive = this._likes.some((user) => {
      if (this._currentUserId === user._id) {
        return true;
      }
    });

    if (this.likeIsActive) {
      this.likeButton.classList.add("place__like-button_active");
    }

    if (this._ownerId === this._currentUserId) {
      this._deleteButton.classList.add("place__delete-button_visible");
    }

    return this._element;
  }
}
