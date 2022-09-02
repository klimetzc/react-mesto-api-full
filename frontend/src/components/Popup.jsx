import React, { useContext } from "react";
import { useEffect } from "react";
import { Visibles } from "./App";

const Popup = (props) => {
  const [popups, setter] = useContext(Visibles);
  const currentPopup = props.type;
  const copiedPopups = { ...popups };
  copiedPopups[currentPopup] = false;

  const handleEsc = (e) => {
    if (e.key === "Escape") {
      setter({ ...copiedPopups });
    }
  };

  useEffect(() => {
    if (props.opened) {
      document.addEventListener("keydown", handleEsc);
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [props.opened]);

  const handleClosePopup = (event) => {
    if (
      event.target.classList.contains("popup") ||
      event.target.classList.contains("popup__close-button")
    ) {
      // smth
      setter({
        ...copiedPopups,
      });
    }
  };
  return (
    <div
      onClick={handleClosePopup}
      className={`popup${" " + props.type}${props.opened ? " popup_opened" : ""}`}
    >
      <div className="popup__window">
        {props.children}
        <button className="popup__close-button"></button>
      </div>
    </div>
  );
};

export default Popup;
