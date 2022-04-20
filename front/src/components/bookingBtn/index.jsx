import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const BookingButtons = ({ onNext, disabled, step, pastUrlParams }) => {
  const lang = useSelector((state) => state.lang);
  const navigate = useNavigate();

  return (
    <div className="booking-btns">
      <button
        onClick={() => navigate(`/booking?page=${step - 1}${pastUrlParams}`)}
      >
        {lang === "th" ? "กลับ" : "Back"}
      </button>
      <button onClick={onNext} disabled={disabled ? "disabled" : ""}>
        {lang === "th" ? "ต่อไป" : "Next"}
      </button>
    </div>
  );
};

export default BookingButtons;
