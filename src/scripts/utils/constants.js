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
const avatarChangeButton = document.querySelector(".profile__avatar-button");
const profileAvatar = document.querySelector(".profile__avatar");

export {
  enableValidationObj,
  profileName,
  profileAbout,
  placeAddButton,
  profileEditButton,
  nameInput,
  aboutInput,
  placesList,
  avatarChangeButton,
  profileAvatar,
};
