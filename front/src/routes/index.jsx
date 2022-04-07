import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
import Loading from "../components/loading";
import Forgot from "../pages/auth/forgot";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Booking from "../pages/booking";
import Home from "../pages/home";
import actions from "../services/actions";
import classService from "../services/utils/class";

const Router = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    const localLanguage = localStorage.getItem("lang");

    if (!!localTheme) {
      dispatch(actions.setTheme(localTheme));
    }
    if (!!localLanguage) {
      dispatch(actions.setLanguage(localLanguage));
    }

    setTimeout(() => {
      classService.classRemove("tag", "body", "preload");
    }, 100);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", lang);
  }, [theme, lang]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/booking" element={<Loading />} />
    </Routes>
  );
};

export default Router;
