import React from "react";
import { useContext } from "react";
import { Theme, User, Visibles } from "./App";

const Profile = (props) => {
  const context = useContext(Visibles);
  const [theme, setTheme] = useContext(Theme);
  const [user, setUser] = useContext(User);
  const popups = context[0];
  const setter = context[1];

  const openEditPopup = () => {
    console.log("clicked");
    setter({
      ...popups,
      popup_edit: true,
    });
  };

  const openAvatarPopup = () => {
    setter({
      ...popups,
      popup_avatar: true,
    });
  };

  const openAddAvatar = () => {
    setter({
      ...popups,
      popup_add: true,
    });
  };

  return (
    <section className="profile">
      <div className="profile__user">
        <img
          src={user?.avatar}
          alt="Аватар пользователя (динамический)"
          className="profile__avatar"
        ></img>
        <div className="profile__avatar-button" onClick={openAvatarPopup}></div>
        <div className="profile__info">
          <div className="profile__names">
            <h1 className="profile__username">{user?.name}</h1>
            <p className="profile__profession">{user?.about}</p>
          </div>
          <button
            className={`profile__edit-button ${theme && "profile__edit-button_theme_light"}`}
            onClick={openEditPopup}
          ></button>
        </div>
      </div>

      <button
        className={`profile__add-button ${theme && "profile__add-button_theme_light"}`}
        onClick={openAddAvatar}
      ></button>
    </section>
  );
};

export default Profile;
