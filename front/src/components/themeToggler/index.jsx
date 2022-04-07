import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../../assets/styles/ThemeToggler.scss";
import sun from "../../assets/svgs/sun.svg";
import moon from "../../assets/svgs/moon.svg";
import actions from "../../services/actions";
import classService from "../../services/utils/class";

const ThemeToggler = () => {
  const theme = useSelector((state) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");

    if (localTheme === "light") {
      classService.classToggle("id", "moon", "show");
      classService.classToggle("id", "sun", "hide");
    } else {
      classService.classToggle("id", "moon", "hide");
      classService.classToggle("id", "sun", "show");
    }
  }, []);

  return (
    <button
      className="theme-toggler"
      onClick={() => {
        if (theme === "light") {
          dispatch(actions.setTheme("dark"));
          classService.classToggle("id", "moon", "show");
          classService.classToggle("id", "moon", "hide");
          classService.classToggle("id", "sun", "hide");
          classService.classToggle("id", "sun", "show");
        } else {
          dispatch(actions.setTheme("light"));
          classService.classToggle("id", "moon", "hide");
          classService.classToggle("id", "moon", "show");
          classService.classToggle("id", "sun", "show");
          classService.classToggle("id", "sun", "hide");
        }
      }}
    >
      <img src={moon} alt="" id="moon" />
      <img src={sun} alt="" id="sun" />
    </button>
  );
};

export default ThemeToggler;
