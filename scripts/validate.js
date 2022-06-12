class FormValidation {
  constructor(config) {
    this._config = config;
  }

  enableValidation() {
    const form = document.querySelector(this._config.form);
    form.addEventListener("submit", this._handleFormSubmit);
    form.addEventListener("input", this._handleFormInput);
  }

  _handleFormSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const isValid = form.checkValidity();
  };

  _handleFormInput = (event) => {
    const input = event.target;
    const form = event.currentTarget;

    // Устанавливаем свои тексты ошибок
    this._setCustomError(input);

    // Записываем текст ошибки под каждым полем
    this._setFieldError(input);

    // Отражаем ошибку при заполнении инпута
    this._setInputError(input);

    // Включаем или отключаем кнопку отправки формы
    this._setButtonState(form);
  };

  _setCustomError(input) {
    const validity = input.validity;

    input.setCustomValidity("");

    if (validity.valueMissing) {
      input.setCustomValidity("Вы пропустили это поле.");
    } else if (validity.typeMismatch) {
      input.setCustomValidity("Введите адрес сайта.");
    }
  }

  _setInputError(input) {
    if (!input.checkValidity()) {
      input.classList.add(this._config.inputErrorClass);
    } else {
      input.classList.remove(this._config.inputErrorClass);
    }
  }

  _setFieldError(input) {
    const span = input.nextElementSibling;
    span.textContent = input.validationMessage;
  }

  _setButtonState(form) {
    const button = form.querySelector(this._config.button);

    const isValid = form.checkValidity();

    if (isValid) {
      button.removeAttribute("disabled");
      button.classList.remove(this._config.buttonDisabled);
    } else {
      button.setAttribute("disabled", true);
      button.classList.add(this._config.buttonDisabled);
    }
  }
}

const configurationPlaceAddForm = {
  form: ".popup__place-add-form",
  input: ".popup__input",
  button: ".popup__button",
  buttonDisabled: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
};

placeAddForm = new FormValidation(configurationPlaceAddForm);

placeAddForm.enableValidation();

const configurationProfileForm = {
  form: ".popup__profile-edit-form",
  input: ".popup__input",
  button: ".popup__button",
  buttonDisabled: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error",
};

profileForm = new FormValidation(configurationProfileForm);

profileForm.enableValidation();
