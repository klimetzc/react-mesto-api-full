import React from "react";
import Profile from "./Profile";
import Elements from "./Elements";

const Main = (props) => {

  return (
    <>
      <Profile user={props.user} />
      <Elements
        setImgInPopup={props.setImgInPopup}
        textMessage={props.textMessage}
        isTextShown={props.isTextShown}
        isLoading={props.isLoading}
        setCurrentCard={props.setCurrentCard}
      />
    </>
  );
};

export default Main;
