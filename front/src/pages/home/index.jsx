import React, { useEffect } from "react";
import Hero from "../../components/hero";
import NavBar from "../../components/navbar";
import classService from "../../services/utils/class";

const Home = () => {
  useEffect(() => {
    classService.classToggle("class", "navbar", "scrollable");
  }, []);

  return (
    <>
      <NavBar />
      <Hero />
    </>
  );
};

export default Home;
