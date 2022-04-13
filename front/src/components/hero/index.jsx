import React from "react";
import "./style.scss";
import bg from "../../assets/images/hero.jpg";

const Hero = () => {
  return (
    <div className="hero">
      <img src={bg} alt="" />
    </div>
  );
};

export default Hero;
