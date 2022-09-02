class Auth {
  constructor(settings) {
    this._baseURL = settings.baseURL;
    this._headers = settings.headers;
  }
  loginNotAsync(email, password) {
    return fetch(`${this._baseURL}signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
  }

  async register(email, password) {
    const res = await fetch(`${this._baseURL}signup`, {
      method: "POST",
      // mode: "no-cors",
      headers: { ...this._headers },
      body: JSON.stringify({
        password: password,
        email: email,
      }),
    });
    if (res.ok) {
      console.log("register is ok");
    }
    return res;
  }

  async login(email, password) {
    const response = await fetch(`${this._baseURL}signin`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const token = await response.json();
    if (token) localStorage.setItem("JWT", token.token);
    return response;
  }

  async verify(jwt) {
    const res = await fetch(`${this._baseURL}users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Authorization: `Bearer ${jwt}`,
      },
    });
    const jsonRes = await res.json();
    return jsonRes;
  }
}

const auth = new Auth({
  baseURL: "https://auth.nomoreparties.co/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default auth;
