let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__description");
let profileForm = document.querySelector(".popup_profile");
let placeAddForm = document.querySelector(".popup_place");

let closeProfileFormButton = document.querySelector(
  ".popup__close-profile-form-button"
);
let closePlaceAddButton = document.querySelector(
  ".popup__close-place-add-form-button"
);
let likeButtons = document.querySelectorAll(".place__like-button");
let placeAddButton = document.querySelector(".profile__place-add-button");
let profileEditButton = document.querySelector(".profile__edit-button");

////// PROFILE FORM /////

function popProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  if (profileForm.classList.contains("popup_active")) {
    profileForm.classList.remove("popup_active");
  } else {
    profileForm.classList.add("popup_active");
  }
}

closeProfileFormButton.addEventListener("click", popProfileForm);
profileEditButton.addEventListener("click", popProfileForm);

////// PROFILE FORM SUBMIT /////

let editForm = document.querySelector(".popup__profile-edit-form");
let nameInput = document.querySelector(".popup__input_profile_name");
let aboutInput = document.querySelector(".popup__input_profile_about");

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

  popProfileForm();
}

editForm.addEventListener("submit", profileFormSubmitHandler);

////// PLACES ARRAY /////

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
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

////// PLACES RENDER /////

const placesListItem = document.querySelector(".places__list");
const placeTemplate = document.querySelector(".place-template").content;

places.forEach(function (element) {
  const placeItem = placeTemplate.cloneNode(true);

  placeItem.querySelector(".place__photo").src = element.link;
  placeItem.querySelector(".place__name").textContent = element.name;
  placesListItem.append(placeItem);
});

////// SET LIKE /////

// for (let likeButton of likeButtons) {
//   likeButton.addEventListener("click", setLike);
// }

// function setLike() {
//   let likeButton = this;
//   if (likeButton.classList.contains("place__like-button_active")) {
//     likeButton.classList.remove("place__like-button_active");
//   } else {
//     likeButton.classList.add("place__like-button_active");
//   }
// }

////// POP PLACE ADD FORM /////

function popPlaceAddForm() {
  if (placeAddForm.classList.contains("popup_active")) {
    placeAddForm.classList.remove("popup_active");
  } else {
    placeAddForm.classList.add("popup_active");
  }
}

closePlaceAddButton.addEventListener("click", popPlaceAddForm);
placeAddButton.addEventListener("click", popPlaceAddForm);

////// PLACE ADD /////

function addPlace(placeNameValue, placeLinkValue) {
  placeItem = placeTemplate.cloneNode(true);

  placeItem.querySelector(".place__photo").src = placeLinkValue;
  placeItem.querySelector(".place__name").textContent = placeNameValue;

  placeItem
    .querySelector(".place__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("place__like-button_active");
    });

  placesListItem.append(placeItem);
}

const createPlaceAddButton = document.querySelector(
  ".popup__create-place-button"
);

createPlaceAddButton.addEventListener("click", function () {
  const name = document.querySelector(".popup__input_place-name");
  const link = document.querySelector(".popup__input_place_image-link");

  addPlace(name.value, link.value);

  name.value = "";
  link.value = "";
});

////// PLACE ADD FORM SUBMIT /////

let addForm = document.querySelector(".popup__place-add-form");
let placeNameInput = document.querySelector(".popup__input_place-name");
let placeLinkInput = document.querySelector(".popup__input_place_image-link");

function placeAddFormSubmitHandler(evt) {
  evt.preventDefault();

  let newPlaceName;
  let newPlaceLink;

  placeNameValue = newPlaceName;
  placeLinkValue = newPlaceLink;

  popPlaceAddForm();
}

addForm.addEventListener("submit", placeAddFormSubmitHandler);
