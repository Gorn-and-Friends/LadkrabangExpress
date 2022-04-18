import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import class1 from "../../assets/images/class1.jpg";
import class2 from "../../assets/images/class2.jpeg";
import class3 from "../../assets/images/class3.jpg";
import actions from "../../services/actions";
import bookingService from "../../services/utils/booking";
import BookingButtons from "../bookingBtn";

const ClassSelection = ({ step }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang);
  const trainList = useSelector((state) => state.trains);
  const params = new URLSearchParams(location.search);
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [choice, setChoice] = useState(0);
  const [availClasses, setAvailClasses] = useState({
    f: true,
    s: true,
    t: true,
  });

  useEffect(() => {
    setChoice(params.get("choice") ? params.get("choice") : 0);
    if (params.get("c")) {
      setAvailClasses({
        f: params.get("c")[0] == 1 ? true : false,
        s: params.get("c")[1] == 1 ? true : false,
        t: params.get("c")[2] == 1 ? true : false,
      });
    }
  }, [step]);

  const handleOnNext = async (e) => {
    e.preventDefault();
    try {
      navigate(
        `/booking?page=2&c=${params.get("c")}&idt=${params.get(
          "idt"
        )}&pax=${params.get("pax")}&choice=${choice}`
      );
      dispatch(actions.setLoading(true));
      await bookingService.findSeats({
        trainId: params.get("idt"),
        date: trainList[0].date,
      });
      navigate(
        `/booking?page=3&c=${params.get("c")}&idt=${params.get(
          "idt"
        )}&pax=${params.get("pax")}&cl=${choice}`
      );
    } catch (er) {
      dispatch(actions.setLoading(false));
      console.log(er);
    }
  };

  return (
    <div className="class-selector">
      <div className="class-selector__container">
        <div className="class-selector__card__container">
          <input
            type="radio"
            value="3"
            checked={choice == "3"}
            onChange={({ currentTarget: input }) => setChoice(input.value)}
            id="3"
            name="class"
            disabled={availClasses.t ? "" : "disabled"}
          />
          <label htmlFor="3" className="class-selector__card">
            <img src={class3} alt="" />
            <div className="class-selector__card__info">
              <h1>{content.class[2].header}</h1>
              <ul>
                <li>{content.class[2].list[0]}</li>
                <li>{content.class[2].list[1]}</li>
              </ul>
              <span>฿27</span>
            </div>
          </label>
          <input
            type="radio"
            value="2"
            checked={choice == "2"}
            onChange={({ currentTarget: input }) => setChoice(input.value)}
            id="2"
            name="class"
            disabled={availClasses.s ? "" : "disabled"}
          />
          <label htmlFor="2" className="class-selector__card">
            <img src={class2} alt="" />
            <div className="class-selector__card__info">
              <h1>{content.class[1].header}</h1>
              <ul>
                <li>{content.class[1].list[0]}</li>
                <li>{content.class[1].list[1]}</li>
              </ul>
              <span>฿50</span>
            </div>
          </label>
          <input
            type="radio"
            value="1"
            checked={choice == "1"}
            onChange={({ currentTarget: input }) => setChoice(input.value)}
            id="1"
            name="class"
            disabled={availClasses.f ? "" : "disabled"}
          />
          <label htmlFor="1" className="class-selector__card">
            <img src={class1} alt="" />
            <div className="class-selector__card__info">
              <h1>{content.class[0].header}</h1>
              <ul>
                <li>{content.class[0].list[0]}</li>
                <li>{content.class[0].list[1]}</li>
                <li>{content.class[0].list[2]}</li>
              </ul>
              <span>฿102</span>
            </div>
          </label>
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

export default ClassSelection;
