import React, { useContext } from "react";
import Popup from "./Popup";
import { Visibles } from "./App";

const PopupWithForm = (props) => {
  const [popups, setter] = useContext(Visibles);
  const currentPopup = props.popupName;
  const copiedPopups = { ...popups };
  copiedPopups[currentPopup] = false;
  return (
    <Popup opened={props.opened} type={props.type}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          props.handleSumbit(event);
          setter({ ...copiedPopups });
        }}
        className={`form-${props.popupType} popup__form popup__form_${props.popupType}`}
      >
        {props.children}
      </form>
      <button type="submit" className="popup__close-button"></button>
    </Popup>
  );
};

export default PopupWithForm;
