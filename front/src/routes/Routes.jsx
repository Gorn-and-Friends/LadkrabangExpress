import React from "react";
import { Routes, Route } from "react-router-dom";
import Forgot from "../pages/auth/forgot/Forgot";
import Login from "../pages/auth/login/Login";
import Register from "../pages/auth/register/Register";
import Home from "../pages/home/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot" element={<Forgot />} />
    </Routes>
  );
};

export default Router;
