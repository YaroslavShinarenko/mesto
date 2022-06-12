const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");
const profileForm = document.querySelector(".popup_type_profile-edit");
const placeAddForm = document.querySelector(".popup_type_place-add");
const placeInspector = document.querySelector(".popup_place-inspector");
const popup = document.querySelector(".popup");
const popupList = Array.from(document.querySelectorAll(".popup"));
const formEditProfile = document.querySelector(".popup__profile-edit-form");
const nameInput = document.querySelector(".popup__input_profile_name");
const aboutInput = document.querySelector(".popup__input_profile_about");
const formAddPlace = document.querySelector(".popup__place-add-form");
const placeNameInput = document.querySelector(".popup__input_place-name");
const placeLinkInput = document.querySelector(".popup__input_place_image-link");

const profileCloseFormButton = document.querySelector(
  ".popup__close-profile-form-button"
);
const placeAddCloseFormButton = document.querySelector(
  ".popup__close-place-add-form-button"
);
const placeInspectorCloseButton = document.querySelector(
  ".popup__close-place-inspector-button"
);
const placeAddButton = document.querySelector(".profile__place-add-button");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileSaveButton = document.querySelector(".popup__profile-save-button");
const placesListItem = document.querySelector(".places__list");
const placeTemplate = document.querySelector(".place-template").content;

const placeCreateButton = document.querySelector(".popup__create-place-button");
const placeName = document.querySelector(".popup__input_place-name");
const placeLink = document.querySelector(".popup__input_place_image-link");

////// PROFILE FORM OPENER /////

function openPopup(popup) {
  popup.classList.add("popup_active");

  document.addEventListener("keydown", closePopupOnEscape);
  document.addEventListener("click", closePopupOnClickOutside);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");

  document.removeEventListener("click", closePopupOnClickOutside);
  document.removeEventListener("keydown", closePopupOnEscape);
}

function openProfileForm() {
  nameInput.value = profileName.textContent;
  aboutInput.value = profileAbout.textContent;

  openPopup(profileForm);
}

profileEditButton.addEventListener("click", openProfileForm);
profileCloseFormButton.addEventListener("click", () => closePopup(profileForm));

////// PROFILE FORM SUBMIT /////

function profileFormSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup(profileForm);
}

formEditProfile.addEventListener("submit", profileFormSubmitHandler);

/// Отрендерить карточки - динамически добавить на страницу каждую карточку из массива places
/// добавить на страницу каждую карточку - создать копию темплейт элемента, заполнить его содержимым эллемента массива places, навесить обработчики события для лайка, удаления и просмотра карточки
/// выбрать эллемент через ДОМ, повесить на него обработчик события и действие котороое нужно совершить при определенном событии на странице

////// 2 /////
////// PLACE ADD FORM OPENER /////

/*
 * @description делаем попап видимым на странице и скрываем его при сабмите или закрытиии
 */

function openPlaceAddform() {
  openPopup(placeAddForm);
}

placeAddCloseFormButton.addEventListener("click", () =>
  closePopup(placeAddForm)
);
placeAddButton.addEventListener("click", openPlaceAddform);

////// PLACE ADD FORM SUBMIT /////

/*
 * @description отменяет стандартную обработку формы и закрывает окно формы
 */

function placeAddFormSubmitHandler(evt) {
  evt.preventDefault();

  renderCard(placeName.value, placeLink.value);

  formAddPlace.reset();

  closePopup(placeAddForm);
  placesListItem.prepend(placeItem);
}

formAddPlace.addEventListener("submit", placeAddFormSubmitHandler);

////// 3, 4, 5 /////
////// PLACES RENDER /////

/*
 * @description функция удаления ближайшего ДОМ элемента с классом place
 */

function removePlaceItem(event) {
  const buttonElement = event.target;
  const placeItemElement = buttonElement.closest(".place");
  placeItemElement.remove();
}

/*
 * @description для каждого элемента массива renderingPlaces происходит добавление на страницу
 * @arg renderingPlaces - это массив элементы которого будут отрендерены
 */

function renderCards(renderingPlaces) {
  renderingPlaces.forEach(function (element) {
    renderCard(element.name, element.link);
    placesListItem.prepend(placeItem);
  });
}

renderCards(places);

////// PLACE ADD /////

/*
 * @description берем эллемент из массива и наполняем клон темплейт элемента его содержимым, на кнопки назначаются обработчики событий, а затем карточка добавляется в начало массива
 * @arg1 placeNameValue - имя карточки
 * @arg2 placeLinkValue - ссылка на фото
 */

function renderCard(placeNameValue, placeLinkValue) {
  placeItem = placeTemplate.cloneNode(true);
  placeItem.querySelector(".place__photo").src = placeLinkValue;
  placeItem.querySelector(".place__name").textContent = placeNameValue;
  placeItem
    .querySelector(".place__photo")
    .addEventListener("click", function () {
      openPlaceInspector(placeNameValue, placeLinkValue);
    });

  const removeButtonElement = placeItem.querySelector(".place__delete-button");
  removeButtonElement.addEventListener("click", removePlaceItem);

  placeItem
    .querySelector(".place__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("place__like-button_active");
    });
}

////// 6 /////
////// PLACE INSPECTOR /////

/*
 * @description открывает попап с картинкой и названием из карточки
 */

function openPlaceInspector(name, link) {
  const placeImageFull = name;
  const placeAbout = link;

  const placeInspectorImage = document.querySelector(".place-inspector__image");
  const placeInspectorName = document.querySelector(".place-inspector__name");

  placeInspectorImage.src = link;
  placeInspectorName.textContent = name;

  openPopup(placeInspector);
}

placeInspectorCloseButton.addEventListener("click", () =>
  closePopup(placeInspector)
);

// Создаем функции чтобы любой попап закрыывался нажатием клавиши ESC или кликом вне элемента

function closePopupOnEscape(event) {
  popupList.forEach((popup) => {
    if (event.key === "Escape") {
      closePopup(popup);
    }
  });
}

function closePopupOnClickOutside(event) {
  popupList.forEach((popup) => {
    if (event.target === popup) {
      closePopup(popup);
    }
  });
}
