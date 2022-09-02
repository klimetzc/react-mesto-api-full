import "../index.css";
import Header from "./Header";
import Footer from "./Footer";
import PopupEdit from "./PopupEdit";
import { useState, useEffect, createContext } from "react";
import PopupAvatar from "./PopupAvatar";
import PopupAdd from "./PopupAdd";
import PopupWithImage from "./PopupWithImage";
import api from "../utils/api";
import auth from "../utils/auth";
import PopupDelete from "./PopupDelete";
import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";

export const Visibles = createContext("popupsVisible");
export const Theme = createContext("dark");
export const User = createContext("user");
export const Cards = createContext("cards");
export const LoggedIn = createContext("login");

const App = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [userEmail, setUserEmail] = useState("email@yandex.ru");
  const [loggedIn, setLoggedIn] = useState(false);
  const [cards, setCards] = useState([]);
  const [isTextShown, setIsTextShown] = useState(false);
  const [textMessage, setTextMessage] = useState("Вы ещё не добавили новых мест");
  const [isLoading, setIsLoading] = useState(true);
  const [currentCard, setCurrentCard] = useState(null);
  const [popupsVisible, setPopupsVisible] = useState({
    popup_edit: false,
    popup_add: false,
    popup_image: false,
    popup_avatar: false,
    popup_delete: false,
    popup_infotooltip: false,
  });
  const [tooltipMessage, setTooltipMessage] = useState("Default message");
  const [tooltipPositive, setTooltipPositive] = useState(true);
  const [isLigthTheme, setIsLightTheme] = useState(!!localStorage.getItem("lightTheme"));
  const [imgInPopup, setImgInPopup] = useState({
    link: "https://via.placeholder.com/150",
    alt: "Новое место",
  });

  const addCard = (placeName, placeLink) => {
    api
      .addCard(placeName, placeLink)
      .then((res) => {
        setCards([res, ...cards]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateAvatar = (inputAvatar) => {
    api
      .updateUserAvatar(inputAvatar)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCard = (currentCard) => {
    api
      .deleteCard(currentCard)
      .then((res) => {
        setCards(cards.filter((item) => item._id !== currentCard));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateUserInfo = (inputName, inputProfession) => {
    api
      .updateUserInfo(inputName, inputProfession)
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const logout = () => {
    localStorage.removeItem("JWT");
    setLoggedIn(false);
    navigate("/sign-in");
  };

  const openInfoTooltip = () => {
    setPopupsVisible({
      ...popupsVisible,
      popup_infotooltip: true,
    });
  };

  const closeInfoTooltip = () => {
    setPopupsVisible({
      ...popupsVisible,
      popup_infotooltip: false,
    });
  };

  const loginSubmit = async (event, email, password) => {
    event.preventDefault();
    const login = await auth.login(email, password);
    if (login.ok) {
      setLoggedIn(true);
      setUserEmail(email);
    } else {
      openInfoTooltip();
      setTooltipPositive(false);
      setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
    }
  };

  const registerSubmit = async (event, email, password) => {
    event.preventDefault();
    const sleep = (ms) => {
      return new Promise((r) => setTimeout(r, ms));
    };
    const reg = await auth.register(email, password);
    openInfoTooltip();
    if (reg.ok) {
      setTooltipPositive(true);
      setTooltipMessage("Регистрация прошла успешно!\nИдёт переадресация...");
      await sleep(2000); // Потому что два запроса подряд вызывают 429 ошибку
      await loginSubmit(event, email, password).then(() => {
        closeInfoTooltip();
      });
    } else {
      setTooltipPositive(false);
      setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
    }
    console.log("regData: ", reg);
    openInfoTooltip();
  };

  const getPageInfo = () => {
    api
      .getUserData()
      .then((res) => {
        setUser(res);
      })
      .catch((err) => {
        console.log(err);
      });

    api
      .getCards()
      .then((res) => {
        setCards(res);
        setIsTextShown(false);
      })
      .catch((err) => {
        setTextMessage(`Ошибка: ${err.message}`);
        setIsTextShown(true);
      })
      .finally((res) => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    closeInfoTooltip();
    if (loggedIn) {
      getPageInfo();
    }
  }, [loggedIn]);

  useEffect(() => {
    console.log("Перезагрузка страницы");

    if (localStorage.getItem("JWT")) {
      auth
        .verify(localStorage.getItem("JWT"))
        .then((res) => {
          setLoggedIn(true);
          getPageInfo();
          navigate("/");
          setUserEmail(res.data.email);
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(err);
        });
    }
  }, []);

  return (
    <Theme.Provider value={[isLigthTheme, setIsLightTheme]}>
      <div className={`page ${isLigthTheme ? "page_theme_light" : ""}`}>
        <Visibles.Provider value={[popupsVisible, setPopupsVisible]}>
          <Cards.Provider value={[cards, setCards]}>
            <User.Provider value={[user, setUser]}>
              <div className="main">
                <Header loggedIn={loggedIn} logout={logout} email={userEmail} />
                <LoggedIn.Provider value={[loggedIn, setLoggedIn]}>
                  <Routes>
                    <Route
                      path="/"
                      element={
                        <ProtectedRoute>
                          <Main
                            user={user}
                            cards={cards}
                            setImgInPopup={setImgInPopup}
                            textMessage={textMessage}
                            isTextShown={isTextShown}
                            isLoading={isLoading}
                            setCurrentCard={setCurrentCard}
                          />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path="/sign-in"
                      element={
                        loggedIn ? <Navigate to="/" /> : <Login submitHandler={loginSubmit} />
                      }
                    />
                    <Route
                      path="/sign-up"
                      element={
                        loggedIn ? <Navigate to="/" /> : <Register submitHandler={registerSubmit} />
                      }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </LoggedIn.Provider>

                <Footer />
              </div>

              <PopupEdit
                opened={popupsVisible.popup_edit}
                type="popup_edit"
                submitHandler={updateUserInfo}
              ></PopupEdit>
              <PopupAvatar
                opened={popupsVisible.popup_avatar}
                type="popup_avatar"
                submitHandler={updateAvatar}
              ></PopupAvatar>
              <PopupAdd
                opened={popupsVisible.popup_add}
                type="popup_add"
                submitHandler={addCard}
              ></PopupAdd>
              <PopupWithImage
                opened={popupsVisible.popup_image}
                type="popup_image"
                imgInfo={imgInPopup}
              ></PopupWithImage>
              <PopupDelete
                type="popup_delete"
                opened={popupsVisible.popup_delete}
                currentCard={currentCard}
                submitHandler={deleteCard}
              />
              <InfoTooltip
                type="popup_infotooltip"
                opened={popupsVisible.popup_infotooltip}
                message={tooltipMessage}
                isPositive={tooltipPositive}
              />
            </User.Provider>
          </Cards.Provider>
        </Visibles.Provider>
      </div>
    </Theme.Provider>
  );
};

export default App;
