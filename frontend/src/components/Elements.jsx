import React, { useContext } from "react";
import { Cards } from "./App";
import Element from "./Element";

const Elements = (props) => {
  const [cards, setCards] = useContext(Cards);

  return (
    <section className="elements">
      {props.isTextShown && <p className="elements__text">{props.textMessage}</p>}
      {props.isLoading && <div className="elements__loader"></div>}
      {cards.map((item) => {
        return (
          <Element
            setImgInPopup={props.setImgInPopup}
            key={item._id}
            cardId={item._id}
            src={item.link}
            title={item.name}
            likes={item.likes}
            user={props.user}
            owner={item.owner}
            setCurrentCard={props.setCurrentCard}
          />
        );
      })}
    </section>
  );
};

export default Elements;
