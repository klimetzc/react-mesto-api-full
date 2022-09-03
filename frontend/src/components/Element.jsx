import React, {useState, useContext, useEffect} from "react";
import {LoggedIn, Theme, User, Visibles} from "./App";
import api from "../utils/api";

const Element = (props) => {
  const [popups, setter] = useContext(Visibles);
  const [theme, setTheme] = useContext(Theme);
  const [user, setUser] = useContext(User);
  const [loggedIn, setLoggedIn] = useContext(LoggedIn);
  const [isLiked, setIsLiked] = useState(props.likes.some((item) => item === user._id));
  const [isCardOwnByCurrentUser, setIsOwner] = useState(user._id === props.owner);
  const [likesLength, setLikesLength] = useState(props.likes.length);

  const handleImageClick = () => {
    props.setImgInPopup({
      link: props.src,
      alt: props.title,
    });
    setter({
      ...popups,
      popup_image: true,
    });
  };

  const handleDeleteClick = () => {
    setter({
      ...popups,
      popup_delete: true,
    });
    props.setCurrentCard(props.cardId);
  };

  const handleClickLike = () => {

    if (!isLiked) {
      api.addLike(props.cardId, localStorage.getItem("JWT")).then((res) => {
        setIsLiked(true);
        setLikesLength(res.data.likes.length);
      });
    } else {
      api.removeLike(props.cardId, localStorage.getItem("JWT")).then((res) => {
        setIsLiked(false);
        setLikesLength(res.data.likes.length);
      });
    }
  };

  useEffect(()=>{
    setIsLiked(props.likes.some((item) => item === user._id));
    setIsOwner(user._id === props.owner);
    setLikesLength(props.card.likes.length);
  },[loggedIn, user, props.card]);

  return (
    <article className="element">
      <img
        onClick={handleImageClick}
        className="element__image"
        src={props.src}
        alt={props.title}
      ></img>
      <h2 className="element__title">{props.title}</h2>
      <div className="element__like-container">
        <button
          className={`element__like ${isLiked ? "element__like_active" : ""} ${
            theme && "element__like_theme_light"
          }`}
          onClick={handleClickLike}
        ></button>
        <p className="element__like-label">{likesLength}</p>
      </div>
      {isCardOwnByCurrentUser && (
        <button className="element__delete" onClick={handleDeleteClick}></button>
      )}
    </article>
  );
};

export default Element;
