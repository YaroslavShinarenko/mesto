let profileEditButton = document.querySelector(".profile__edit-button");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__description");
let profileForm = document.querySelector("#profile");
let placeAddForm = document.querySelector("#place");
let closeFormButton = profileForm.querySelector(".popup__close-button");
let likeButtons = document.querySelectorAll(".place__like-button");
let addPlaceButton = document.querySelectorAll(".profile__add-place-button");

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

function openPlaceAddForm() {
  if (profileForm.classList.contains("popup_active")) {
    profileForm.classList.remove("popup_active");
  } else {
    profileForm.classList.add("popup_active");
  }
}

addPlaceButton.addEventListener("click", openPlaceAddForm);
closeFormButton.addEventListener("click", openPlaceAddForm);

let editForm = document.querySelector(".popup__profile-edit-form");
let addForm = document.querySelector(".popup__place-add-form");
let nameInput = document.querySelector("#popup__input_profile_name");
let aboutInput = document.querySelector("#popup__input_profile_about");

function formSubmitHandler(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

  popProfileForm();
}

addForm.addEventListener("submit", formSubmitHandler);

editForm.addEventListener("submit", formSubmitHandler);

// const placesContainer = document.querySelector('.places__list')
// placesContainer.append(placeItem)

// const places = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
//   {
//     name: 'Челябинская область',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
//   },
//   {
//     name: 'Иваново',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
//   },
//   {
//     name: 'Камчатка',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
//   },
//   {
//     name: 'Холмогорский район',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
//   },
//   {
//     name: 'Байкал',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
//   }
// ]; 

// function addCards(nameValue, linkValue) {
//   const placeTemplate = document.querySelector('#place-template').content;
//   const placeItem = placeTemplate.querySelector('.place').cloneNode(true);

//   placeItem.querySelector('.place__photo').src = places.link;
//   placeItem.querySelector('.place__name').textContent = places.name;
// }

// addCards(places);


// addButton.addEventListener('click', function () {
//   const name = document.querySelector('.#popup__input_place_name');
//   const link = document.querySelector('.#popup__input_place_img-link');

//   addCard(name.value, link.value);
//   renderCards();

//   name.value = '';
//   link.value = '';
// });