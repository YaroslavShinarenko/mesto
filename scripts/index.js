import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";

////////////////////////////////////////////////////////////////////////

const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");
const profileForm = document.querySelector(".popup_type_profile-edit");
const placeAddForm = document.querySelector(".popup_type_place-add");
const formEditProfile = document.querySelector(".popup__profile-edit-form");
const nameInput = document.querySelector(".popup__input_profile_name").value;
const aboutInput = document.querySelector(".popup__input_profile_about").value;
const formAddPlace = document.querySelector(".popup__place-add-form");
const placeNameInput = document.querySelector(".popup__input_place-name");
const placeLinkInput = document.querySelector(".popup__input_place_image-link");
const placeAddButton = document.querySelector(".profile__place-add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const placeInspector = document.querySelector(".popup_place-inspector");
const placeInspectorImage = document.querySelector(".place-inspector__image");
const placeInspectorName = document.querySelector(".place-inspector__name");
const placesList = document.querySelector(".places__list");

////////////////////////////////////////////////////////////////////////

// function openPopup(popup) {
//   popup.classList.add("popup_active");

//   document.addEventListener("keydown", closePopupOnEscape);
// }

////////////////////////////////////////////////////////////////////////

// function closePopup(popup) {
//   popup.classList.remove("popup_active");

//   document.removeEventListener("keydown", closePopupOnEscape);
// }

////////////////////////////////////////////////////////////////////////

// function openProfileForm() {
//   nameInput.value = profileName.textContent;
//   aboutInput.value = profileAbout.textContent;

//   formValidators["profile-form"].resetValidation();

//   openPopup(profileForm);
// }

// profileEditButton.addEventListener("click", openProfileForm);

////////////////////////////////////////////////////////////////////////

function handlePlaceClick(name, link) {
  const popupPlaceInspector = new PopupWithImage(placeInspector);
  popupPlaceInspector.setEventListeners();
  popupPlaceInspector.open(name, link);
}

////////////////////////////////////////////////////////////////////////

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();

//   profileName.textContent = nameInput.value;
//   profileAbout.textContent = aboutInput.value;

//   closePopup(profileForm);
// }

// formEditProfile.addEventListener("submit", handleProfileFormSubmit);

////////////////////////////////////////////////////////////////////////

// function openPlaceAddform() {
//   openPopup(placeAddForm);

//   formAddPlace.reset();
//   formValidators["place-add-form"].resetValidation();
// }

// placeAddButton.addEventListener("click", openPlaceAddform);

////////////////////////////////////////////////////////////////////////

function createCard(place) {
  const card = new Card(place, ".place-template", handlePlaceClick);
  const cardElement = card.generateCard();
  return cardElement;
}

////////////////////////////////////////////////////////////////////////

// function handlePlaceAddFormSubmit(evt) {
//   evt.preventDefault();

//   const name = placeNameInput.value;
//   const link = placeLinkInput.value;

//   const cardElement = createCard({ name, link });
//   placesList.prepend(cardElement);

//   formAddPlace.reset();
//   closePopup(placeAddForm);
// }

// formAddPlace.addEventListener("submit", handlePlaceAddFormSubmit);

////////////////////////////////////////////////////////////////////////

// function closePopupOnEscape(event) {
//   if (event.key === "Escape") {
//     const activePopup = document.querySelector(".popup_active");
//     closePopup(activePopup);
//   }
// }

////////////////////////////////////////////////////////////////////////

// function closePopupOnClickOutside(event) {
//   popupList.forEach((popup) => {
//     popup.addEventListener("mousedown", (event) => {
//       if (event.target.classList.contains("popup_active")) {
//         closePopup(popup);
//       }
//       if (event.target.classList.contains("popup__close-button")) {
//         closePopup(popup);
//       }
//     });
//   });
// }

// closePopupOnClickOutside();

////////////////////////////////////////////////////////////////////////

const enableValidationObj = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
  closeButton: ".popup__close-button",
};

const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute("name");

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(enableValidationObj);

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

// places.forEach((place) => {
//   const cardElement = createCard(place);
//   placesList.prepend(cardElement);
// });

////////////////////////////////////////////////////////////////////////

class Section {
  constructor({ data, renderer }, containerSelector) {
    this._renderedItems = data;
    this._renderer = renderer;

    this._container = containerSelector;
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems() {
    this._renderedItems.forEach((item) => {
      this._renderer(item);
    });
  }
}

////////////////////////////////////////////////////////////////////////

const placesGrid = new Section(
  {
    data: places,
    renderer: (place) => {
      const cardElement = createCard(place);
      placesList.prepend(cardElement);
    },
  },
  placesList
);

placesGrid.renderItems();

////////////////////////////////////////////////////////////////////////

const userData = new UserInfo({ profileName, profileAbout });

const popupEditProfile = new PopupWithForm(profileForm, () => {
  const data = popupEditProfile._getInputValues();
  userData.setUserInfo(data);
});

popupEditProfile.setEventListeners();

profileEditButton.addEventListener("click", () => {
  popupEditProfile.open();
  const currentUserData = userData.getUserInfo();
  console.log(currentUserData);
  console.log(userData);

  // nameInput.value = profileName.textContent;
  // aboutInput.value = profileAbout.textContent;

  formValidators["profile-form"].resetValidation();
});

////////////////////////////////////////////////////////////////////////

const popupPlaceAdd = new PopupWithForm(placeAddForm, () => {
  const data = popupPlaceAdd._getInputValues();
  const name = data["placeNameInput"];
  const link = data["placeLinkInput"];

  const cardElement = createCard({ name, link });

  placesList.prepend(cardElement);
});

popupPlaceAdd.setEventListeners();

placeAddButton.addEventListener("click", () => {
  popupPlaceAdd.open();
  formValidators["place-add-form"].resetValidation();
});

////////////////////////////////////////////////////////////////////////
