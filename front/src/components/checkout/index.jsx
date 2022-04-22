import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.scss";
import visaMastercard from "../../assets/images/visa-mastercard.png";
import BookingButtons from "../bookingBtn";
import Ticket from "../ticket";
import logService from "../../services/utils/log";
import bookingService from "../../services/utils/booking";
import actions from "../../services/actions";

const Checkout = ({ step, onFourth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.lang);
  const params = new URLSearchParams(location.search);
  const content =
    lang === "th"
      ? require("../../assets/jsons/booking/th.json")
      : require("../../assets/jsons/booking/en.json");
  const [tickets, setTickets] = useState({});
  const [displayTickets, setDisplayTickets] = useState([]);
  const [err, setErr] = useState(true);
  const [totalPrice, setTotalPrice] = useState(-1);
  const [payment, setPayment] = useState({
    name: "",
    num: "",
    exp: "",
    cvc: "",
  });

  useEffect(() => {
    if (onFourth)
      setTickets(JSON.parse(params.get("tkt") ? params.get("tkt") : {}));
  }, [onFourth]);

  useEffect(() => {
    try {
      var common = {
        trainNumber: tickets.t_n,
        date: tickets.dt,
        origin: tickets.or,
        destination: tickets.des,
        passenger: tickets.pax,
        reservation_class: tickets.r_c,
        departureTime: tickets.d_t,
        arrivalTime: tickets.a_t,
        duration: tickets.d,
        ticketPrice: totalPrice > 0 ? totalPrice : tickets.p,
      };
      var seats = [...tickets.s];
      var newTickets = new Array();
      Array.from({ length: seats.length }, (_, i) => {
        newTickets[i] = {
          ...common,
          eaTicketPrice:
            seats[i].coach === "-" ? Number(tickets.p) : Number(tickets.p) + 10,
          seat_reservation: {
            coach: seats[i].coach,
            row: seats[i].row,
            column: seats[i].column,
          },
        };
      });
      setDisplayTickets(newTickets);
    } catch {}
  }, [tickets, totalPrice]);

  useEffect(() => {
    try {
      var sum = 0;
      displayTickets.map((dt) => {
        sum += Number(dt.eaTicketPrice);
      });
      setTotalPrice(sum);
    } catch {}
  }, [displayTickets]);

  useEffect(() => {
    if (
      payment.name !== "" &&
      payment.num !== "" &&
      payment.exp !== "" &&
      payment.cvc !== ""
    ) {
      setErr(false);
    } else setErr(true);
  }, [payment]);

  const handleInputOnChange = ({ currentTarget: input }) => {
    const temp = { ...payment };
    temp[input.id] = input.value;
    setPayment(temp);
  };

  const handleOnNext = async (e) => {
    e.preventDefault();
    if (logService.isLogged()) {
      const info = {
        ...tickets,
        token: localStorage.getItem("token"),
        user_id: localStorage.getItem("userId"),
        train_id: tickets.t_id,
      };
      console.log(info);
      try {
        navigate(
          `/booking?page=4&c=${params.get("c")}&idt=${params.get(
            "idt"
          )}&pax=${params.get("pax")}&cl=${params.get("cl")}&tkt=${params.get(
            "tkt"
          )}`
        );
        dispatch(actions.setLoading(true));
        await bookingService.submitTicket(info);
        navigate("/profile");
      } catch (er) {
        dispatch(actions.setLoading(false));
        console.log(er);
      }
    } else navigate("/login");
  };

  return (
    <div className="checkout">
      <div className="checkout__container">
        <div className="checkout__content">
          <div className="checkout__ticket">
            {displayTickets.map((ticket) => (
              <Ticket ticket={ticket} />
            ))}
          </div>
          <fieldset>
            <legend align="center">{content.checkout.header}</legend>
            <form className="checkout__payment">
              <img src={visaMastercard} alt="" />
              <div className="checkout__payment__100">
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={payment.name}
                  onChange={handleInputOnChange}
                  autoComplete="off"
                  placeholder=" "
                />
                <label htmlFor="name">
                  {content.checkout.name} <span>*</span>
                </label>
              </div>
              <div className="checkout__payment__100">
                <input
                  type="tel"
                  id="num"
                  name="num"
                  value={payment.num}
                  onChange={handleInputOnChange}
                  onKeyUp={({ currentTarget: input }) => {
                    var formatted = input.value.replace(/[^\d]/g, "");
                    formatted = formatted.substring(0, 16);
                    var section = formatted.match(/\d{1,4}/g);
                    if (section !== null) formatted = section.join(" ");
                    if (input.value !== formatted) input.value = formatted;
                  }}
                  maxLength="19"
                  autoComplete="off"
                  placeholder=" "
                />
                <label htmlFor="num">
                  {content.checkout.num} <span>*</span>
                </label>
              </div>
              <div className="checkout__payment__group">
                <div className="checkout__payment__50">
                  <input
                    type="text"
                    id="exp"
                    name="exp"
                    value={payment.exp}
                    onChange={handleInputOnChange}
                    onKeyUp={(e) => {
                      var code = e.keyCode;
                      var allowedKeys = [8];
                      if (allowedKeys.indexOf(code) !== -1) return;
                      e.target.value = e.target.value
                        .replace(/^([1-9]\/|[2-9])$/g, "0$1/")
                        .replace(/^(0[1-9]|1[0-2])$/g, "$1/")
                        .replace(/^([0-1])([3-9])$/g, "0$1/$2")
                        .replace(/^(0?[1-9]|1[0-2])([0-9]{2})$/g, "$1/$2")
                        .replace(/^([0]+)\/|[0]+$/g, "0")
                        .replace(/[^\d\/]|^[\/]*$/g, "")
                        .replace(/\/\//g, "/");
                    }}
                    maxLength="5"
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label htmlFor="exp">
                    {content.checkout.exp} <span>*</span>
                  </label>
                </div>
                <div className="checkout__payment__50">
                  <input
                    type="password"
                    id="cvc"
                    name="cvc"
                    value={payment.cvc}
                    onChange={handleInputOnChange}
                    maxLength="3"
                    autoComplete="off"
                    placeholder=" "
                  />
                  <label htmlFor="cvc">
                    {content.checkout.cvc} <span>*</span>
                  </label>
                </div>
              </div>
            </form>
          </fieldset>
        </div>
        <BookingButtons
          onNext={handleOnNext}
          price={totalPrice}
          disabled={err}
          step={step}
          pastUrlParams={`&c=${params.get("c")}&idt=${params.get(
            "idt"
          )}&pax=${params.get("pax")}&p=${params.get("p")}&cl=${params.get(
            "cl"
          )}`}
        />
      </div>
    </div>
  );
};

export default Checkout;
