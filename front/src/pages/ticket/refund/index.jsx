import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";
import Loading from "../../../components/loading";

const Refund = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang);
  const loading = useSelector((state) => state.loading);
  const content =
    lang === "th"
      ? require("../../../assets/jsons/booking/th.json")
      : require("../../../assets/jsons/booking/en.json");
  const [err, setErr] = useState(false);
  const [input, setInput] = useState({
    name: "",
    email: "",
    reason: "",
  });

  const handleInputOnChange = ({ currentTarget: e }) => {
    const temp = { ...input };
    temp[e.id] = e.value;
    setInput(temp);
    console.log(temp);
  };

  const handleOnSubmit = async (e) => {};

  return loading ? (
    <Loading reduceHeight={0} />
  ) : (
    <form className="refund" onSubmit={handleOnSubmit}>
      <fieldset className="refund__container">
        <legend align="center">{content.refund.header}</legend>
        <div className="refund__form">
          {err && (
            <div className="refund__form__errors">
              {lang === "th"
                ? "โปรดกรอกข้อมูลให้ครบถ้วน"
                : "Please enter all required fields."}
            </div>
          )}
          <div className="refund__form__container">
            <div className="refund__form__item">
              <input
                type="text"
                id="name"
                value={input.name}
                onChange={handleInputOnChange}
                autoComplete="off"
                placeholder=" "
              />
              <label htmlFor="name">
                {content.refund.name} <span>*</span>
              </label>
            </div>
            <div className="refund__form__item">
              <input
                type="email"
                id="email"
                value={input.email}
                onChange={handleInputOnChange}
                autoComplete="off"
                placeholder=" "
              />
              <label htmlFor="email">
                {content.refund.email} <span>*</span>
              </label>
            </div>
            <div className="refund__form__item">
              <textarea
                id="reason"
                value={input.reason}
                onChange={handleInputOnChange}
                onInput={(e) => {
                  e.style.height = "5px";
                  e.style.height = e.scrollHeight + "px";
                }}
                autoComplete="off"
                placeholder=" "
              />
              <label htmlFor="reason">
                {content.refund.reason} <span>*</span>
              </label>
            </div>
          </div>
        </div>
        <div className="refund__btn">
          <button onClick={() => navigate("/profile")}>
            {content.refund.cancel}
          </button>
          <input type="submit" value={content.refund.submit} />
        </div>
      </fieldset>
    </form>
  );
};

export default Refund;
