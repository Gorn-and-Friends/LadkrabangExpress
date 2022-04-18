import React from "react";
import Hero from "../../components/hero";
import HomeForm from "../../components/homeForm";
import NavBar from "../../components/navbar";

const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <HomeForm />
    </>
  );
};

export default Home;
