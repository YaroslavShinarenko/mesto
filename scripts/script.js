const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__description");
const profileForm = document.querySelector(".popup_type_profile-edit");
const placeAddForm = document.querySelector(".popup_type_place-add");
const placeInspector = document.querySelector(".popup_place-inspector");
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

const placeInspectorImage = document.querySelector(".place-inspector__image");
const placeInspectorName = document.querySelector(".place-inspector__name");
const submitButton = document.querySelector(".popup__button");
const closeButtons = document.querySelectorAll(".popup__close-button");

////// PROFILE FORM OPENER /////

function openPopup(popup) {
  popup.classList.add("popup_active");

  document.addEventListener("keydown", closePopupOnEscape);
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

////// PROFILE FORM SUBMIT /////

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  closePopup(profileForm);
}

formEditProfile.addEventListener("submit", handleProfileFormSubmit);

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
placeAddButton.addEventListener("click", openPlaceAddform);

/// Обработчик события клика на любую кнопку с классом закрытия

closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", () => closePopup(popup));
});

////// PLACE ADD FORM SUBMIT /////

/*
 * @description отменяет стандартную обработку формы и закрывает окно формы
 */

function handlePlaceAddFormSubmit(evt) {
  evt.preventDefault();

  const placeItem = renderCard(placeNameInput.value, placeLinkInput.value);
  placesListItem.prepend(placeItem);

  placeCreateButton.classList.add("popup__button_disabled");
  placeCreateButton.setAttribute("disabled", true);

  formAddPlace.reset();
  closePopup(placeAddForm);
}

formAddPlace.addEventListener("submit", handlePlaceAddFormSubmit);

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
    const placeItem = renderCard(element.name, element.link);
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
  const placeItem = placeTemplate.cloneNode(true);
  const placeItemName = placeItem.querySelector(".place__name");
  const placeItemImage = placeItem.querySelector(".place__photo");
  const placeItemLikeButton = placeItem.querySelector(".place__like-button");
  const placeItemRemoveButton = placeItem.querySelector(
    ".place__delete-button"
  );

  placeItemName.textContent = placeNameValue;
  placeItemImage.src = placeLinkValue;
  placeItemImage.alt = placeNameValue;

  placeItemImage.addEventListener("click", function () {
    openPlaceInspector(placeNameValue, placeLinkValue);
  });

  placeItemLikeButton.addEventListener("click", function (evt) {
    evt.target.classList.toggle("place__like-button_active");
  });

  placeItemRemoveButton.addEventListener("click", removePlaceItem);

  return placeItem;
}

////// 6 /////
////// PLACE INSPECTOR /////

/*
 * @description открывает попап с картинкой и названием из карточки
 */

function openPlaceInspector(name, link) {
  placeInspectorImage.src = link;
  placeInspectorImage.alt = name;
  placeInspectorName.textContent = name;

  openPopup(placeInspector);
}

// Создаем функции чтобы любой попап закрыывался нажатием клавиши ESC или кликом вне элемента

function closePopupOnEscape(event) {
  if (event.key === "Escape") {
    const activePopup = document.querySelector(".popup_active");
    closePopup(activePopup);
  }
}

function closePopupOnClickOutside(event) {
  popupList.forEach((popup) => {
    popup.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup_active")) {
        closePopup(popup);
      }
    });
  });
}

closePopupOnClickOutside();
