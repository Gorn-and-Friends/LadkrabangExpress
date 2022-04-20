import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import actions from "../../services/actions";
import BookingButtons from "../bookingBtn";
import SeatPicker from "../seatPicker";

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
  const [pax, setPax] = useState(0);
  const [seats, setSeats] = useState([]);
  const [trainId, setTrainId] = useState("");
  const [train, setTrain] = useState({});
  const [availClass, setAvailClass] = useState(111);
  const [selectedClass, setSelectedClass] = useState(0);
  const [ticket, setTicket] = useState([]);
  const [selectSeats, setSelectSeats] = useState(false);
  const [selected, setSelected] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setTrainId(params.get("idt") ? params.get("idt") : "");
    setPax(params.get("pax") ? params.get("pax") : 0);
    setAvailClass(params.get("c") ? params.get("c") : 111);
    setSelectedClass(params.get("cl") ? params.get("cl") : 0);
    dispatch(
      actions.setTrainList(JSON.parse(sessionStorage.getItem("trainList")))
    );
    dispatch(
      actions.setSeatList(JSON.parse(sessionStorage.getItem("seatList")))
    );
  }, [step]);

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
      const temp = [];
      const unselectTemp = [];
      for (let i = 0; i < pax; i++) {
        unselectTemp.push({
          coach: "-",
          column: "-",
          row: "",
        });
      }
      selectedSeats.map((s) => {
        temp.push({
          coach: s ? s.split("-")[0] : "-",
          column: s ? s.split("-")[1][0] : "-",
          row: s ? s.split("-")[1].slice(1) : "-",
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
        s: selectSeats ? temp : unselectTemp,
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
      `/booking?page=3&c=${availClass}&idt=${trainId}&pax=${params.get(
        "pax"
      )}&cl=${selectedClass}&choice=${selectSeats}`,
      { replace: true }
    );
    navigate(
      `/booking?page=4&c=${availClass}&idt=${trainId}&pax=${params.get(
        "pax"
      )}&cl=${selectedClass}&tkt=${JSON.stringify(ticket).replace(
        /[{}:",]/g,
        (i) => rplc[i]
      )}`
    );
  };

  return (
    <div className="seat-selector">
      <div className="seat-selector__container">
        <span className="seat-selector__btn">
          <label>
            <div>{"Select seats (+15฿)"}</div>
            <input
              type="checkbox"
              onClick={({ currentTarget: input }) => {
                setSelectSeats(input.checked);
              }}
            />
            <span />
          </label>
        </span>
        <SeatPicker
          seats={seats}
          amount={pax}
          setSeats={setSelectedSeats}
          setSelected={setSelected}
          disabled={!selectSeats}
        />
        <BookingButtons
          onNext={handleOnNext}
          disabled={!selected && selectSeats}
          step={step}
          pastUrlParams={`&c=${availClass}&idt=${trainId}&pax=${params.get(
            "pax"
          )}&p=${params.get("p")}&cl=${selectedClass}`}
        />
      </div>
    </div>
  );
};

export default SeatSelection;
