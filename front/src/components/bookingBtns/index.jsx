import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const BookingButtons = ({ onNext, price, disabled, page, pastUrlParams }) => {
  const lang = useSelector((state) => state.lang);
  const navigate = useNavigate();

  return (
    <div className="booking-btns">
      <button
        onClick={() =>
          navigate(
            `/booking${
              page > 1 ? "/" + (page - 1).toString() + "?" : ""
            }${pastUrlParams}`
          )
        }
      >
        {lang === "th" ? "กลับ" : "Back"}
      </button>
      {price > 0 ? (
        lang === "th" ? (
          <span>ราคารวม&ensp;🛈&ensp;&ensp;&ensp;&#3647;{price}</span>
        ) : (
          <span>Total&ensp;🛈&ensp;&ensp;&ensp;&#3647;{price}</span>
        )
      ) : null}
      <button onClick={onNext} disabled={disabled ? "disabled" : ""}>
        {lang === "th" ? "ต่อไป" : "Next"}
      </button>
    </div>
  );
};

export default BookingButtons;
