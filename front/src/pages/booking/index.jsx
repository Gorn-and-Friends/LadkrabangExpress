import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/navbar";
import Form from "../../components/bookingForm";
import ProgressBar from "../../components/progressbar";
import TrainsDisplay from "../../components/trainsDisplay";
import ClassSelection from "../../components/classSelection";
import SeatSelection from "../../components/seatSelection";
import FoodCatalog from "../../components/foodCatalog";
import Checkout from "../../components/checkout";

const Booking = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setStep(Number(params.get("page")));
  });

  return (
    <>
      <NavBar />
      {step > 0 ? <ProgressBar step={step} /> : null}
      {step === 0 ? <Form /> : null}
      {step === 1 ? <TrainsDisplay step={step} /> : null}
      {step === 2 ? <ClassSelection step={step} /> : null}
      {step === 3 ? <SeatSelection step={step} /> : null}
      {/* {step === 4 ? <FoodCatalog step={step} /> : null} */}
      {step === 4 ? <Checkout step={step} /> : null}
    </>
  );
};

export default Booking;
