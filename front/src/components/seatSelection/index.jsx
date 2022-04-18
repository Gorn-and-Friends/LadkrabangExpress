import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import actions from "../../services/actions";
import BookingButtons from "../bookingBtn";

const SeatSelection = ({ step }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang);
  const trainList = useSelector((state) => state.trains);
  const seatList = useSelector((state) => state.seats);
  const params = new URLSearchParams(location.search);
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [choice, setChoice] = useState("");
  const [choice1, setChoice1] = useState("");
  const [choice2, setChoice2] = useState("");
  const [choice3, setChoice3] = useState("");
  const [choice4, setChoice4] = useState("");
  const [choice5, setChoice5] = useState("");
  const [choice6, setChoice6] = useState("");
  const [choice7, setChoice7] = useState("");
  const [choice8, setChoice8] = useState("");
  const [choice9, setChoice9] = useState("");
  const [trainId, setTrainId] = useState("");
  const [train, setTrain] = useState({});
  const [pax, setPax] = useState(0);
  const [availClass, setAvailClass] = useState(111);
  const [selectedClass, setSelectedClass] = useState(0);
  const [ticket, setTicket] = useState([]);

  useEffect(() => {
    setTrainId(params.get("idt") ? params.get("idt") : "");
    setPax(params.get("pax") ? params.get("pax") : 0);
    setAvailClass(params.get("c") ? params.get("c") : 111);
    setSelectedClass(params.get("cl") ? params.get("cl") : 0);
    setChoice(params.get("choice") ? params.get("choice") : "");
    dispatch(
      actions.setTrainList(JSON.parse(sessionStorage.getItem("trainList")))
    );
    dispatch(
      actions.setSeatList(JSON.parse(sessionStorage.getItem("seatList")))
    );
  }, [step]);

  useEffect(() => {
    setTrain(
      trainList ? trainList.filter((obj) => obj.train_id == trainId)[0] : {}
    );
  }, [trainId]);

  useEffect(() => {
    try {
      setTicket({
        t_id: trainId,
        t_n: train.trainNumber,
        dt: train.date,
        or: train.origin,
        des: train.destination,
        pax: train.passenger,
        r_c: selectedClass,
        d_t: train.departureTime,
        a_t: train.arrivalTime,
        d: train.duration,
        p: train.ticketPrice,
        s: [
          {
            coach: choice ? choice.split("-")[0] : "",
            column: choice ? choice.split("-")[1] : "",
            row: choice ? choice.split("-")[2] : "",
          },
          choice1
            ? {
                coach: choice1.split("-")[0],
                column: choice1.split("-")[1],
                row: choice1.split("-")[2],
              }
            : "",
        ],
      });
    } catch {}
  }, [
    train,
    choice,
    choice1,
    choice2,
    choice3,
    choice4,
    choice5,
    choice6,
    choice7,
    choice8,
    choice9,
  ]);

  const handleOnClick = (e) => {};

  const handleOnNext = (e) => {
    e.preventDefault();
    let rplc = {
      "{": "%7B",
      "}": "%7D",
      ":": "%3A",
      '"': "%22",
      ",": "%2C",
    };
    navigate(
      `/booking?page=3&c=${availClass}&idt=${trainId}&pax=${pax}&cl=${selectedClass}&choice=${choice}`
    );
    navigate(
      `/booking?page=4&c=${availClass}&idt=${trainId}&pax=${pax}&cl=${selectedClass}&tkt=${JSON.stringify(
        ticket
      ).replace(/[{}:",]/g, (i) => rplc[i])}`
    );
  };

  return (
    <div className="seat-selector">
      Selected Class : &ensp;
      {selectedClass}
      <br />
      Select seat{`(`}s{`)`} : &ensp;
      <br />
      <input
        type="text"
        value={choice}
        onChange={(e) => setChoice(e.target.value)}
      />
      <br />
      <input
        type="text"
        value={choice1}
        onChange={(e) => setChoice1(e.target.value)}
      />
      <br />
      <BookingButtons
        onNext={handleOnNext}
        disable={choice === "" ? false : true}
        step={step}
        pastUrlParams={`&c=${availClass}&idt=${trainId}&pax=${pax}&cl=${selectedClass}`}
      />
    </div>
  );
};

export default SeatSelection;
