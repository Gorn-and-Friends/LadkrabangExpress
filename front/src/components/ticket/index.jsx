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
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [showDetail, setShowDetail] = useState(false);
  const [displayTicket, setDisplayTicket] = useState({});

  useEffect(() => {
    try {
      setDisplayTicket(ticket);
    } catch {}
  }, [ticket]);

  return (
    <div className={`ticket ${showDetail ? "show" : "hide"}`}>
      <div className="ticket__container">
        <div className="ticket__info">
          <div className="ticket__info__first-row">
            <div className="ticket__info__3">
              <span>Origin</span>
              <h1>{displayTicket ? displayTicket.origin : ""}</h1>
            </div>
            <div className="ticket__info__3">
              <span>Destination</span>
              <h1>{displayTicket ? displayTicket.destination : ""}</h1>
            </div>
            <div className="ticket__info__3">
              <span>Date</span>
              <h1>{displayTicket ? displayTicket.date : ""}</h1>
            </div>
          </div>
          <div className="ticket__info__second-row">
            <div className="ticket__info__7">
              <span>Train</span>
              <h1>{displayTicket ? displayTicket.trainNumber : ""}</h1>
            </div>
            <div className="ticket__info__7">
              <span>Dep.</span>
              <h1>{displayTicket ? displayTicket.departureTime : ""}</h1>
            </div>
            <div className="ticket__info__7">
              <span>Arr.</span>
              <h1>{displayTicket ? displayTicket.arrivalTime : ""}</h1>
            </div>
            <div className="ticket__info__7">
              <span>Class</span>
              <h1>{displayTicket ? displayTicket.reservation_class : ""}</h1>
            </div>
            <div className="ticket__info__7">
              <span>Coach</span>
              <h1>
                {displayTicket && displayTicket.seat_reservation
                  ? displayTicket.seat_reservation.coach
                  : ""}
              </h1>
            </div>
            <div className="ticket__info__7">
              <span>Seat</span>
              <h1>
                {displayTicket && displayTicket.seat_reservation
                  ? displayTicket.seat_reservation.column +
                    displayTicket.seat_reservation.row
                  : ""}
              </h1>
            </div>
            <div className="ticket__info__7">
              <span>Price</span>
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
          &ensp;{displayTicket ? displayTicket.origin : ""}&ensp;
          <MdLocationOn />
          &ensp;{displayTicket ? displayTicket.destination : ""}&ensp;
        </h3>
        <ul>
          <li>
            <span>Train No. :</span>&ensp;
            {displayTicket ? displayTicket.trainNumber : ""}
          </li>
          <li>
            <span>Date :</span>&ensp;{displayTicket ? displayTicket.date : ""}
          </li>
          <li>
            <span>Departure time :</span>&ensp;
            {displayTicket ? displayTicket.departureTime : ""}
          </li>
          <li>
            <span>Arrival time :</span>&ensp;
            {displayTicket ? displayTicket.arrivalTime : ""}
          </li>
          <li>
            <span>Duration :</span>&ensp;
            {displayTicket ? displayTicket.duration : ""}
          </li>
          <li>
            <span>Class :</span>&ensp;
            {displayTicket ? displayTicket.reservation_class : ""}
          </li>
          <li>
            <span>Coach :</span>&ensp;
            {displayTicket && displayTicket.seat_reservation
              ? displayTicket.seat_reservation.coach
              : ""}
          </li>
          <li>
            <span>Seat :</span>&ensp;
            {displayTicket && displayTicket.seat_reservation
              ? displayTicket.seat_reservation.column +
                displayTicket.seat_reservation.row
              : ""}
          </li>
          {/* <li>+&ensp;Food&ensp;x1</li> */}
          <li>
            <span>Price :</span>&ensp;
            {displayTicket ? displayTicket.ticketPrice : ""}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Ticket;
