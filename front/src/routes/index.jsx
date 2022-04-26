import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import About from "../pages/about";
import ChangePassword from "../pages/auth/changePassword";
import Forgot from "../pages/auth/forgot";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Booking from "../pages/booking";
import Home from "../pages/home";
import Profile from "../pages/profile";
import Staff from "../pages/staff";
import DisplayTicket from "../pages/ticket/display";
import EditTicket from "../pages/ticket/edit";
import Refund from "../pages/ticket/refund";
import actions from "../services/actions";
import classServices from "../services/utils/class";

const Router = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme);
  const lang = useSelector((state) => state.lang);

  useEffect(() => {
    const localTheme = localStorage.getItem("theme");
    const localLanguage = localStorage.getItem("lang");

    if (!!localTheme && localTheme != theme) {
      dispatch(actions.setTheme(localTheme));
    }
    if (!!localLanguage && localLanguage != lang) {
      dispatch(actions.setLanguage(localLanguage));
    }

    setTimeout(() => {
      classServices.classRemove("tag", "body", "preload");
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
    dispatch(
      actions.setTicketList(JSON.parse(sessionStorage.getItem("ticketList")))
    );

    setTimeout(() => {
      classServices.classRemove("class", "navbar", "preload");
    }, 100);
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
      <Route path="about" element={<About />} />
      <Route path="staff" element={<Staff />} />
      <Route path="login" element={<Login />} />
      <Route path="login/:staff" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="register/:staff" element={<Register />} />
      <Route path="forgot" element={<Forgot />} />
      <Route path="forgot/:id" element={<ChangePassword />} />
      <Route path="profile" element={<Profile />} />
      <Route path="profile/:id" element={<DisplayTicket />} />
      {/* <Route path="profile/:id/" element={<EditTicket />} /> */}
      <Route path="profile/:id/refund" element={<Refund />} />
      <Route path="booking" element={<Booking />} />
      <Route path="booking/:step" element={<Booking />} />
    </Routes>
  );
};

export default Router;
