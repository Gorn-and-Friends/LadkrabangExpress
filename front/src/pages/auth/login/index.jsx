import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../assets/styles/Login.scss";
import icon from "../../../assets/icons/icon.png";
import iconDark from "../../../assets/icons/icon-dark.png";
import log from "../../../services/utils/log";
import Loading from "../../../components/loading";

const Login = () => {
  useEffect(() => {
    document.title = "Log in - LKBX";
  }, []);

  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.lang);
  const content =
    lang === "th"
      ? require("../../../assets/jsons/login/th.json")
      : require("../../../assets/jsons/login/en.json");
  const [login, setLogin] = useState({
    uname: "",
    pword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await log.logIn(login);
      setLoading(false);
      navigate("/");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleInputOnChange = ({ currentTarget: input }) => {
    const temp = { ...login };
    temp[input.id] = input.value;
    setLogin(temp);
    console.log(temp);
  };

  return loading ? (
    <Loading />
  ) : (
    <form className="login" onSubmit={handleOnSubmit}>
      <fieldset className="login__container">
        <legend align="center">
          {theme === "light" ? (
            <a href="/" className="login__logo">
              <img src={icon} alt="" className="login__logo__icon" />
              <img src={iconDark} alt="" className="login__logo__icon hide" />
            </a>
          ) : (
            <a href="/" className="login__logo">
              <img src={icon} alt="" className="login__logo__icon hide" />
              <img src={iconDark} alt="" className="login__logo__icon" />
            </a>
          )}
        </legend>
        <div className="login__form">
          <h1 className="login__form__header">{content.header}</h1>
          <div className="login__form__container">
            <div className="login__form__item">
              <input
                type="text"
                id="uname"
                name="uname"
                value={login.uname}
                onChange={handleInputOnChange}
                autoComplete="off"
                placeholder=" "
                required
              />
              <label htmlFor="uname">
                {content.fields.username} <span>*</span>
              </label>
            </div>
            <div className="login__form__group">
              <div className="login__form__item">
                <input
                  type="password"
                  id="pword"
                  name="pword"
                  value={login.pword}
                  onChange={handleInputOnChange}
                  autoComplete="off"
                  placeholder=" "
                  required
                />
                <label htmlFor="pword">
                  {content.fields.password} <span>*</span>
                </label>
              </div>
              <div className="login__form__group__link">
                <a href="forgot">{content.forgot} ?</a>
                <a href="register">
                  {content.register} {">"}
                </a>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" className="login__btn" value={content.button} />
      </fieldset>
    </form>
  );
};

export default Login;
