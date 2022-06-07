const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");
const profileForm = document.querySelector(".popup_profile");
const placeAddForm = document.querySelector(".popup_place");
const placeInspector = document.querySelector(".popup_place-inspector");
const popup = document.querySelector(".popup");
const editForm = document.querySelector(".popup__profile-edit-form");
const nameInput = document.querySelector(".popup__input_profile_name");
const aboutInput = document.querySelector(".popup__input_profile_about");
const addPlaceForm = document.querySelector(".popup__place-add-form");
const placeNameInput = document.querySelector(".popup__input_place-name");
const placeLinkInput = document.querySelector(".popup__input_place_image-link");

const closeProfileFormButton = document.querySelector(
  ".popup__close-profile-form-button"
);
const closePlaceAddButton = document.querySelector(
  ".popup__close-place-add-form-button"
);
const closePlaceInspectorButton = document.querySelector(
  ".popup__close-place-inspector-button"
);
const placeAddButton = document.querySelector(".profile__place-add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileSaveButton = document.querySelector(".popup__button");
const placesListItem = document.querySelector(".places__list");
const placeTemplate = document.querySelector(".place-template").content;

const createPlaceButton = document.querySelector(
  ".popup__create-place-button"
);

////// PROFILE FORM OPENER /////

function openPopup(popup) {
    popup.classList.add("popup_active");
}

function closePopup(event) {
  let closePopupButtonElement = event.target;
  let popupItemElement = closePopupButtonElement.closest(".popup");
  popupItemElement.classList.remove("popup_active");
}


function openProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  openPopup(profileForm);
}

closeProfileFormButton.addEventListener("click", closePopup);
profileEditButton.addEventListener("click", openProfileForm);

////// PROFILE FORM SUBMIT /////

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  let newName = nameInput.value;
  let newAbout = aboutInput.value;

  profileName.textContent = newName;
  profileAbout.textContent = newAbout;

}

profileSaveButton.addEventListener("click", closePopup);
editForm.addEventListener("submit", profileFormSubmitHandler);

////// 1 /////
////// PLACES ARRAY /////

/// Отрендерить карточки - динамически добавить на страницу каждую карточку из массива places
/// добавить на страницу каждую карточку - создать копию темплейт элемента, заполнить его содержимым эллемента массива places, навесить обработчики события для лайка, удаления и просмотра карточки
/// выбрать эллемент через ДОМ, повесить на него обработчик события и действие котороое нужно совершить при определенном событии на странице

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

////// 2 /////
////// PLACE ADD FORM OPENER /////

/*
 * @description делаем попап видимым на странице и скрываем его при сабмите или закрытиии
 */

function openPlaceAddform() {
  openPopup(placeAddForm);
}

closePlaceAddButton.addEventListener("click", closePopup);
placeAddButton.addEventListener("click", openPlaceAddform);

/*
 * @description по кнопке сабмита "создать" добавляется карточка с введенными парамметрами name и link
 */

function addPlaceOnSubmit() {
  createPlaceButton.addEventListener("click", function () {
    const name = document.querySelector(".popup__input_place-name");
    const link = document.querySelector(".popup__input_place_image-link");

    renderPlace(name.value, link.value);

    name.value = "";
    link.value = "";
  });
}

addPlaceOnSubmit();

////// PLACE ADD FORM SUBMIT /////

/*
 * @description отменяет стандартную обработку формы и закрывает окно формы
 */

function placeAddFormSubmitHandler(evt) {
  evt.preventDefault();
 
}

createPlaceButton.addEventListener("click", closePopup);
addPlaceForm.addEventListener("submit", placeAddFormSubmitHandler);

////// 3, 4, 5 /////
////// PLACES RENDER /////

/*
 * @description функция удаления ближайшего ДОМ элемента с классом place
 */

function removePlaceItem(event) {
  let buttonElement = event.target;
  let placeItemElement = buttonElement.closest(".place");
  placeItemElement.remove();
}

/*
 * @description для каждого элемента массива renderingPlaces происходит добавление на страницу
 * @arg renderingPlaces - это массив элементы которого будут отрендерены
 */

function renderCards(renderingPlaces) {
  renderingPlaces.forEach(function (element) {
    renderPlace(element.name, element.link);
  });
}

renderCards(places);

////// PLACE ADD /////

/*
 * @description берем эллемент из массива и наполняем клон темплейт элемента его содержимым, на кнопки назначаются обработчики событий, а затем карточка добавляется в начало массива
 * @arg1 placeNameValue - имя карточки
 * @arg2 placeLinkValue - ссылка на фото
 */

function renderPlace(placeNameValue, placeLinkValue) {
  placeItem = placeTemplate.cloneNode(true);

  placeItem.querySelector(".place__photo").src = placeLinkValue;
  placeItem.querySelector(".place__name").textContent = placeNameValue;

  placeItem
    .querySelector(".place__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("place__like-button_active");
    });

  let removeButtonElement = placeItem.querySelector(".place__delete-button");
  removeButtonElement.addEventListener("click", removePlaceItem);

  placeItem
    .querySelector(".place__photo")
    .addEventListener("click", function () {
      openPlaceInspector(placeNameValue, placeLinkValue);
    });

  placesListItem.prepend(placeItem);
}

////// 6 /////
////// PLACE INSPECTOR /////

/*
 * @description открывает попап с картинкой и названием из карточки
 */

function openPlaceInspector(name, link) {
  let placeImageFull = name;
  let placeAbout = link;

  const placeInspectorImage = document.querySelector(".place-inspector__image");
  const placeInspectorName = document.querySelector(".place-inspector__name");

  placeInspectorImage.src = link;
  placeInspectorName.textContent = name;

  openPopup(placeInspector);
}

closePlaceInspectorButton.addEventListener("click", closePopup);
