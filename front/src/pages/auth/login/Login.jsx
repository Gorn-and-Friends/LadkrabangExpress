import React, { useState } from "react";
import "./Login.sass";
import icon from "../../../assets/icon/icon.png";
import iconDark from "../../../assets/icon/icon-dark.png";
import { darkMode } from "../../home/Home";
import { useNavigate } from "react-router-dom";
import { logIn } from "../../../services/LogService";

const Login = () => {
  document.title = "Log in - LKBX";

  const navigate = useNavigate();
  const [login, setLogin] = useState({
    uname: "",
    pword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await logIn(login);
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

  return (
    <div className="login">
      <fieldset className="login__container">
        <legend align="center">
        <a href="/">
            <img src={darkMode ? iconDark : icon} />
          </a>
        </legend>
        <form className="login__form" onSubmit={handleOnSubmit}>
        <form className="login__form">
          <h1 className="login__form__header">Log in to continue</h1>
          <div className="login__form__container">
            <div className="login__form__item">
              <input
                type="text"
                id="uname"
                name="uname"
                value={login["uname"]}
                onChange={handleInputOnChange}
                autoComplete="off"
                placeholder=" "
                required
              />
              <label htmlFor="uname">
                Username or e-mail <span>*</span>
              </label>
            </div>
            <div className="login__form__group">
              <div className="login__form__item">
                <input
                  type="password"
                  id="pword"
                  name="pword"
                  value={login["pword"]}
                  onChange={handleInputOnChange}
                  autoComplete="off"
                  placeholder=" "
                  required
                />
                <label htmlFor="pword">
                  Password <span>*</span>
                </label>
              </div>
              <div className="login__form__group__link">
                <a href="forgot">Forgot password?</a>
                <a href="register">Create account</a>
              </div>
            </div>
          </div>
        </form>
        </form>
        <input type="submit" className="login__btn" value="Log in" />
      </fieldset>
    </div>
  );
};

export default Login;
