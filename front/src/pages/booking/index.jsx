import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import NavBar from "../../components/navbar";
import Form from "../../components/bookingForm";
import ProgressBar from "../../components/progressbar";
import TrainsDisplay from "../../components/trainsDisplay";
import ClassSelection from "../../components/classSelection";
import SeatSelection from "../../components/seatSelection";
import FoodCatalog from "../../components/foodCatalog";
import Checkout from "../../components/checkout";
import Loading from "../../components/loading";

const Booking = () => {
  const location = useLocation();
  const loading = useSelector((state) => state.loading);
  const params = new URLSearchParams(location.search);
  const [step, setStep] = useState(0);
  const [reset, setReset] = useState(false);
  const [onFirst, setOnFirst] = useState(false);
  const [onSecond, setOnSecond] = useState(false);
  const [onThird, setOnThird] = useState(false);
  const [onFourth, setOnFourth] = useState(false);
  const [onFifth, setOnFifth] = useState(false);

  useEffect(() => {
    setStep(Number(params.get("page")));
    if (Number(params.get("page")) === 0) setReset(true);
    else if (Number(params.get("page")) === 1) setOnFirst(true);
    else if (Number(params.get("page")) === 2) setOnSecond(true);
    else if (Number(params.get("page")) === 3) setOnThird(true);
    else if (Number(params.get("page")) === 4) setOnFourth(true);
    else if (Number(params.get("page")) === 5) setOnFifth(true);
  });

  return (
    <>
      <NavBar />
      {step > 0 ? <ProgressBar step={step} /> : null}
      {loading ? (
        <Loading reduceHeight={22} />
      ) : (
        <>
          {step === 0 ? <Form reset={reset} /> : null}
          {step === 1 ? <TrainsDisplay step={step} onFirst={onFirst} /> : null}
          {step === 2 ? <ClassSelection step={step} onSecond={onSecond} /> : null}
          {step === 3 ? <SeatSelection step={step} onThird={onThird} /> : null}
          {/* {step === 4 ? <FoodCatalog step={step} onFourth={onFourth} /> : null} */}
          {step === 4 ? <Checkout step={step} onFourth={onFourth} /> : null}
        </>
      )}
    </>
  );
};

export default Booking;
