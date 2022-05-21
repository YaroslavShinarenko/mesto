let profileEditButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__description");
let profileForm = document.querySelector(".popup");
let closeFormButton = profileForm.querySelector(".popup__close-button");
let likeButtons = document.querySelectorAll(".place__like-button");

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

function popProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  if (profileForm.classList.contains("popup_active")) {
    profileForm.classList.remove("popup_active");
  } else {
    profileForm.classList.add("popup_active");
  }
}

profileEditButton.addEventListener("click", popProfileForm);
closeFormButton.addEventListener("click", popProfileForm);

let editForm = document.querySelector(".popup__form");
let nameInput = document.querySelector(".popup__input_profile_name");
let aboutInput = document.querySelector(".popup__input_profile_about");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

  popProfileForm();
}

editForm.addEventListener("submit", formSubmitHandler);
