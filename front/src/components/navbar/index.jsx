import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/NavBar.scss";
import icon from "../../assets/icons/icon.png";
import iconDark from "../../assets/icons/icon-dark.png";
import log from "../../services/utils/log";
import ThemeToggler from "../themeToggler";
import { ThemeContext } from "../../services/utils/themeService";

const user = log.isLogged() ? log.isLogged() : "Chanon";
const language = "th";
const contentTH = require("../../assets/jsons/navbar/th.json");
const contentEN = require("../../assets/jsons/navbar/en.json");
const content = language === "th" ? contentTH : contentEN;

const NavBar = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);

  const handleOnLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    log.logOut();
    setLoading(false);
    navigate("/");
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
            <a href="/booking">
              <span>{content.middle.booking.title}</span>
            </a>
          </li>
          <li>
            <a href="/" className="navbar__list__dropdown">
              {content.middle.information.title}
            </a>
            <ul className="navbar__list__sublist">
              <li>
                <a href="/">{content.middle.information.items.trains.title}</a>
              </li>
              <li>
                <a href="/">{content.middle.information.items.attractions.title}</a>
              </li>
              <li>
                <a href="/">{content.middle.information.items.routes.title}</a>
              </li>
            </ul>
          </li>
          <li>
            <a href="/about" className="navbar__list__dropdown">
              {content.middle.about.title}
            </a>
            <ul className="navbar__list__sublist">
              <li>
                <a href="/about">{content.middle.about.items.aboutUs.title}</a>
              </li>
              <li>
                <a href="/contact">{content.middle.about.items.contactUs.title}</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar__container">
        <div className="navbar__right">
          {log.isLogged() ? (
            <div className="navbar__auth">
              <div className="navbar__auth__dropdown">{user}</div>
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
        </div>
      </div>
    </div>
  );
};

export default NavBar;
