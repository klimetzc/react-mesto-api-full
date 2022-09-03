class Api {
  constructor(settings) {
    this._baseUrl = settings.baseUrl;
    this._headers = settings.headers;
    this._token = this._headers.authorization;
  }

  _checkResponse(response) {
    let json = response.json();
    if (response.ok) {
      return json;
    }
    return json.then(Promise.reject.bind(Promise));
  }

  getCards = (token = localStorage.getItem("JWT")) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  getUserData = (token = localStorage.getItem("JWT")) => {
    // GET получить данные пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then(this._checkResponse);
  };

  addCard = (place, image, token = localStorage.getItem("JWT")) => {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: place,
        link: image,
      }),
    }).then(this._checkResponse);
  };

  deleteCard = (cardId, token = localStorage.getItem("JWT")) => {
    // https://mesto.nomoreparties.co/v1/cohort-41/cards/271dbbd520255b11e427177e
    // DELETE удалить карточку
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  };

  updateUserInfo = (name, about, token = localStorage.getItem("JWT")) => {
    // PATCH заменить данные пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkResponse);
  };

  updateUserAvatar = (avatarURL, token = localStorage.getItem("JWT")) => {
    // PATCH заменить аватар
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: avatarURL,
      }),
    }).then(this._checkResponse);
  };

  addLike = (cardId, token = localStorage.getItem("JWT")) => {
    // PUT лайкнуть карточку
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  };

  removeLike = (cardId, token = localStorage.getItem("JWT")) => {
    // DELETE удалить лайк с карточки
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }).then(this._checkResponse);
  };
}

const api = new Api({
  // baseUrl: "http://localhost:3000",
  baseUrl: 'https://api.mesto.klimetzc.nomorepartiesxyz.ru',
  headers: {
    // authorization: "ea87a304-62ec-4c62-9662-e334c0349881",
    "Content-Type": "application/json",
  },
});

export default api;
