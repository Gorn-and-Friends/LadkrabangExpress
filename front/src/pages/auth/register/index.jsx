import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../../assets/styles/Register.scss";
import register from "../../../services/utils/register";
import Loading from "../../../components/loading";

const Register = () => {
  useEffect(() => {
    document.title = "Sign up - LKBX";
  }, []);

  const navigate = useNavigate();
  const lang = useSelector((state) => state.lang);
  const content =
    lang === "th"
      ? require("../../../assets/jsons/register/th.json")
      : require("../../../assets/jsons/register/en.json");
  const [reg, setReg] = useState({
    fname: "",
    lname: "",
    email: "",
    uname: "",
    pword: "",
    bdate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await register(reg);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleInputOnChange = ({ currentTarget: input }) => {
    const temp = { ...reg };
    temp[input.id] = input.value;
    setReg(temp);
    console.log(temp);
  };

  return loading ? (
    <Loading />
  ) : (
    <form className="register" onSubmit={handleOnSubmit}>
      <fieldset className="register__container">
        <legend align="center">{content.header}</legend>
        <div className="register__form">
          <div className="register__form__first-row">
            <div className="register__form__name">
              <input
                type="text"
                id="fname"
                name="fname"
                value={reg.fname}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="fname">
                {content.fields.fname} <span>*</span>
              </label>
            </div>
            <div className="register__form__name">
              <input
                type="text"
                id="lname"
                name="lname"
                value={reg.lname}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="lname">
                {content.fields.lname} <span>*</span>
              </label>
            </div>
          </div>
          <div className="register__form__others">
            <input
              type="email"
              id="email"
              name="email"
              value={reg.email}
              onChange={handleInputOnChange}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="email">
              {content.fields.email} <span>*</span>
            </label>
          </div>
          <div className="register__form__others">
            <input
              type="text"
              id="uname"
              name="uname"
              value={reg.uname}
              onChange={handleInputOnChange}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="uname">
              {content.fields.uname} <span>*</span>
            </label>
          </div>
          <div className="register__form__others">
            <input
              type="password"
              id="pword"
              name="pword"
              value={reg.pword}
              onChange={handleInputOnChange}
              pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}"
              title="Password requires at least 8 charactors, a capital letter and a special charactor (!@#$%^&*)"
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="pword">
              {content.fields.pword} <span>*</span>
            </label>
          </div>
          <div className="register__form__last-row">
            <a href="/login" className="register__form__last-row__back">
              {content.buttons.back}
            </a>
            <div className="register__form__date">
              <input
                type="text"
                id="bdate"
                name="bdate"
                value={reg.bdate}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="bdate">
                {content.fields.bdate} <span>*</span>
              </label>
            </div>
            <input
              type="submit"
              className="register__form__last-row__submit"
              value={content.buttons.submit}
            />
          </div>
        </div>
      </fieldset>
    </form>
  );
};

export default Register;
