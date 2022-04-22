import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import actions from "../../services/actions";
import BookingButtons from "../bookingBtn";
import SeatPicker from "../seatPicker";

const SeatSelection = ({ step, onThird }) => {
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
  const [pax, setPax] = useState(-1);
  const [seats, setSeats] = useState([]);
  const [trainId, setTrainId] = useState("");
  const [train, setTrain] = useState({});
  const [availClass, setAvailClass] = useState(111);
  const [selectedClass, setSelectedClass] = useState(0);
  const [ticket, setTicket] = useState([]);
  const [wantSelectSeat, setWantSelectSeat] = useState(false);
  const [seatSelected, setSeatSelected] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    if (onThird) {
      setTrainId(params.get("idt") ? params.get("idt") : "");
      setPax(Number(params.get("pax")) ? Number(params.get("pax")) : 0);
      setAvailClass(params.get("c") ? params.get("c") : 111);
      setSelectedClass(params.get("cl") ? params.get("cl") : 0);
      dispatch(
        actions.setTrainList(JSON.parse(sessionStorage.getItem("trainList")))
      );
      dispatch(
        actions.setSeatList(JSON.parse(sessionStorage.getItem("seatList")))
      );
    }
  }, [onThird]);

  useEffect(() => {
    var temp = [];
    seatList.map((data) => {
      temp.push({
        coach: data.coach,
        seat: data.seat,
      });
    });
    setSeats(temp);
  }, [seatList]);

  useEffect(() => {
    setTrain(
      trainList ? trainList.filter((obj) => obj.train_id == trainId)[0] : {}
    );
  }, [trainId]);

  useEffect(() => {
    try {
      const unselectTemp = [];
      for (let i = 0; i < pax; i++) {
        unselectTemp.push({
          coach: "-",
          column: "-",
          row: "",
        });
      }
      const temp = [];
      selectedSeats.map((seat) => {
        temp.push({
          coach: seat.split("—")[0][seat.split("—")[0].length - 1],
          column: seat.split("—")[1][0],
          row: seat.split("—")[1][1] !== "x" ? seat.split("—")[1].slice(1) : "",
        });
      });
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
        s: wantSelectSeat ? temp : unselectTemp,
      });
    } catch {}
  }, [train, selectedSeats]);

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
      `/booking?page=4&c=${availClass}&idt=${trainId}&pax=${params.get(
        "pax"
      )}&p=${params.get("p")}&cl=${selectedClass}&tkt=${JSON.stringify(
        ticket
      ).replace(/[{}:",]/g, (i) => rplc[i])}`
    );
  };

  return (
    <div className="seat-selector">
      <div className="seat-selector__container">
        <span className="seat-selector__btn">
          <label>
            <div>{content.seat.wantSelectSeat}&ensp;🛈</div>
            <input
              type="checkbox"
              onClick={({ currentTarget: input }) => {
                setWantSelectSeat(input.checked);
              }}
            />
            <span />
          </label>
        </span>
        <SeatPicker
          seats={seats}
          amount={pax}
          setFinalSeats={setSelectedSeats}
          setSeatSelected={setSeatSelected}
          disabled={!wantSelectSeat}
        />
        <BookingButtons
          onNext={handleOnNext}
          price={
            Number(params.get("p")) * Number(params.get("pax")) +
            selectedSeats.filter((f) => f != "C-—-x").length * 10
          }
          disabled={wantSelectSeat ? (seatSelected ? false : true) : false}
          step={step}
          pastUrlParams={`&c=${availClass}&idt=${trainId}&pax=${params.get(
            "pax"
          )}&p=${params.get("p")}`}
        />
      </div>
    </div>
  );
};

export default SeatSelection;
