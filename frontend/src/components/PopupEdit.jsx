import React, { useContext, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { User } from "./App";
import { useEffect } from "react";

const PopupEdit = (props) => {
  const [inputName, setInputName] = useState("");
  const [inputProfession, setInputProfession] = useState("");
  const [user, setUser] = useContext(User);

  const handleSubmit = (e) => {
    props.submitHandler(inputName, inputProfession);
  };

  useEffect(() => {
    setInputName(user?.name ? user.name : "");
    setInputProfession(user?.about ? user.about : "");
  }, [props.opened, user?.about, user?.name]);

  return (
    <PopupWithForm
      opened={props.opened}
      type={props.type}
      popupName="popup_edit"
      handleSumbit={handleSubmit}
    >
      <fieldset className="popup__fieldset">
        <h2 className="popup__title">Редактировать профиль</h2>
        <input
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
          id="name"
          type="text"
          name="name"
          className="popup__input popup__input_type_username"
          placeholder="Ваше имя"
          pattern="\S+.*"
          minLength="2"
          maxLength="40"
          required
        ></input>
        <span className="popup__error-message name-error"></span>
        <input
          value={inputProfession}
          onChange={(e) => setInputProfession(e.target.value)}
          id="profession"
          type="text"
          name="profession"
          className="popup__input  popup__input_type_profession"
          placeholder="Ваша профессия"
          pattern="\S+.*"
          minLength="2"
          maxLength="200"
          required
        ></input>
        <span className="popup__error-message profession-error"></span>
        <button type="submit" className={`popup__submit popup__submit_${props.popupType}`}>
          Сохранить
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default PopupEdit;
