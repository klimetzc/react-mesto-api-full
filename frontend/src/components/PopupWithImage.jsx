import React from "react";
import Popup from "./Popup";

const PopupWithImage = (props) => {
  const link = props.imgInfo.link;
  const alt = props.imgInfo.alt;
  return (
    <Popup opened={props.opened} type={props.type}>
      <img className="popup__image" src={link} alt={alt}></img>
      <p className="popup__caption">{alt}</p>
    </Popup>
  );
};

export default PopupWithImage;
