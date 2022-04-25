import React from "react";
import { useSelector } from "react-redux";
import Hero from "../../components/hero";
import HomeForm from "../../components/homeForm";
import Loading from "../../components/loading";
import NavBar from "../../components/navbar";

const Home = () => {
  const loading = useSelector((state) => state.loading);

  return loading ? (
    <Loading reduceHeight={0} />
  ) : (
    <>
      <NavBar />
      <Hero />
      <HomeForm />
    </>
  );
};

export default Home;
