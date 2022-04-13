import React from "react";
import ProgressBar from "../../../components/progressbar";
import NavBar from "../../../components/navbar";
import TrainsDisplay from "../../../components/trainsDisplay";

const Booking = () => {
  return (
    <>
      <NavBar />
      <ProgressBar />
      <TrainsDisplay data={localStorage.getItem("trains")} />
    </>
  );
};

export default Booking;
