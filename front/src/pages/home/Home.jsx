import React from "react";
import Hero from "../../components/hero/Hero";
import NavBar from "../../components/navbar/client/Navbar";

export const darkMode = false;

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
    </>
  );
};

export default Home;
