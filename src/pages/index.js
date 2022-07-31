import { Card } from "../scripts/components/Сard.js";
import { FormValidator } from "../scripts/components/FormValidator.js";
import { PopupWithForm } from "../scripts/components/PopupWithForm.js";
import { PopupWithImage } from "../scripts/components/PopupWithImage.js";
import { PopupWithConfirmation } from "../scripts/components/PopupWithConfirmation.js";
import { UserInfo } from "../scripts/components/UserInfo.js";
import { Section } from "../scripts/components/Section.js";
import { Api } from "../scripts/components/Api.js";
import {
  enableValidationObj,
  profileName,
  profileAbout,
  profileAvatar,
  placesList,
  placeAddButton,
  profileEditButton,
  nameInput,
  aboutInput,
  avatarChangeButton,
} from "../scripts/utils/constants.js";

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

////////////////////////////////////////////////////////////////////////

const config = {
  serverUrl: "https://mesto.nomoreparties.co/v1/cohort-46",
  headers: {
    authorization: "d50d179a-e68e-48cd-9f64-645c0bfe8409",
    "Content-Type": "application/json",
  },
};

const api = new Api(config);

////////////////////////////////////////////////////////////////////////

const userData = new UserInfo({ profileName, profileAbout, profileAvatar });

////////////////////////////////////////////////////////////////////////

api
  .getProfileData()
  .then((data) => {
    profileName.textContent = data.name;
    profileAbout.textContent = data.about;
    profileAvatar.src = data.avatar;
    userData.setId(data._id);
  })
  .catch((err) => {
    console.log(err);
  });

////////////////////////////////////////////////////////////////////////

function createCard(data) {
  const card = new Card(
    data,
    ".place-template",
    handlePlaceClick,
    handlePlaceDeleteClick,
    api,
    userData.getId()
  );
  const cardElement = card.generateCard();
  return cardElement;
}

////////////////////////////////////////////////////////////////////////

let placesGrid = null;

api.getPlaceCards().then((items) => {
  placesGrid = new Section(
    {
      data: items.reverse(),
      renderer: (place) => {
        const cardElement = createCard(place);
        placesGrid.addItem(cardElement);
      },
    },
    placesList
  );
  placesGrid.renderItems();
  console.log(items);
});

////////////////////////////////////////////////////////////////////////

const popupPlaceInspector = new PopupWithImage(".popup_place-inspector");
popupPlaceInspector.setEventListeners();

function handlePlaceClick(name, link) {
  popupPlaceInspector.open(name, link);
}

const popupDeleteCardConfirmation = new PopupWithConfirmation(
  ".popup_type_delete-place-card",
  (removingCard, cardId) => {
    api.deletePlaceCard(cardId).then(() => removingCard.remove());
    console.log(removingCard);
    console.log(cardId);
  }
);
popupDeleteCardConfirmation.setEventListeners();

function handlePlaceDeleteClick(card, cardId) {
  popupDeleteCardConfirmation.open(card, cardId);
}

////////////////////////////////////////////////////////////////////////

const popupEditProfile = new PopupWithForm(".popup_type_profile-edit", () => {
  const data = popupEditProfile.getInputValues();
  api
    .editProfile(data)
    .then(() => {
      userData.setUserInfo(data);
    })
    .catch((err) => {
      console.log(err);
    });
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

const popupChangeAvatar = new PopupWithForm(".popup_type_change-avatar", () => {
  const data = popupChangeAvatar.getInputValues();
  api
    .editAvatar(data)
    .then(() => {
      userData.setUserAvatar(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

popupChangeAvatar.setEventListeners();

avatarChangeButton.addEventListener("click", () => {
  popupChangeAvatar.open();
  formValidators["change-avatar-form"].resetValidation();
});

////////////////////////////////////////////////////////////////////////

const popupPlaceAdd = new PopupWithForm(".popup_type_place-add", () => {
  const data = popupPlaceAdd.getInputValues();
  api
    .addPlaceCard(data)
    .then((res) => {
      const cardElement = createCard(res);
      placesGrid.addItem(cardElement);
      placesGrid.renderItem(cardElement);
    })

    .catch((err) => {
      console.log(err);
    });
});

popupPlaceAdd.setEventListeners();

placeAddButton.addEventListener("click", () => {
  popupPlaceAdd.open();
  formValidators["place-add-form"].resetValidation();
});

////////////////////////////////////////////////////////////////////////
