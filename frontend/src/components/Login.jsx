import React, { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    props.submitHandler(event, email, password);
  };

  return (
    <form onSubmit={submitHandler} className="login">
      <h2 className="login__header">Вход</h2>
      <input
        type="email"
        name=""
        id="login_email"
        value={email}
        onInput={(e) => {
          setEmail(e.target.value);
        }}
        className="login__input"
        placeholder="E-mail"
        required
      />
      <input
        type="password"
        name=""
        id="login_password"
        value={password}
        onInput={(e) => {
          setPassword(e.target.value);
        }}
        className="login__input"
        placeholder="Пароль"
        required
      />
      <button type="submit" className="login__button">
        Войти
      </button>
    </form>
  );
};

export default Login;
