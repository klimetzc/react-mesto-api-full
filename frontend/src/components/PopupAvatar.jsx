import React, { useContext, useState, useEffect } from "react";
import { User } from "./App";
import PopupWithForm from "./PopupWithForm";

const PopupAvatar = (props) => {
  const [inputAvatar, setInputAvatar] = useState("");
  const [user, setUser] = useContext(User);

  const handleSumbit = (e) => {
    console.log("avatar");
    props.submitHandler(inputAvatar);
  };

  useEffect(() => {
    setInputAvatar("");
  }, [props.opened]);

  return (
    <PopupWithForm
      opened={props.opened}
      type={props.type}
      popupName="popup_avatar"
      handleSumbit={handleSumbit}
    >
      <fieldset className="popup__fieldset">
        <h2 className="popup__title">Обновить аватар</h2>
        <input
          value={inputAvatar}
          onChange={(e) => setInputAvatar(e.target.value)}
          id="avatar-input"
          type="url"
          name="avatar"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на изображение"
          required
        ></input>
        <span className="popup__error-message avatar-input-error"></span>
        <button type="submit" className="popup__submit">
          Подтвердить
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default PopupAvatar;
