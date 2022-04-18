import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import {
  FaWalking,
  FaRegDotCircle,
  FaMapMarkerAlt,
  FaRegClock,
} from "react-icons/fa";  
import actions from "../../services/actions";
import BookingButtons from "../bookingBtn";
import { useLocation, useNavigate } from "react-router-dom";

const TrainsDisplay = ({ step }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = useSelector((state) => state.lang);
  const trainList = useSelector((state) => state.trains);
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    setChoice(params.get("choice") ? params.get("choice") : 0);
    dispatch(
      actions.setTrainList(JSON.parse(sessionStorage.getItem("trainList")))
    );
  }, [step]);

  const handleOnNext = (e) => {
    e.preventDefault();
    navigate(`/booking?page=1&choice=${choice}`);
    navigate(
      `/booking?page=2&c=${
        trainList[choice - 1].seatRemain.class1 > 0 ? 1 : 0
      }${trainList[choice - 1].seatRemain.class2 > 0 ? 1 : 0}${
        trainList[choice - 1].seatRemain.class3 > 0 ? 1 : 0
      }&idt=${trainList[choice - 1].train_id}&pax=${trainList[0].passenger}`
    );
  };

  return (
    <div className="train-display">
      <div className="train-display__container">
        <div className="train-display__info">
          <div className="train-display__info__item">
            <FaRegDotCircle />
            &ensp;
            {trainList[0].origin}
            &ensp;
            <FaMapMarkerAlt />
            &ensp;
            {trainList[0].destination}
          </div>
          <div className="train-display__info__item">
            <FaRegClock />
            &ensp; Departure on &ensp;
            <span>{trainList[0].date}</span>
          </div>
          <div className="train-display__info__item">
            <FaWalking />
            &ensp;
            {content.train.pax + " :"}
            &ensp;
            <span>{trainList[0].passenger}</span>
          </div>
        </div>
        <div className="train-display__card__container">
          {trainList.map((info, index) => (
            <>
              <input
                type="radio"
                value={index + 1}
                checked={choice == index + 1}
                onChange={({ currentTarget: input }) => setChoice(input.value)}
                id={index + 1}
                name="train"
              />
              <label htmlFor={index + 1} className="train-display__card">
                <div className="train-display__card__info">
                  <div className="train-display__card__info__first-row">
                    <span>
                      {info.departureTime} - {info.arrivalTime}
                    </span>
                    <span>{info.duration}</span>
                  </div>
                  <div className="train-display__card__info__second-row">
                    <span>
                      Train# : &ensp;<span>{info.trainNumber}</span>
                    </span>
                    <span>
                      Type : &ensp;<span>{info.type}</span>
                    </span>
                  </div>
                </div>
                <div className="train-display__card__ticket-touch">
                  <div className="train-display__card__ticket-touch__top" />
                  <div className="train-display__card__ticket-touch__middle" />
                  <div className="train-display__card__ticket-touch__bottom" />
                </div>
                <div className="train-display__card__price">
                  <span>from ฿</span>
                  {info.ticketPrice}
                </div>
              </label>
            </>
          ))}
        </div>
        <BookingButtons
          onNext={handleOnNext}
          disable={choice === 0 ? false : true}
          step={step}
          pastUrlParams={""}
        />
      </div>
    </div>
  );
};

export default TrainsDisplay;
