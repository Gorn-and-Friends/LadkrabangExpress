import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./style.scss";
import Loading from "../../../components/loading";

const Refund = () => {
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
  const [err, setErr] = useState(false);
  const [missingInput, setMissingInput] = useState(false);
  const [invalid, setInvalid] = useState(false);
  const [pword, setPword] = useState({
    old: "",
    new: "",
    reNew: "",
  });

  const handleInputOnChange = ({ currentTarget: input }) => {
    const temp = { ...pword };
    temp[input.id] = input.value;
    setPword(temp);
  };

  const handleOnSubmit = () => {};

  return loading ? (
    <Loading reduceHeigh={0} />
  ) : (
    <form className="refund" onSubmit={handleOnSubmit}>
      <fieldset className="refund__container">
        <legend align="center">{content.changePword.header}</legend>
        <div className="refund__form">
          {err && (
            <div className="refund__form__errors">
              {missingInput
                ? content.changePword.err.missingInput
                : invalid
                ? content.changePword.err.invalid
                : ""}
            </div>
          )}
          <div className="refund__form__container">
            <div className="refund__form__item">
              <input
                type="password"
                id="new"
                value={pword.new}
                onChange={handleInputOnChange}
                autoComplete="off"
                placeholder=" "
              />
              <label htmlFor="new">
                {content.changePword.new} <span>*</span>
              </label>
            </div>
            <div className="refund__form__item">
              <input
                type="password"
                id="reNew"
                value={pword.reNew}
                onChange={handleInputOnChange}
                autoComplete="off"
                placeholder=" "
              />
              <label htmlFor="reNew">
                {content.changePword.reNew} <span>*</span>
              </label>
            </div>
          </div>
        </div>
        <div className="refund__btn">
          <button>{content.changePword.cancel}</button>
          <input type="submit" value={content.changePword.submit} />
        </div>
      </fieldset>
    </form>
  );
};

export default Refund;
