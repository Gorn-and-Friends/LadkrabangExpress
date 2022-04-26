import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.scss";
import Loading from "../../../components/loading";

const Forgot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.lang);
  const loading = useSelector((state) => state.loading);
  const content =
    lang === "th"
      ? require("../../../assets/jsons/auth/th.json")
      : require("../../../assets/jsons/auth/en.json");
  const [searchParams, _] = useSearchParams({});
  const [email, setEmail] = useState("");

  const handleOnSubmit = () => {};

  return loading ? (
    <Loading reduceHeigh={0} />
  ) : (
    <form className="forgot" onSubmit={handleOnSubmit}>
      <fieldset className="forgot__container">
        <legend align="center">{content.forgot.legend}</legend>
        <div className="forgot__form">
          <h1>{content.forgot.header}</h1>
          <div className="forgot__form__container">
            <div className="forgot__form__item">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="off"
                placeholder=" "
                required
              />
              <label htmlFor="email">
                {content.forgot.email} <span>*</span>
              </label>
            </div>
          </div>
        </div>
        <div className="forgot__btn">
          <button>{content.forgot.cancel}</button>
          <input type="submit" value={content.forgot.submit} />
        </div>
      </fieldset>
    </form>
  );
};

export default Forgot;
