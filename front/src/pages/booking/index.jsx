import React from "react";
import { useParams } from "react-router-dom";
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
  const loading = useSelector((state) => state.loading);
  const page = Number(useParams().page);

  return (
    <>
      <NavBar />
      {page ? <ProgressBar step={page} /> : null}
      {loading ? (
        <Loading reduceHeight={22} />
      ) : (
        <>
          {!page ? <Form /> : null}
          {page === 1 ? <TrainsDisplay step={page} /> : null}
          {page === 2 ? <ClassSelection /> : null}
          {page === 3 ? <SeatSelection /> : null}
          {/* {page === 4 ? <FoodCatalog  /> : null} */}
          {page === 4 ? <Checkout /> : null}
        </>
      )}
    </>
  );
};

export default Booking;
