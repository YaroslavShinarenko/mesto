import { Card } from "../scripts/components/Сard.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Section } from "../scripts/components/Section.js";
import {
  places,
  enableValidationObj,
  profileName,
  profileAbout,
  placesList,
  placeAddButton,
  profileEditButton,
  nameInput,
  aboutInput,
} from "../scripts/utils/constants.js";

////////////////////////////////////////////////////////////////////////

const popupPlaceInspector = new PopupWithImage(".popup_place-inspector");
popupPlaceInspector.setEventListeners();

function handlePlaceClick(name, link) {
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
      placesGrid.addItem(cardElement);
    },
  },
  placesList
);

placesGrid.renderItems();

////////////////////////////////////////////////////////////////////////

const userData = new UserInfo({ profileName, profileAbout });

const popupEditProfile = new PopupWithForm(".popup_type_profile-edit", () => {
  const data = popupEditProfile.getInputValues();
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

const popupPlaceAdd = new PopupWithForm(".popup_type_place-add", () => {
  const data = popupPlaceAdd.getInputValues();
  const name = data["placeNameInput"];
  const link = data["placeLinkInput"];

  const cardElement = createCard({ name, link });
  placesGrid.addItem(cardElement);
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
