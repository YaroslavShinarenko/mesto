import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";

////////////////////////////////////////////////////////////////////////

const popupList = Array.from(document.querySelectorAll(".popup"));
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");
const profileForm = document.querySelector(".popup_type_profile-edit");
const placeAddForm = document.querySelector(".popup_type_place-add");
const formEditProfile = document.querySelector(".popup__profile-edit-form");
const nameInput = document.querySelector(".popup__input_profile_name");
const aboutInput = document.querySelector(".popup__input_profile_about");
const formAddPlace = document.querySelector(".popup__place-add-form");
const placeNameInput = document.querySelector(".popup__input_place-name");
const placeLinkInput = document.querySelector(".popup__input_place_image-link");
const placeAddButton = document.querySelector(".profile__place-add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const closeButtons = document.querySelectorAll(".popup__close-button");
const placeCreateButton = document.querySelector(".popup__create-place-button");

////////////////////////////////////////////////////////////////////////

export function openPopup(popup) {
  popup.classList.add("popup_active");

  document.addEventListener("keydown", closePopupOnEscape);
}

////////////////////////////////////////////////////////////////////////

function closePopup(popup) {
  popup.classList.remove("popup_active");

  document.removeEventListener("keydown", closePopupOnEscape);
}

////////////////////////////////////////////////////////////////////////

function openProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  openPopup(profileForm);
}

profileEditButton.addEventListener("click", openProfileForm);

////////////////////////////////////////////////////////////////////////

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup(profileForm);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

////////////////////////////////////////////////////////////////////////

function openPlaceAddform() {
  openPopup(placeAddForm);
}

placeAddButton.addEventListener("click", openPlaceAddform);

////////////////////////////////////////////////////////////////////////

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

////////////////////////////////////////////////////////////////////////

function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault();

  const name = placeNameInput.value;
  const link = placeLinkInput.value;

  const card = new Card({ name, link }, ".place-template");
  const cardElement = card.generateCard();

  document.querySelector(".places__list").prepend(cardElement);

  placeCreateButton.classList.add("popup__button_disabled");
  placeCreateButton.setAttribute("disabled", true);

  formAddPlace.reset();
  closePopup(placeAddForm);
}

formAddPlace.addEventListener("submit", handlePlaceAddFormSubmit);

////////////////////////////////////////////////////////////////////////

function closePopupOnEscape(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_active");
    closePopup(activePopup);
  }
}

////////////////////////////////////////////////////////////////////////

function closePopupOnClickOutside(event) {
  popupList.forEach((popup) => {
    popup.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_active")) {
        closePopup(popup);
      }
    });
  });
}

closePopupOnClickOutside();

////////////////////////////////////////////////////////////////////////

const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

const formAddPlaceValidator = new FormValidator(enableValidation, placeAddForm);
formAddPlaceValidator.enableValidation();

const profileFormValidator = new FormValidator(enableValidation, profileForm);
profileFormValidator.enableValidation();

////////////////////////////////////////////////////////////////////////

export const places = [
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

////////////////////////////////////////////////////////////////////////

places.forEach((place) => {
  const card = new Card(place, ".place-template");
  const cardElement = card.generateCard();

  document.querySelector(".places__list").prepend(cardElement);
});
