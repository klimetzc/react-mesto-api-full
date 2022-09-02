import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitHandler = (event) => {
    props.submitHandler(event, email, password);
  };

  return (
    <>
      <form className="login" onSubmit={submitHandler}>
        <h2 className="login__header">Регистрация</h2>
        <input
          type="email"
          name=""
          id="register_email"
          value={email}
          className="login__input"
          onInput={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="E-mail"
          required
        />
        <input
          type="password"
          name=""
          id="register_password"
          className="login__input"
          value={password}
          onInput={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Пароль"
          required
        />
        <button type="submit" className="login__button">
          Зарегистрироваться
        </button>
      </form>

      <p
        style={{
          fontSize: "14px",
          lineHeight: "17px",
        }}
      >
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          Войти
        </Link>
      </p>
    </>
  );
};

export default Register;
