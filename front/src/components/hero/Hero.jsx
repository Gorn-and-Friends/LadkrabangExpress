import React from "react";
import "./Hero.sass";
import bg from "../../assets/image/hero.jpg";

const Hero = () => {
  return (
    <div className="hero">
      <img src={bg} alt="" />
    </div>
  );
};

export default Hero;
