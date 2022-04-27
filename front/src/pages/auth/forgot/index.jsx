import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import emailjs from "emailjs-com";
import "./style.scss";
import Loading from "../../../components/loading";
import actions from "../../../services/actions";
import userServices from "../../../services/utils/user";

const Forgot = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const form = useRef();
  const lang = useSelector((state) => state.lang);
  const loading = useSelector((state) => state.loading);
  const content =
    lang === "th"
      ? require("../../../assets/jsons/auth/th.json")
      : require("../../../assets/jsons/auth/en.json");
  const [token, setToken] = useState();
  const [email, setEmail] = useState("");

  useEffect(() => {}, []);

  const sendEmail = async () => {
    if (lang === "th") {
      await emailjs
        .sendForm(
          "kmitl_service",
          "forgot_th_template",
          form.current,
          "MXuG8Rwso2r8iLC1m"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("ส่งอีเมลสำเร็จ โปรดตรวจสอบอีเมลเพื่อดำเนินการต่อ");
            navigate("/");
          },
          (error) => {
            console.log(error.text);
          }
        );
    } else {
      await emailjs
        .sendForm(
          "kmitl_service",
          "forgot_en_template",
          form.current,
          "MXuG8Rwso2r8iLC1m"
        )
        .then(
          (result) => {
            console.log(result.text);
            alert("Email sent. Please check your email to continue.");
            navigate("/");
          },
          (error) => {
            console.log(error.text);
          }
        );
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(actions.setLoading(true));
      setToken(await userServices.forgot({ email: email }));
      await sendEmail();
    } catch (er) {
      dispatch(actions.setLoading(false));
      console.log(er);
    }
  };

  return loading ? (
    <Loading reduceHeight={0} />
  ) : (
    <form ref={form} className="forgot" onSubmit={handleOnSubmit}>
      <fieldset className="forgot__container">
        <legend align="center">{content.forgot.legend}</legend>
        <div className="forgot__form">
          <h1>{content.forgot.header}</h1>
          <div className="forgot__form__container">
            <div className="forgot__form__item">
              <input
                type="email"
                id="email"
                name="email"
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
            <input
              type="text"
              name="token"
              value={token ? token : ""}
              autoComplete="off"
              placeholder=" "
              style={{ display: "none" }}
            />
          </div>
        </div>
        <div className="forgot__btn">
          <button onClick={() => navigate(-1)}>{content.forgot.cancel}</button>
          <input type="submit" value={content.forgot.submit} />
        </div>
      </fieldset>
    </form>
  );
};

export default Forgot;
