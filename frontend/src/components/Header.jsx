import React, { useContext } from "react";
import { Theme } from "./App";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Header = (props) => {
  const [theme, setTheme] = useContext(Theme);
  const location = useLocation();
  const handleThemeChanger = () => {
    setTheme(!theme);
    if (theme) {
      localStorage.removeItem("lightTheme");
    } else {
      localStorage.setItem("lightTheme", true);
    }
  };

  return (
    <header className="header">
      <a
        href="https://github.com/klimetzc/mesto-react"
        target="_blank"
        className={`header__logo ${theme && "header__logo_theme_light"}`}
        rel="noreferrer"
      >
        ㅤ
      </a>
      <div style={{ display: "flex", gap: "24px" }}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <>
                  <span>{props.email}</span>
                  <button onClick={props.logout} className="header__logout">
                    Выйти
                  </button>
                </>
              </ProtectedRoute>
            }
          />
          <Route
            path="/sign-up"
            element={
              <Link to="/sign-in" className="header__logout">
                Войти
              </Link>
            }
          />
          <Route
            path="/sign-in"
            element={
              <Link to="/sign-up" className="header__logout">
                Регистрация
              </Link>
            }
          />
        </Routes>

        {/* {location.pathname === "/sign-up" && (
          <Link to="/sign-in" className="header__logout">
            Войти
          </Link>
        )} */}
        {/* {location.pathname === "/sign-in" && (
          <Link to="/sign-up" className="header__logout">
            Регистрация
          </Link>
        )} */}
        <button
          onClick={handleThemeChanger}
          type="button"
          className={`theme-changer ${theme && "theme-changer_theme_light"}`}
        ></button>
      </div>
    </header>
  );
};

export default Header;
