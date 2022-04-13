import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./style.scss";

const BookingForm = () => {
  useEffect(() => {
    let min = new Date().toISOString().split("T")[0];
    let max = new Date();
    max.setDate(max.getDate() + 30);
    max = max.toISOString().split("T")[0];
    document.getElementById("date").setAttribute("min", min);
    document.getElementById("date").setAttribute("max", max);
    document.getElementById("returnDate").setAttribute("max", max);
  }, []);
  const lang = useSelector((state) => state.lang);
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [returned, setReturned] = useState(false);
  const [curDate, setCurDate] = useState({
    value: "",
    temp: "",
    onFocus: false,
  });
  const [curReturnDate, setCurReturnDate] = useState({
    value: "",
    temp: "",
    onFocus: false,
  });
  const [curTime, setCurTime] = useState({
    value: "",
    temp: "",
    onFocus: false,
  });
  const [curReturnTime, setCurReturnTime] = useState({
    value: "",
    temp: "",
    onFocus: false,
  });
  const [info, setInfo] = useState({
    from: "",
    to: "",
    date: curDate.value,
    time: curTime,
    pax: "",
    returnDate: curReturnDate.value,
    returnTime: curReturnTime,
  });

  useEffect(() => {
    if (curDate.value != "") {
      document.getElementById("returnDate").setAttribute("min", curDate.value);
    } else {
      document
        .getElementById("returnDate")
        .setAttribute("min", new Date().toISOString().split("T")[0]);
    }
  }, [curDate.value]);

  const handleInputOnChange = ({ currentTarget: input }) => {
    const temp = { ...info };
    if (input.id == "date") {
      setCurDate({ value: input.value });
    } else if (input.id == "returnDate") {
      setCurReturnDate({ value: input.value });
    } else if (input.id == "time") {
      setCurTime({ value: input.value });
    } else if (input.id == "returnTime") {
      setCurReturnTime({ value: input.value });
    }
    temp[input.id] = input.value;
    setInfo(temp);
    console.log(temp);
  };

  const handleDateOnFocus = ({ currentTarget: input }) => {
    input.type = "date";
    if (input.value != "") {
      let valArr = String(input.value).split("-");
      let val = valArr[1] + "/" + valArr[2] + "/" + valArr[0];
      input.value = val;
      if (input.id == "date") {
        setCurDate({ temp: val });
      } else if (input.id == "returnDate") {
        setCurReturnDate({ temp: val });
      }
    }
    if (input.id == "date") {
      setCurDate({ ...curDate, onFocus: true });
    } else if (input.id == "returnDate") {
      setCurReturnDate({ ...curReturnDate, onFocus: true });
    }
  };

  const handleTimeOnFocus = ({ currentTarget: input }) => {
    input.type = "time";
    if (input.value != "") {
      let valArr = String(input.value).split(":");
      let hour = 0;
      let AMPM = "AM";
      Number(valArr[0]) >= 12 ? (AMPM = "PM") : (AMPM = "AM");
      hour = Number(valArr[0]) % 12 || 12;
      hour = hour < 10 ? "0" + String(hour) : String(hour);
      let val = hour + ":" + valArr[1] + " " + AMPM;
      input.value = val;
      if (input.id == "time") {
        setCurTime({ temp: val });
      } else if (input.id == "returnTime") {
        setCurReturnTime({ temp: val });
      }
    }
    if (input.id == "time") {
      setCurTime({ ...curTime, onFocus: true });
    } else if (input.id == "returnTime") {
      setCurReturnTime({ ...curReturnTime, onFocus: true });
    }
  };

  const handleDateOnBlur = ({ currentTarget: input }) => {
    input.type = "text";
    if (input.value != "") {
      let valArr = String(input.value).split("-");
      let val = valArr[1] + "/" + valArr[2] + "/" + valArr[0];
      input.value = val;
      if (input.id == "date") {
        setCurDate({ value: val });
      } else if (input.id == "returnDate") {
        setCurReturnDate({ value: val });
      }
    }
    if (input.id == "date") {
      setCurDate({ ...curDate, onFocus: false });
    } else if (input.id == "returnDate") {
      setCurReturnDate({ ...curReturnDate, onFocus: false });
    }
  };

  const handleTimeOnBlur = ({ currentTarget: input }) => {
    input.type = "text";
    if (input.value != "") {
      let valArr = String(input.value).split(":");
      let hour = 0;
      let AMPM = "AM";
      Number(valArr[0]) >= 12 ? (AMPM = "PM") : (AMPM = "AM");
      hour = Number(valArr[0]) % 12 || 12;
      hour = hour < 10 ? "0" + String(hour) : String(hour);
      let val = hour + ":" + valArr[1] + " " + AMPM;
      input.value = val;
      if (input.id == "time") {
        setCurTime({ value: val });
      } else if (input.id == "returnTime") {
        setCurReturnTime({ value: val });
      }
    }
    if (input.id == "time") {
      setCurTime({ ...curTime, onFocus: false });
    } else if (input.id == "returnTime") {
      setCurReturnTime({ ...curReturnTime, onFocus: false });
    }
  };

  const handleOnSubmit = () => {};

  return (
    <form className="booking-form" onSubmit={handleOnSubmit}>
      <fieldset className="booking-form__container">
        <legend align="center">{content.form.header}</legend>
        <div className="booking-form__form">
          <div className="booking-form__form__first-row">
            <div className="booking-form__form__50">
              <input
                type="text"
                id="from"
                list="origin"
                value={info.from}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
              />
              <datalist id="origin">
                <option value="Hua Mak">หัวหมาก</option>
                <option value="Ladkrabang">ลาดกระบัง</option>
                <option value="c"></option>
              </datalist>
              <label htmlFor="from">{content.form.fields.origin}</label>
            </div>
            <div className="booking-form__form__50">
              <input
                type="text"
                id="to"
                value={info.to}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
              />
              <label htmlFor="to">{content.form.fields.destination}</label>
            </div>
          </div>
          <div className="booking-form__form__second-row">
            <div className="booking-form__form__second-row__group">
              <div className="booking-form__form__50">
                <input
                  type="text"
                  id="date"
                  value={curDate.onFocus ? curDate.value : curDate.temp}
                  onChange={handleInputOnChange}
                  onFocus={handleDateOnFocus}
                  onBlur={handleDateOnBlur}
                  min={new Date().toISOString().split("T")[0]}
                  placeholder=" "
                  autoComplete="off"
                />
                <label htmlFor="date">{content.form.fields.date}</label>
              </div>
              <div className="booking-form__form__50">
                <input
                  type="text"
                  id="time"
                  value={curTime.onFocus ? curTime.value : curTime.temp}
                  onChange={handleInputOnChange}
                  onFocus={handleTimeOnFocus}
                  onBlur={handleTimeOnBlur}
                  placeholder=" "
                  autoComplete="off"
                />
                <label htmlFor="time">{content.form.fields.time}</label>
              </div>
            </div>
            <div className="booking-form__form__second-row__group">
              <div className="booking-form__form__70">
                <input
                  type="number"
                  id="pax"
                  min="1"
                  max="20"
                  step="1"
                  value={info.pax}
                  onChange={handleInputOnChange}
                  placeholder=" "
                  autoComplete="off"
                />
                <label htmlFor="pax">{content.form.fields.passengers}</label>
              </div>
              <div className="booking-form__form__checkbox">
                <label>
                  <div>{content.form.buttons.round}</div>
                  <input
                    type="checkbox"
                    onClick={({ currentTarget: input }) => {
                      setCurReturnDate({ value: "" });
                      setCurReturnTime({ value: "" });
                      setReturned(input.checked);
                    }}
                  />
                  <span />
                </label>
              </div>
            </div>
          </div>
          <div className="booking-form__form__optional-row">
            <div className="booking-form__form__50">
              <input
                type="text"
                id="returnDate"
                value={
                  returned && curReturnDate.onFocus
                    ? curReturnDate.value
                    : returned && !curReturnDate.onFocus
                    ? curReturnDate.temp
                    : ""
                }
                onChange={handleInputOnChange}
                onFocus={handleDateOnFocus}
                onBlur={handleDateOnBlur}
                placeholder=" "
                autoComplete="off"
                disabled={returned ? "" : "disabled"}
              />
              <label htmlFor="returnDate">
                {content.form.fields.returnDate}
              </label>
            </div>
            <div className="booking-form__form__50">
              <input
                type="text"
                id="returnTime"
                value={
                  returned && curReturnTime.onFocus
                    ? curReturnTime.value
                    : returned && !curReturnTime.onFocus
                    ? curReturnTime.temp
                    : ""
                }
                onChange={handleInputOnChange}
                onFocus={handleTimeOnFocus}
                onBlur={handleTimeOnBlur}
                placeholder=" "
                autoComplete="off"
                disabled={returned ? "" : "disabled"}
              />
              <label htmlFor="returnTime">
                {content.form.fields.returnTime}
              </label>
            </div>
          </div>
        </div>
        <input
          type="submit"
          className="booking-form__btn"
          value={content.form.buttons.continue}
        />
      </fieldset>
    </form>
  );
};

export default BookingForm;
