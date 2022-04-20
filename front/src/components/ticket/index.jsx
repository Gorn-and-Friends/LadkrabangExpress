import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";
import {
  MdMyLocation,
  MdLocationOn,
  MdExpandLess,
  MdExpandMore,
} from "react-icons/md";
import icon from "../../assets/icons/icon.png";

const Ticket = ({ ticket }) => {
  const lang = useSelector((state) => state.lang);
  const stations = require("../../assets/jsons/booking/station.json");
  const content =
    lang === "th"
      ? require("../../assets/jsons/ticket/th.json")
      : require("../../assets/jsons/ticket/en.json");
  const [showDetail, setShowDetail] = useState(false);
  const [displayDate, setDisplayDate] = useState({});
  const [displayTicket, setDisplayTicket] = useState({});
  const [displayDuration, setDisplayDuration] = useState("");
  const [displayOrigin, setDisplayOrigin] = useState("");
  const [displayDestination, setDisplayDestination] = useState("");
  const [displayDepTime, setDisplayDepTime] = useState("");
  const [displayArrTime, setDisplayArrTime] = useState("");

  useEffect(() => {
    try {
      setDisplayTicket(ticket);
    } catch {}
  }, [ticket]);

  useEffect(() => {
    setDisplayOrigin(displayTicket.origin);
    setDisplayDestination(displayTicket.destination);
    setDisplayDepTime(displayTicket.departureTime);
    setDisplayArrTime(displayTicket.arrivalTime);
    setDisplayDuration(displayTicket.duration);
  }, [displayTicket]);

  useEffect(() => {
    try {
      const showDate = new Date(displayTicket.date);
      setDisplayDate({
        shortened:
          showDate.getDate() +
          showDate
            .toLocaleString("default", { month: "short" })
            .toUpperCase() +
          showDate.getFullYear().toString().slice(2),
        full: showDate.toLocaleString(lang, {
          year: "numeric",
          month: "long",
          day: "numeric",
        }),
      });
    } catch {}
  }, [displayTicket, lang]);

  const showStation = (OD) => {
    var res = "";
    try {
      if (OD == "o") {
        if (lang === "th") res = displayOrigin;
        else {
          for (const i of stations)
            if (displayOrigin === i["th"]) res = i["en"];
        }
      } else {
        if (lang === "th") res = displayDestination;
        else {
          for (const i of stations)
            if (displayDestination === i["th"]) res = i["en"];
        }
      }
    } catch {}
    return res;
  };

  const showTime = (DA) => {
    var res = "";
    try {
      if (DA == "d") {
        res =
          (displayDepTime.split(":")[0] < 10
            ? "0" + displayDepTime.split(":")[0]
            : displayDepTime.split(":")[0]) +
          ":" +
          (displayDepTime.split(":")[1] < 10
            ? "0" + displayDepTime.split(":")[1]
            : displayDepTime.split(":")[1]);
      } else {
        res =
          (displayArrTime.split(":")[0] < 10
            ? "0" + displayArrTime.split(":")[0]
            : displayArrTime.split(":")[0]) +
          ":" +
          (displayArrTime.split(":")[1] < 10
            ? "0" + displayArrTime.split(":")[1]
            : displayArrTime.split(":")[1]);
      }
    } catch {}
    return res;
  };

  const showDuration = () => {
    var res = "";
    try {
      res = displayTicket
        ? (displayDuration.toString().split(":")[0] > 0
            ? displayDuration.toString().split(":")[0] +
              (lang === "th" ? " ชั่วโมง " : " hours ")
            : "") +
          displayDuration.toString().split(":")[1] +
          (lang === "th" ? " นาที" : " minutes")
        : "";
    } catch {}
    return res;
  };

  return (
    <div className={`ticket ${showDetail ? "show" : "hide"}`}>
      <div className="ticket__container">
        <div className="ticket__info">
          <div className="ticket__info__first-row">
            <div className="ticket__info__3">
              <span>{content.origin}</span>
              <h1>{showStation("o")}</h1>
            </div>
            <div className="ticket__info__3">
              <span>{content.destination}</span>
              <h1>{showStation("d")}</h1>
            </div>
            <div className="ticket__info__3">
              <span>{content.date}</span>
              <h1>{displayDate != {} ? displayDate.shortened : ""}</h1>
            </div>
          </div>
          <div className="ticket__info__second-row">
            <div className="ticket__info__7">
              <span>{content.trainNo}</span>
              <h1>{displayTicket ? displayTicket.trainNumber : ""}</h1>
            </div>
            <div className="ticket__info__7">
              <span>{content.depTime.shortened}</span>
              <h1>{showTime("d")}</h1>
            </div>
            <div className="ticket__info__7">
              <span>{content.arrTime.shortened}</span>
              <h1>{showTime("a")}</h1>
            </div>
            <div className="ticket__info__7">
              <span>{content.class}</span>
              <h1>{displayTicket ? displayTicket.reservation_class : ""}</h1>
            </div>
            <div className="ticket__info__7">
              <span>{content.coach}</span>
              <h1>
                {displayTicket && displayTicket.seat_reservation
                  ? displayTicket.seat_reservation.coach
                  : "-"}
              </h1>
            </div>
            <div className="ticket__info__7">
              <span>{content.seat}</span>
              <h1>
                {displayTicket && displayTicket.seat_reservation
                  ? displayTicket.seat_reservation.column +
                    displayTicket.seat_reservation.row
                  : "-"}
              </h1>
            </div>
            <div className="ticket__info__7">
              <span>{content.price}</span>
              <h1>{displayTicket ? displayTicket.ticketPrice : ""}</h1>
            </div>
          </div>
        </div>
        <div className="ticket__ticket-touch">
          <div className="ticket__ticket-touch__top" />
          <div className="ticket__ticket-touch__middle" />
          <div className="ticket__ticket-touch__bottom" />
        </div>
        <div className="ticket__logo">
          <img src={icon} alt="" />
          <button onClick={() => setShowDetail(!showDetail)}>
            {showDetail ? <MdExpandLess /> : <MdExpandMore />}
          </button>
        </div>
      </div>
      <div className="ticket__detail">
        <h3>
          <MdMyLocation />
          &ensp;{showStation("o")}&ensp;
          <MdLocationOn />
          &ensp;{showStation("d")}&ensp;
        </h3>
        <ul>
          <li>
            <span>{content.trainNo}&ensp;:</span>&ensp;
            {displayTicket ? displayTicket.trainNumber : ""}
          </li>
          <li>
            <span>{content.date}&ensp;:</span>&ensp;
            {displayDate != {} ? displayDate.full : ""}
          </li>
          <li>
            <span>{content.depTime.full}&ensp;:</span>&ensp;
            {showTime("d")}
          </li>
          <li>
            <span>{content.arrTime.full}&ensp;:</span>&ensp;
            {showTime("a")}
          </li>
          <li>
            <span>{content.duration}&ensp;:</span>&ensp;
            {showDuration()}
          </li>
          <li>
            <span>{content.class}&ensp;:</span>&ensp;
            {displayTicket ? displayTicket.reservation_class : ""}
          </li>
          <li>
            <span>{content.coach}&ensp;:</span>&ensp;
            {displayTicket && displayTicket.seat_reservation
              ? displayTicket.seat_reservation.coach
              : ""}
          </li>
          <li>
            <span>{content.seat}&ensp;:</span>&ensp;
            {displayTicket && displayTicket.seat_reservation
              ? displayTicket.seat_reservation.column +
                displayTicket.seat_reservation.row
              : ""}
          </li>
          {/* <li>+&ensp;Food&ensp;x1</li> */}
          <li>
            <span>{content.price}&ensp;:</span>&ensp;&#3647;
            {displayTicket ? displayTicket.ticketPrice : ""}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Ticket;
