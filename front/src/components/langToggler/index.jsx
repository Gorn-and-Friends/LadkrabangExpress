import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/LangToggler.scss";
import actions from "../../services/actions";
import classService from "../../services/utils/class";

const LangToggler = () => {
  const lang = useSelector((state) => state.lang);
  const dispatch = useDispatch();

  useEffect(() => {
    const localLang = localStorage.getItem("lang");

    if (localLang === "en") {
      classService.classToggle("id", "en", "hide");
    } else {
      classService.classToggle("id", "th", "hide");
    }
  }, []);

  return (
    <button
      className="lang-toggler"
      onClick={() => {
        if (lang === "en") {
          dispatch(actions.setLanguage("th"));
          classService.classToggle("id", "th", "hide");
          classService.classToggle("id", "en", "hide");
        } else {
          dispatch(actions.setLanguage("en"));
          classService.classToggle("id", "th", "hide");
          classService.classToggle("id", "en", "hide");
        }
      }}
    >
      <div id="en">EN</div>
      <div id="th">TH</div>
    </button>
  );
};

export default LangToggler;
