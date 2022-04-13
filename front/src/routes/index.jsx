import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router-dom";
import TrainsDisplay from "../components/trainsDisplay";
import Loading from "../components/loading";
import Forgot from "../pages/auth/forgot";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import BookingForm from "../pages/booking/bookingForm";
import Home from "../pages/home";
import actions from "../services/actions";
import classService from "../services/utils/class";

const Router = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.lang);
  const loading = useSelector((state) => state.loading);

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
    dispatch(actions.setLoading(false));
  }, [navigate]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", lang);
  }, [theme, lang]);

  return loading ? (
    <Loading />
  ) : (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="booking" element={<BookingForm />} />
      <Route path="booking/trains" element={<TrainsDisplay />} />
    </Routes>
  );
};

export default Router;
