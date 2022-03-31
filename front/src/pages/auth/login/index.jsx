import React, { useContext, useEffect, useState } from "react";
import "../../../assets/styles/Login.scss";
import icon from "../../../assets/icons/icon.png";
import iconDark from "../../../assets/icons/icon-dark.png";
import { useNavigate } from "react-router-dom";
import log from "../../../services/utils/log";
import { ThemeContext } from "../../../services/utils/themeService";

const Login = () => {
  useEffect(() => {
    document.title = "Log in - LKBX";
  }, []);

  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
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

  return (
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
          <h1 className="login__form__header">เข้าสู่ระบบเพื่อใช้งาน</h1>
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
                ชื่อผู้ใช้งาน หรือ อีเมล <span>*</span>
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
                  รหัสผ่าน <span>*</span>
                </label>
              </div>
              <div className="login__form__group__link">
                <a href="forgot">ลืมรหัสผ่าน ?</a>
                <a href="register">สร้างบัญชีใหม่ {">"}</a>
              </div>
            </div>
          </div>
        </div>
        <input type="submit" className="login__btn" value="เข้าสู่ระบบ" />
      </fieldset>
    </form>
  );
};

export default Login;
