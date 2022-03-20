import React, { useState } from "react";
import "./Navbar.sass";
import icon from "../../../assets/icon/icon.png";
import iconDark from "../../../assets/icon/icon-dark.png";
import { darkMode } from "../../../pages/home/Home";
import { toggle } from "../../../services/ClassToggleService";
import { isLogged, logOut } from "../../../services/LogService";
import { useNavigate } from "react-router-dom";

const name = "Ladkrabang";

const NavBar = () => {
  const navigate = useNavigate();
  const [theme, setTheme] = useState("light");
  const themeToggler = () => {
    if (theme === "light") {
      toggle("root", "dark", false);
      setTheme("dark");
    } else {
      toggle("root", "dark", true);
      setTheme("light");
    }
  };
  const [loading, setLoading] = useState(false);

  const handleOnLogout = (e) => {
    e.preventDefault();
    setLoading(true);
    logOut();
    setLoading(false);
    navigate("/");
  };

  return (
    <div className="navbar">
      <div className="navbar__container">
        <a href="/" className="navbar__logo">
          <img src={darkMode ? iconDark : icon} />
        </a>
      </div>
      <div className="navbar__container">
        <ul className="navbar__list">
          <li className="navbar__list__item">
            <a href="/">COVID-19</a>
          </li>
          <li className="navbar__list__item">
            <a href="/" className="navbar__dropdown">
              Information
            </a>
            <ul className="navbar__sublist">
              <li className="navbar__sublist__item">
                <a href="/">Trains</a>
              </li>
              <li className="navbar__sublist__item">
                <a href="/">Attractions</a>
              </li>
              <li className="navbar__sublist__item">
                <a href="/">Routes</a>
              </li>
            </ul>
          </li>
          <li className="navbar__list__item">
            <a href="/about" className="navbar__dropdown">
              About
            </a>
            <ul className="navbar__sublist">
              <li className="navbar__sublist__item">
                <a href="/about">About us</a>
              </li>
              <li className="navbar__sublist__item">
                <a href="/contact">Contact us</a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <div className="navbar__container">
        <div className="navbar__right">
          {!isLogged ? (
            <div className="navbar__auth">
              <div className="navbar__auth__dropdown">{name.toUpperCase()}</div>
              <ul className="navbar__auth__list">
                <li className="navbar__auth__list__item">
                  <a href="/profile">View profile</a>
                </li>
                <li
                  className="navbar__auth__list__item"
                  id="logout"
                  onClick={handleOnLogout}
                >
                  Log out
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar__auth">
              <a href="/login" className="navbar__auth__item">
                Log in
              </a>
            </div>
          )}
          <div className="theme-toggler" onClick={themeToggler} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
