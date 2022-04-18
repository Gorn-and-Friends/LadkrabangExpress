import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import icon from "../../assets/icons/icon.png";
import iconDark from "../../assets/icons/icon-dark.png";
import log from "../../services/utils/log";
import ThemeToggler from "../themeToggler";
import LanguageToggler from "../langToggler";
import actions from "../../services/actions";

const NavBar = () => {
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang);
  const theme = useSelector((state) => state.theme);
  const displayName = log.isLogged() ? log.isLogged().firstname : null;
  const content =
    lang === "th"
      ? require("../../assets/jsons/navbar/th.json")
      : require("../../assets/jsons/navbar/en.json");
  const navigate = useNavigate();

  const handleOnLogout = (e) => {
    e.preventDefault();
    dispatch(actions.setLoading(true));
    log.logOut();
    dispatch(actions.setLoading(false));
    navigate(0);
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        {theme === "light" ? (
          <a href="/" className="navbar__logo">
            <img src={icon} alt="" className="navbar__logo__icon" />
            <img src={iconDark} alt="" className="navbar__logo__icon hide" />
          </a>
        ) : (
          <a href="/" className="navbar__logo">
            <img src={icon} alt="" className="navbar__logo__icon hide" />
            <img src={iconDark} alt="" className="navbar__logo__icon" />
          </a>
        )}
      </div>
      <div className="navbar__container">
        <ul className="navbar__list">
          <li>
            <a href="/booking?page=0">{content.middle.booking.title}</a>
          </li>
          {/* <li>
            <a href="/" className="navbar__list__dropdown">
              {content.middle.information.title}
            </a>
            <ul className="navbar__list__sublist">
              <li>
                <a href="/">{content.middle.information.items.trains.title}</a>
              </li>
              <li>
                <a href="/">
                  {content.middle.information.items.attractions.title}
                </a>
              </li>
              <li>
                <a href="/">{content.middle.information.items.routes.title}</a>
              </li>
            </ul>
          </li> */}
          <li>
            <a href="/about" className="navbar__list__dropdown">
              {content.middle.about.title}
            </a>
            <ul className="navbar__list__sublist">
              <li>
                <a href="/about">{content.middle.about.items.aboutUs.title}</a>
              </li>
              <li>
                <a href="/contact">
                  {content.middle.about.items.contactUs.title}
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar__container">
        <div className="navbar__right">
          {log.isLogged() ? (
            <div className="navbar__auth">
              <div className="navbar__auth__dropdown">{displayName}</div>
              <ul className="navbar__auth__list">
                <li>
                  <a href="/profile">{content.right.logged.profile}</a>
                </li>
                <li>
                  <div className="navbar__logout" onClick={handleOnLogout}>
                    {content.right.logged.logOut}
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar__auth">
              <a href="/login">{content.right.notLogged.logIn}</a>
            </div>
          )}
          <ThemeToggler />
          <LanguageToggler />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
