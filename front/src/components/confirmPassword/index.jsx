import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import Loading from "../loading";
import "./style.scss";

const ConfirmPassword = ({ shown, handleOnConfirmPword, handleOnBack }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.lang);
  const loading = useSelector((state) => state.loading);
  const content =
    lang === "th"
      ? require("../../assets/jsons/auth/th.json")
      : require("../../assets/jsons/auth/en.json");
  const [searchParams, _] = useSearchParams({});
  const [pword, setPword] = useState("");
  const [err, setErr] = useState(false);
  const [missingInput, setMissingInput] = useState(false);
  const [incorrect, setIncorrect] = useState(false);

  return loading ? (
    <Loading reduceHeigh={0} />
  ) : (
    <form className="confirm-pword" onSubmit={handleOnConfirmPword}>
      <div className="confirm-pword__dim" />
      <div className="confirm-pword__container">
        <div className="confirm-pword__form">
          <h1>{content.confirmPword.header}</h1>
          {shown && err ? (
            <div className="change-pword__form__errors">
              {missingInput
                ? content.confirmPword.err.missingInput
                : incorrect
                ? content.confirmPword.err.incorrect
                : ""}
            </div>
          ) : null}
          <div className="confirm-pword__form__container">
            <div className="confirm-pword__form__item">
              <input
                type="password"
                id="pword"
                value={pword}
                onChange={(e) => setPword(e.target.value)}
                autoComplete="off"
                placeholder=" "
                required
              />
              <label htmlFor="pword">
                {content.confirmPword.pword} <span>*</span>
              </label>
            </div>
            <Link to="/forgot">{content.confirmPword.forgot}</Link>
          </div>
          <div className="confirm-pword__btn">
            <button onClick={handleOnBack}>{content.confirmPword.back}</button>
            <input type="submit" value={content.confirmPword.submit} />
          </div>
        </div>
      </div>
    </form>
  );
};

export default ConfirmPassword;
