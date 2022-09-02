import React, { useState, useContext } from "react";
import { useEffect } from "react";
import { Cards } from "./App";
import PopupWithForm from "./PopupWithForm";

const PopupAdd = (props) => {
  const [placeName, setPlaceName] = useState("");
  const [placeLink, setPlaceLink] = useState("");
  const [cards, setCards] = useContext(Cards);

  const handleSubmit = (event) => {
    event.preventDefault();
    props.submitHandler(placeName, placeLink);
  };

  useEffect(() => {
    setPlaceName("");
    setPlaceLink("");
  }, [props.opened]);

  return (
    <PopupWithForm
      opened={props.opened}
      type={props.type}
      handleSumbit={handleSubmit}
      popupName="popup_add"
    >
      <fieldset className="popup__fieldset">
        <h2 className="popup__title">Новое место</h2>
        <input
          value={placeName}
          onChange={(e) => {
            setPlaceName(e.target.value);
          }}
          id="place"
          type="text"
          name="place"
          className="popup__input  popup__input_type_place"
          placeholder="Название места"
          minLength="2"
          maxLength="30"
          required
          pattern="\S+.*"
        ></input>
        <span className="popup__error-message place-error"></span>
        <input
          value={placeLink}
          onChange={(e) => {
            setPlaceLink(e.target.value);
          }}
          id="image"
          type="url"
          name="image"
          className="popup__input  popup__input_type_place-image"
          placeholder="Ссылка на изображение"
          required
          pattern="\S+.*"
        ></input>
        <span className="popup__error-message image-error"></span>
        <button type="submit" className="popup__submit popup__submit_add">
          Создать
        </button>
      </fieldset>
    </PopupWithForm>
  );
};

export default PopupAdd;
