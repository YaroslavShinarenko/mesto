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

function createCard(data) {
  const card = new Card(
    data,
    ".place-template",
    userData.getId(),
    {
      handleCardClick: (name, link) => {
        popupPlaceInspector.open(name, link);
        
        popupPlaceInspector.setEventListeners();
      },
      handleLikeClick: (cardId) => {
        if (card.likeIsActive) {
          api
          .removeLike(cardId)
          .then(() => {
            card.deleteLike();
          })
          .catch((err) => {
            console.log(err);
          });
        } else {
          api
          .setLike(cardId)
          .then(() => {
            card.addLike();
          })
          .catch((err) => {
            console.log(err);
          });
        }
      },
      handleDeleteIconClick: (removingCard) => {
        popupDeleteCardConfirmation.open(removingCard, removingCard.id);

        popupDeleteCardConfirmation.setEventListeners(); 
      },
    }
  );
  const cardElement = card.generateCard();
  return cardElement;
}

////////////////////////////////////////////////////////////////////////

const placesGrid = new Section(
  { 
    renderer: (card) => {
      const cardElement = createCard(card);
      placesGrid.addItem(cardElement);
    },
  },
  placesList
);

////////////////////////////////////////////////////////////////////////


Promise.all([ 
  api.getProfileData(),
  api.getPlaceCards()
])
.then(([data, cards]) => { 

  userData.getUserData(data)
  userData.setId(data._id);

placesGrid.renderItems(cards.reverse());

})
.catch((err) => {
  console.log(err);
}) 

////////////////////////////////////////////////////////////////////////

const popupPlaceInspector = new PopupWithImage(".popup_place-inspector");

const popupDeleteCardConfirmation = new PopupWithConfirmation(
  ".popup_type_delete-place-card",
  (removingCard, cardId) =>
    api
      .deletePlaceCard(cardId)
      .then(() => {
        removingCard.remove();
      })
      .catch((err) => {
        console.log(err);
      })
);
////////////////////////////////////////////////////////////////////////

const popupEditProfile = new PopupWithForm(".popup_type_profile-edit", () => {
  const data = popupEditProfile.getInputValues();
  api
    .editProfile(data)
    .then(() => {
      userData.setUserInfo(data);
      popupEditProfile.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditProfile.renderLoading(false, "Сохранить");
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

const popupEditAvatar = new PopupWithForm(".popup_type_change-avatar", () => {
  const data = popupEditAvatar.getInputValues();
  api
    .editAvatar(data)
    .then(() => {
      userData.setUserAvatar(data);
      popupEditAvatar.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupEditAvatar.renderLoading(false, "Сохранить");
    });
});

popupEditAvatar.setEventListeners();

avatarChangeButton.addEventListener("click", () => {
  popupEditAvatar.open();
  formValidators["change-avatar-form"].resetValidation();
});

////////////////////////////////////////////////////////////////////////

const popupPlaceAdd = new PopupWithForm(".popup_type_place-add", () => {
  const data = popupPlaceAdd.getInputValues();
  api
    .addPlaceCard(data)
    .then((card) => {
      const cardElement = createCard(card);
      placesGrid.addItem(cardElement);
      
      popupPlaceAdd.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      popupPlaceAdd.renderLoading(false, "Создать");
    });
});

popupPlaceAdd.setEventListeners();

placeAddButton.addEventListener("click", () => {
  popupPlaceAdd.open();
  formValidators["place-add-form"].resetValidation();
});

////////////////////////////////////////////////////////////////////////
