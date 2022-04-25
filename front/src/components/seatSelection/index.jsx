import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSearchParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import "./style.scss";
import actions from "../../services/actions";
import BookingButtons from "../bookingBtns";
import SeatPicker from "../seatPicker";
import { FaRedo } from "react-icons/fa";
import bookingService from "../../services/utils/booking";

const SeatSelection = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang);
  const trainList = useSelector((state) => state.trains);
  const seatList = useSelector((state) => state.seats);
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [searchParams, _] = useSearchParams({});
  const [pax, setPax] = useState(-1);
  const [seats, setSeats] = useState([]);
  const [trainId, setTrainId] = useState("");
  const [train, setTrain] = useState({});
  const [selectedClass, setSelectedClass] = useState(0);
  const [ticket, setTicket] = useState([]);
  const [wantSelectSeat, setWantSelectSeat] = useState(false);
  const [seatSelected, setSeatSelected] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);

  useEffect(() => {
    setTrainId(searchParams.get("idt") ? searchParams.get("idt") : "");
    setPax(
      Number(searchParams.get("pax")) ? Number(searchParams.get("pax")) : 0
    );
    setSelectedClass(searchParams.get("cl") ? searchParams.get("cl") : 0);
    dispatch(
      actions.setTrainList(JSON.parse(sessionStorage.getItem("trainList")))
    );
    dispatch(
      actions.setSeatList(JSON.parse(sessionStorage.getItem("seatList")))
    );
  }, []);

  useEffect(() => {
    var temp = [];
    try {
      if (
        JSON.parse(sessionStorage.getItem("seatList")) &&
        JSON.parse(sessionStorage.getItem("seatList")).length > 0
      )
        JSON.parse(sessionStorage.getItem("seatList")).map((data) => {
          temp.push({
            coach: data.coach,
            seat: data.seat,
          });
        });
      setSeats(temp);
    } catch {}
  }, []);

  useEffect(() => {
    setTrain(
      trainList ? trainList.filter((obj) => obj.train_id == trainId)[0] : {}
    );
  }, [trainList]);

  useEffect(() => {
    try {
      const unselectTemp = [];
      for (let i = 0; i < pax; i++) {
        unselectTemp.push({
          coach: 0,
          column: "-",
          row: 0,
        });
      }
      const temp = [];
      selectedSeats.map((seat) => {
        temp.push({
          coach:
            seat.split("—")[0][seat.split("—")[0].length - 1] !== "x"
              ? seat.split("—")[0][seat.split("—")[0].length - 1]
              : 0,
          column: seat.split("—")[1][0] !== "x" ? seat.split("—")[1][0] : "-",
          row:
            seat.split("—")[1][1] !== "x" ? seat.split("—")[1].slice(1) : 0,
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
    console.log(ticket);
    navigate({
      pathname: "/booking/4",
      search:
        searchParams.toString() +
        ">&" +
        createSearchParams({ tkt: JSON.stringify(ticket) }).toString(),
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
      var trainRes = await bookingService.findTrains({
        from: searchParams.get("from"),
        to: searchParams.get("to"),
        date: searchParams.get("date"),
        time: searchParams.get("time"),
        pax: searchParams.get("pax"),
        // returnDate: searchParams.get("date-return") ,
        // returnTime: searchParams.get("time-return") ,
      });
    }
    if (!searchParams.get("idt") && !searchParams.get("date")) {
      navigate("/booking");
    } else {
      dispatch(actions.setLoading(true));
      const seatRes = await bookingService.findSeats({
        trainId: searchParams.get("idt"),
        date: searchParams.get("date"),
      });
      if (seatRes === 200 && trainRes === 200) {
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
    <div className="seat-selector">
      <div className="seat-selector__container">
        {seats && seats.length > 0 ? (
          <>
            <div className="seat-selector__btn">
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
            </div>
            <SeatPicker
              seats={seats}
              amount={pax}
              setFinalSeats={setSelectedSeats}
              setSeatSelected={setSeatSelected}
              disabled={!wantSelectSeat}
            />
          </>
        ) : (
          <section>
            <FaRedo onClick={handleOnReload} />
            <span>{lang === "th" ? "ลองใหม่อีกครั้ง" : "Try again"}</span>
          </section>
        )}
        <BookingButtons
          onNext={handleOnNext}
          price={
            Number(searchParams.get("p")) * Number(searchParams.get("pax")) +
            selectedSeats.filter((f) => f != "Cx—xx").length * 10
          }
          disabled={wantSelectSeat ? (seatSelected ? false : true) : false}
          page={3}
          pastUrlParams={searchParams.toString().split(".00000")[0]}
        />
      </div>
    </div>
  );
};

export default SeatSelection;
