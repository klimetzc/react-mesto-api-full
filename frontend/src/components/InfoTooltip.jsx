import React from "react";
import Popup from "./Popup";
import OK from "../images/OK.svg";
import NOTOK from "../images/NOTOK.svg";

const InfoTooltip = (props) => {
  return (
    <Popup opened={props.opened} type={props.type}>
      <img
        className="tooltip__image"
        src={props.isPositive ? OK : NOTOK}
        alt={props.isPositive ? "Окей" : "Не окей"}
      />
      <p className="tooltip__message">{props.message}</p>
    </Popup>
  );
};

export default InfoTooltip;
