let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__description");
let profileForm = document.querySelector("#profile");
let placeAddForm = document.querySelector("#place");

let closeProfileFormButton = document.querySelector("#close-profile-form");
let closePlaceAddButton = document.querySelector("#close-place-add-form");
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

////// PLACE ADD FORM /////

function popPlaceAddForm() {
  if (placeAddForm.classList.contains("popup_active")) {
    placeAddForm.classList.remove("popup_active");
  } else {
    placeAddForm.classList.add("popup_active");
  }
}

closePlaceAddButton.addEventListener("click", popPlaceAddForm);
placeAddButton.addEventListener("click", popPlaceAddForm);

////// PROFILE FORM SUBMIT /////

let editForm = document.querySelector(".popup__profile-edit-form");
let nameInput = document.querySelector("#popup__input_profile_name");
let aboutInput = document.querySelector("#popup__input_profile_about");

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

  popProfileForm();
}

editForm.addEventListener("submit", profileFormSubmitHandler);

////// PLACE ADD FORM SUBMIT /////

let addForm = document.querySelector(".popup__place-add-form");
let placeNameInput = document.querySelector("#popup__input_place_name");
let placeLinkInput = document.querySelector("#popup__input_place_image-link");

function placeAddFormSubmitHandler(evt) {
  evt.preventDefault();

  let newPlace = placeNameInput.value;
  let newLink = placeLinkInput.value;

  popPlaceAddForm();
}

addForm.addEventListener("submit", placeAddFormSubmitHandler);

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

const placesListItem = document.querySelector(".places__list");

////// PLACES RENDER /////

function renderPlaceCards(data) {
  data.forEach((item) => renderItem(item));
}

function renderItem(data) {
  const placeTemplate = document.querySelector(".place-template").content;
  const placeItem = placeTemplate.cloneNode(true);
  const placeLink = placeItem.querySelector(".place__photo");
  const placeName = placeItem.querySelector(".place__name");

  placeLink.src = places[0].link;
  placeName.textContent = places[0].name;
  placesListItem.append(placeItem);
}

renderPlaceCards(places);

////// SET LIKE /////

for (let likeButton of likeButtons) {
  likeButton.addEventListener("click", setLike);
}

function setLike() {
  let likeButton = this;
  if (likeButton.classList.contains("place__like-button_active")) {
    likeButton.classList.remove("place__like-button_active");
  } else {
    likeButton.classList.add("place__like-button_active");
  }
}
