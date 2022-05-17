let content = document.querySelector(".content");
let profileEditButton = content.querySelector(".profile__edit-button");
let profileContainer = content.querySelector(".profile__info");
let profileName = profileContainer.querySelector(".profile__name");
let profileAbout = profileContainer.querySelector(".profile__description");
let profileAddButton = profileContainer.querySelector(".profile__add-button");

let profileForm = document.querySelector(".popup");
let nameInput = profileForm.querySelector(".popup__input_profile_name");
let aboutInput = profileForm.querySelector(".popup__input_profile_about");
let closeFormButton = profileForm.querySelector(".popup__close-button");

let places = content.querySelectorAll(".place");
let likeButton = places.querySelector("ul li .place__like-button");

// nameInput.textContent = "${profilleName}";
// nameInput.textContent = "${profilleAbout}";

function openProfileForm() {
  profileForm.setAttribute("active", true);
  profileForm.classList.add("popup_active");
}

profileEditButton.addEventListener("click", openProfileForm);

function closeProfileForm() {
  profileForm.setAttribute("disable", true);
  profileForm.classList.remove("popup_active");
}

closeFormButton.addEventListener("click", closeProfileForm);

function setLike() {
  likeButton.classList.add("place__like-button_active");
}

likeButton.addEventListener("click", setLike);

function saveButton() {
  songsContainer.innerHTML += `
      <div class="song">
        <h4 class="song__artist">Linkin Park</h4>
        <p class="song__title">Numb</p>
        <button class="song__like"></button>
      </div>
`;
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value
  paragraph.textContent = nameInput.value;
  paragraph.textContent = aboutInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
