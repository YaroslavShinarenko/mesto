import { Card } from "./Сard.js";
import { FormValidator } from "./FormValidator.js";
import { PopupWithForm } from "./PopupWithForm.js";
import { PopupWithImage } from "./PopupWithImage.js";
import { UserInfo } from "./UserInfo.js";
import { Section } from "./Section.js";
import {
  places,
  enableValidationObj,
  profileName,
  profileAbout,
  profileForm,
  placeAddForm,
  placesList,
  placeAddButton,
  profileEditButton,
  placeInspector,
  nameInput,
  aboutInput,
} from "./constants.js";

////////////////////////////////////////////////////////////////////////

function handlePlaceClick(name, link) {
  const popupPlaceInspector = new PopupWithImage(placeInspector);
  popupPlaceInspector.setEventListeners();
  popupPlaceInspector.open(name, link);
}

////////////////////////////////////////////////////////////////////////

function createCard(place) {
  const card = new Card(place, ".place-template", handlePlaceClick);
  const cardElement = card.generateCard();
  return cardElement;
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

  nameInput.value = currentUserData.name;
  aboutInput.value = currentUserData.about;

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
