import React from "react";
import Profile from "./Profile";
import Elements from "./Elements";

const Main = (props) => {
  return (
    <>
      <Profile user={props.user} />
      <Elements
        cards={props.cards}
        setImgInPopup={props.setImgInPopup}
        user={props.user}
        textMessage={props.textMessage}
        isTextShown={props.isTextShown}
        isLoading={props.isLoading}
        setCurrentCard={props.setCurrentCard}
      />
    </>
  );
};

export default Main;
