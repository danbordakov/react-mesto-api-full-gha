class API {
  constructor({url, headers}){
    this._url = url;
    this._headers = headers;
  }

  _sendRequest(url, options) {
    return fetch(url, options)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        throw new Error("Что-то пошло не так...");
      })
  }

  getAllCards() {
    return this._sendRequest(`${this._url}/cards`, {
      method: "GET",
      credentials: "include",
      headers: this._headers
    });
  }

  getUserInfo() {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "GET",
      credentials: "include",
      headers: this._headers
    });
  }

  setUserInfo({newName, newJob}) {
    return this._sendRequest(`${this._url}/users/me`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: newName,
        about: newJob
      })
    });
  }

  setAvatar({newAvatar}) {
    return this._sendRequest(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    });
  }

  postNewCard({cardName, cardLink}) {
    return this._sendRequest(`${this._url}/cards`, {
      method: "POST",
      credentials: "include",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink
      })
    });
  }

  deleteCard(id) {
    return this._sendRequest(`${this._url}/cards/${id}`, {
      method: "DELETE",
      credentials: "include",
      headers: this._headers,
    })
  }

  changeLikeCardStatus(id, like) {
    return this._sendRequest(`${this._url}/cards/${id}/likes`, {
      method: like ? 'DELETE' : 'PUT',
      credentials: "include",
      headers: this._headers,
    })
    
  }
}

const optionsAPI = {
  url: 'https://api.pr15.bordakov.nomoredomainsmonster.ru',
  // url: 'http://localhost:3000',
  // url: 'https://mesto.nomoreparties.co/v1/cohort-76',
  headers: {
    'Content-Type': "application/json",
    // authorization: '62bb8f7d-1e7c-4127-b9db-7c750bb1a14c'
  }
}
const api = new API(optionsAPI);

export default api;