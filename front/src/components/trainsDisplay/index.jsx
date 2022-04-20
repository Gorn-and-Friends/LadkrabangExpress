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
  const stations = require("../../assets/jsons/booking/station.json");
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    setChoice(params.get("choice") ? params.get("choice") : 0);
    dispatch(
      actions.setTrainList(
        JSON.parse(sessionStorage.getItem("trainList"))
          ? JSON.parse(sessionStorage.getItem("trainList"))
          : []
      )
    );
  }, [step]);

  const showStation = (OD) => {
    var res = "";
    try {
      if (OD == "o") {
        if (lang === "th") res = trainList[0].origin;
        else {
          for (const i of stations)
            if (trainList[0].origin === i["th"]) res = i["en"];
        }
      } else {
        if (lang === "th") res = trainList[0].destination;
        else {
          for (const i of stations)
            if (trainList[0].destination === i["th"]) res = i["en"];
        }
      }
    } catch {}
    return res;
  };

  const handleOnNext = (e) => {
    e.preventDefault();
    try {
      navigate(`/booking?page=1&choice=${choice}`);
      navigate(
        `/booking?page=2&c=${
          trainList[choice - 1].seatRemain.class1 > 0 ? 1 : 0
        }${trainList[choice - 1].seatRemain.class2 > 0 ? 1 : 0}${
          trainList[choice - 1].seatRemain.class3 > 0 ? 1 : 0
        }&idt=${trainList[choice - 1].train_id}&pax=${
          trainList[0].passenger
        }&p=${trainList[0].ticketPrice}`
      );
    } catch {}
  };

  return (
    <div className="train-display">
      <div className="train-display__container">
        <div className="train-display__info">
          <div className="train-display__info__item">
            <FaRegDotCircle />
            &ensp;
            {showStation("o")}
            &ensp;
            <FaMapMarkerAlt />
            &ensp;
            {showStation("d")}
          </div>
          <div className="train-display__info__item">
            <FaRegClock />
            &ensp;{content.train.depTime}&ensp;
            <span>
              {new Date(trainList[0].date).toLocaleString(lang, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
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
                      {(info.departureTime.toString().split(":")[0] < 10
                        ? "0" + info.departureTime.toString().split(":")[0]
                        : info.departureTime.toString().split(":")[0]) +
                        ":" +
                        (info.departureTime.toString().split(":")[1] < 10
                          ? "0" + info.departureTime.toString().split(":")[1]
                          : info.departureTime.toString().split(":")[1])}
                      &ensp;-&ensp;
                      {(info.arrivalTime.toString().split(":")[0] < 10
                        ? "0" + info.arrivalTime.toString().split(":")[0]
                        : info.arrivalTime.toString().split(":")[0]) +
                        ":" +
                        (info.arrivalTime.toString().split(":")[1] < 10
                          ? "0" + info.arrivalTime.toString().split(":")[1]
                          : info.arrivalTime.toString().split(":")[1])}
                    </span>
                    <span>
                      {(info.duration.toString().split(":")[0] > 0
                        ? info.duration.toString().split(":")[0] +
                          (lang === "th" ? " ชั่วโมง " : " hours ")
                        : "") +
                        info.duration.toString().split(":")[1] +
                        (lang === "th" ? " นาที" : " minutes")}
                    </span>
                  </div>
                  <div className="train-display__card__info__second-row">
                    <span>
                      {content.train.trainNo}&ensp;:&ensp;
                      <span>{info.trainNumber}</span>
                    </span>
                    <span>
                      {content.train.seatsAvail}&ensp;:&ensp;
                      <span>
                        {"1st: " +
                          info.seatRemain.class1 +
                          ", 2nd: " +
                          info.seatRemain.class2 +
                          ", 3rd: " +
                          info.seatRemain.class3}
                      </span>
                    </span>
                  </div>
                </div>
                <div className="train-display__card__ticket-touch">
                  <div className="train-display__card__ticket-touch__top" />
                  <div className="train-display__card__ticket-touch__middle" />
                  <div className="train-display__card__ticket-touch__bottom" />
                </div>
                <div className="train-display__card__price">
                  <span>{content.train.price} &#3647;</span>
                  {info.ticketPrice}
                </div>
              </label>
            </>
          ))}
        </div>
        <BookingButtons
          onNext={handleOnNext}
          disabled={choice === 0 ? true : false}
          step={step}
          pastUrlParams={""}
        />
      </div>
    </div>
  );
};

export default TrainsDisplay;
