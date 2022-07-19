const places = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://images.unsplash.com/photo-1580993123109-63aea48b2807?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2418&q=80",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://images.unsplash.com/photo-1617835594990-7cd5a9b5d153?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80",
  },
];

const enableValidationObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
  closeButton: ".popup__close-button",
};

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");
const placeAddButton = document.querySelector(".profile__place-add-button");
const placesList = document.querySelector(".places__list");
const nameInput = document.querySelector(".popup__input_profile_name");
const aboutInput = document.querySelector(".popup__input_profile_about");

export {
  places,
  enableValidationObj,
  profileName,
  profileAbout,
  placeAddButton,
  profileEditButton,
  nameInput,
  aboutInput,
  placesList,
};
