import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./style.scss";
import {
  FaWalking,
  FaRegDotCircle,
  FaMapMarkerAlt,
  FaRegClock,
  FaRedo,
} from "react-icons/fa";
import actions from "../../services/actions";
import BookingButtons from "../bookingBtns";
import bookingService from "../../services/utils/booking";

const TrainsDisplay = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, _] = useSearchParams({});
  const lang = useSelector((state) => state.lang);
  const trainList = useSelector((state) => state.trains);
  const stations = require("../../assets/jsons/booking/station.json");
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [choice, setChoice] = useState(0);

  useEffect(() => {
    dispatch(
      actions.setTrainList(JSON.parse(sessionStorage.getItem("trainList")))
    );
  }, []);

  const showStation = (OD) => {
    var res = "";
    try {
      if (OD == "o") {
        if (lang === "th") res = searchParams.get("from");
        else {
          for (const i of stations)
            if (searchParams.get("from") === i["th"]) res = i["en"];
        }
      } else {
        if (lang === "th") res = searchParams.get("to");
        else {
          for (const i of stations)
            if (searchParams.get("to") === i["th"]) res = i["en"];
        }
      }
    } catch {}
    return res;
  };

  const handleOnNext = (e) => {
    e.preventDefault();
    navigate({
      pathname: "/booking/2",
      search:
        searchParams.toString() +
        ".000&" +
        createSearchParams({
          c:
            (trainList[choice - 1].seatRemain.class1 > 0 ? "1" : "0") +
            (trainList[choice - 1].seatRemain.class2 > 0 ? "1" : "0") +
            (trainList[choice - 1].seatRemain.class3 > 0 ? "1" : "0"),
          idt: trainList[choice - 1].train_id,
          p: trainList[choice - 1].ticketPrice,
        }).toString(),
    });
  };

  const handleOnReload = async (e) => {
    e.preventDefault();
    if (
      !searchParams.get("from") &&
      !searchParams.get("to") &&
      !searchParams.get("date") &&
      !searchParams.get("time") &&
      // !searchParams.get("date-return") &&
      // !searchParams.get("time-return") &&
      !searchParams.get("pax")
    ) {
      navigate("/booking");
    } else {
      dispatch(actions.setLoading(true));
      const res = await bookingService.findTrains({
        from: searchParams.get("from"),
        to: searchParams.get("to"),
        date: searchParams.get("date"),
        time: searchParams.get("time"),
        pax: searchParams.get("pax"),
        // returnDate: searchParams.get("date-return") ,
        // returnTime: searchParams.get("time-return") ,
      });
      if (res === 200) {
        navigate({
          pathname: "",
          search: searchParams.toString(),
        });
      } else {
        sessionStorage.setItem("routeError", 1);
        navigate("/booking");
      }
    }
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
              {new Date(searchParams.get("date")).toLocaleString(lang, {
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
            <span>{searchParams.get("pax")}</span>
          </div>
        </div>
        {trainList && trainList.length !== 0 ? (
          <div className="train-display__card__container">
            {trainList.map((info, index) => (
              <>
                <input
                  type="radio"
                  value={index + 1}
                  checked={choice == index + 1}
                  onChange={({ currentTarget: input }) =>
                    setChoice(input.value)
                  }
                  id={index + 1}
                  name="train"
                />
                <label htmlFor={index + 1} className="train-display__card">
                  <div className="train-display__card__info">
                    <div className="train-display__card__info__first-row">
                      <span>
                        {info.departureTime}
                        &ensp;-&ensp;
                        {info.arrivalTime}
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
        ) : (
          <section>
            <FaRedo onClick={handleOnReload} />
            <span>{lang === "th" ? "ลองใหม่อีกครั้ง" : "Try again"}</span>
          </section>
        )}
        <BookingButtons
          onNext={handleOnNext}
          price={0}
          disabled={choice === 0 ? true : false}
          page={1}
          pastUrlParams={""}
        />
      </div>
    </div>
  );
};

export default TrainsDisplay;
