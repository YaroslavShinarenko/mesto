export class Api {
  constructor(config) {
    this._serverUrl = config.serverUrl;
    this._headers = config.headers;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка загрузки данных: ${res.status}`);
  }

  getPlaceCards() {
    return fetch(`${this._serverUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getProfileData() {
    return fetch(`${this._serverUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  editProfile(data) {
    return fetch(`${this._serverUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data["name-input"],
        about: data["about-input"],
      }),
    }).then(this._checkResponse);
  }

  editAvatar(data) {
    return fetch(`${this._serverUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data["new-avatar-link-input"],
      }),
    }).then(this._checkResponse);
  }

  addPlaceCard(data) {
    return fetch(`${this._serverUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: data["place-name-input"],
        link: data["place-link-input"],
      }),
    }).then(this._checkResponse);
  }

  deletePlaceCard(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  removeLike(cardId) {
    return fetch(`${this._serverUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }
}
