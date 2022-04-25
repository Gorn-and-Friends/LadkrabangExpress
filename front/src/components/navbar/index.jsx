import React from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import icon from "../../assets/icons/icon.png";
import iconDark from "../../assets/icons/icon-dark.png";
import log from "../../services/utils/log";
import ThemeToggler from "../themeToggler";
import LanguageToggler from "../langToggler";
import actions from "../../services/actions";
import userServices from "../../services/utils/user";

const NavBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const lang = useSelector((state) => state.lang);
  const theme = useSelector((state) => state.theme);
  const [searchParams, _] = useSearchParams({});
  const displayName =
    lang === "th"
      ? log.isLogged()
        ? "คุณ " + log.isLogged().fname
        : null
      : log.isLogged()
      ? "Mx. " + log.isLogged().lname
      : null;
  const content =
    lang === "th"
      ? require("../../assets/jsons/navbar/th.json")
      : require("../../assets/jsons/navbar/en.json");

  const handleOnProfile = async (e) => {
    e.preventDefault();
    try {
      dispatch(actions.setLoading(true));
      navigate("/profile");
    } catch (er) {
      dispatch(actions.setLoading(false));
      console.log(er);
    }
  };

  const handleOnLogout = (e) => {
    e.preventDefault();
    dispatch(actions.setLoading(true));
    log.logOut();
    dispatch(actions.setLoading(false));
    location.pathname !== "/profile" ? navigate(0) : navigate("/");
  };

  return (
    <div className="navbar preload">
      <div className="navbar__container">
        {theme === "light" ? (
          <Link to="/" className="navbar__logo">
            <img src={icon} alt="" className="navbar__logo__icon" />
            <img src={iconDark} alt="" className="navbar__logo__icon hide" />
          </Link>
        ) : (
          <Link to="/" className="navbar__logo">
            <img src={icon} alt="" className="navbar__logo__icon hide" />
            <img src={iconDark} alt="" className="navbar__logo__icon" />
          </Link>
        )}
      </div>
      <div className="navbar__container">
        <ul className="navbar__list">
          <li>
            <Link to="/booking">{content.middle.booking.title}</Link>
          </li>
          <li>
            <Link to="/" className="navbar__list__dropdown">
              {content.middle.information.title}
            </Link>
            <ul className="navbar__list__sublist">
              <li>
                <Link to="/">
                  {content.middle.information.items.trains.title}
                </Link>
              </li>
              <li>
                <Link to="/">
                  {content.middle.information.items.attractions.title}
                </Link>
              </li>
              <li>
                <Link to="/">
                  {content.middle.information.items.routes.title}
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/about" className="navbar__list__dropdown">
              {content.middle.about.title}
            </Link>
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
                  <div onClick={handleOnProfile}>
                    {content.right.logged.profile}
                  </div>
                </li>
                <li>
                  <div onClick={handleOnLogout}>
                    {content.right.logged.logOut}
                  </div>
                </li>
              </ul>
            </div>
          ) : (
            <div className="navbar__auth">
              <Link
                to={`/login${
                  location.pathname !== "/"
                    ? "?" + location.pathname + "?" + searchParams.toString()
                    : ""
                }`}
              >
                {content.right.notLogged.logIn}
              </Link>
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
