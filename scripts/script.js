let content = document.querySelector(".content");
let profileEditButton = content.querySelector(".profile__edit-button");
let profileContainer = content.querySelector(".profile__info");
let profileName = profileContainer.querySelector(".profile__name");
let profileAbout = profileContainer.querySelector(".profile__description");
let profileAddButton = profileContainer.querySelector(".profile__add-button");

let profileForm = document.querySelector(".popup");
let closeFormButton = profileForm.querySelector(".popup__close-button");
let saveFormButton = profileForm.querySelector(".popup__save-button");
let places = content.querySelector(".places");
let inputs = document.querySelectorAll("input");

let likeButtons = document.querySelectorAll(".place__like-button");

for (let likeButton of likeButtons) {
  likeButton.addEventListener("click", setLike);
}

function setLike(event) {
  let likeButton = this;
  if (likeButton.classList.contains("place__like-button_active")) {
    likeButton.classList.remove("place__like-button_active");
  } else {
    likeButton.classList.add("place__like-button_active");
  }
}

function openProfileForm() {
  profileForm.classList.add("popup_active");
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;
}

profileEditButton.addEventListener("click", openProfileForm);

function closeProfileForm() {
  profileForm.classList.remove("popup_active");
}

closeFormButton.addEventListener("click", closeProfileForm);

let editForm = document.querySelector("[name=profileEditForm]");
let nameInput = document.querySelector(".popup__input_profile_name");
let aboutInput = document.querySelector(".popup__input_profile_about");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

  closeProfileForm();
}

editForm.addEventListener("submit", formSubmitHandler);
