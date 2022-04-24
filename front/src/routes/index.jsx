import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Forgot from "../pages/auth/forgot";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Booking from "../pages/booking";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Ticket from "../pages/ticket/display";
import actions from "../services/actions";
import classService from "../services/utils/class";

const Router = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
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
    sessionStorage.setItem("routeError", 0);
    dispatch(actions.setLoading(false));
    dispatch(
      actions.setTrainList(JSON.parse(sessionStorage.getItem("trainList")))
    );
    dispatch(
      actions.setSeatList(JSON.parse(sessionStorage.getItem("seatList")))
    );
  }, [navigate, location]);

  useEffect(() => {
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    localStorage.setItem("lang", lang);
  }, [theme, lang]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="auth/login" element={<Login />} />
      <Route path="auth/register" element={<Register />} />
      <Route path="auth/forgot" element={<Forgot />} />
      <Route path="auth/reset-password" element={<></>} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/ticket/:id" element={<Ticket />} />
      <Route path="profile/ticket/:id/edit" element={<Ticket />} />
      <Route path="booking" element={<Booking />} />
      <Route path="booking/:page" element={<Booking />} />
    </Routes>
  );
};

export default Router;
