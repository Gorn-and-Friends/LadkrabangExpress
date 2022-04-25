import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./style.scss";
import NavBar from "../../components/navbar";
import icon from "../../assets/icons/icon.png";
import { FaRedo } from "react-icons/fa";

const Profile = () => {
  const lang = useSelector((state) => state.lang);
  const stations = require("../../assets/jsons/booking/station.json");
  const profileContent =
    lang === "th"
      ? require("../../assets/jsons/profile/th.json")
      : require("../../assets/jsons/profile/en.json");
  const ticketContent =
    lang === "th"
      ? require("../../assets/jsons/ticket/th.json")
      : require("../../assets/jsons/ticket/en.json");
  const [displayTickets, setDisplayTickets] = useState([]);
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    try {
      setDisplayTickets(JSON.parse(sessionStorage.getItem("ticketList")));
    } catch {}
  }, []);

  useEffect(() => {
    console.log(displayTickets);
  }, [displayTickets]);

  const showStation = (data) => {
    let res = "";
    try {
      if (lang === "th") res = data;
      else {
        for (const i of stations) if (data === i["th"]) res = i["en"];
      }
    } catch {}
    return res;
  };

  const handleOnSaveProfile = async (e) => {
    e.preventDefault();
    setEdit(false);
  };

  return (
    <div className="profile">
      <NavBar />
      <div className="profile__container">
        <h1 className="profile__header">{profileContent.header}</h1>
        <div className="profile__content">
          <div className="profile__info">
            <fieldset>
              <legend align="center">{profileContent.info.header}</legend>
              <form onSubmit={handleOnSaveProfile}>
                {edit ? null : (
                  <button onClick={() => setEdit(true)}>
                    {profileContent.info.edit}
                  </button>
                )}
                <div className="profile__info__100">
                  <input
                    type="text"
                    id="fname"
                    // value={}
                    // onChange={}
                    autoComplete="off"
                    placeholder={edit ? "Chanon" : " "}
                    disabled={edit ? "" : "disabled"}
                  />
                  <label htmlFor="fname">{profileContent.info.fname}</label>
                  {edit ? null : <div>Chanon</div>}
                </div>
                <div className="profile__info__100">
                  <input
                    type="text"
                    id="lname"
                    // value={}
                    // onChange={}
                    autoComplete="off"
                    placeholder={edit ? "Gulgattimas" : " "}
                    disabled={edit ? "" : "disabled"}
                  />
                  <label htmlFor="lname">{profileContent.info.lname}</label>
                  {edit ? null : <div>Gulgattimas</div>}
                </div>
                <div className="profile__info__100">
                  <input
                    type="text"
                    id="uname"
                    // value={}
                    // onChange={}
                    autoComplete="off"
                    placeholder={edit ? "gchax" : " "}
                    disabled={edit ? "" : "disabled"}
                  />
                  <label htmlFor="uname">{profileContent.info.uname}</label>
                  {edit ? null : <div>gchax</div>}
                </div>
                <div className="profile__info__100">
                  <input
                    type="email"
                    id="email"
                    // value={}
                    // onChange={}
                    autoComplete="off"
                    placeholder={edit ? "gchax@outlook.com" : " "}
                    disabled={edit ? "" : "disabled"}
                  />
                  <label htmlFor="email">{profileContent.info.email}</label>
                  {edit ? null : <div>gchax@outlook.asdasdcom</div>}
                </div>
                {edit ? (
                  <div className="profile__info__btns">
                    <button onClick={() => setEdit(false)}>
                      {profileContent.info.cancel}
                    </button>
                    <Link to="/auth/reset-password">
                      {profileContent.info.changePword}
                    </Link>
                    <input type="submit" value={profileContent.info.save} />
                  </div>
                ) : null}
              </form>
            </fieldset>
          </div>
          <fieldset className="profile__booking">
            <legend className="profile__booking__header">
              {profileContent.booking.header}
            </legend>
            <div className="profile__booking__content">
              <div className="profile__booking__content__inner">
                {displayTickets ? (
                  displayTickets.length !== 0 ? (
                    displayTickets.map((ticket) => (
                      <Link to={`${ticket._id}`}>
                        <div className="profile__booking__ticket">
                          <div className="profile__booking__ticket__container">
                            <div className="profile__booking__ticket__info">
                              <div className="profile__booking__ticket__info__first-row">
                                <div className="profile__booking__ticket__info__3">
                                  <span>{ticketContent.origin}</span>
                                  <h1>{showStation(ticket.origin)}</h1>
                                </div>
                                <div className="profile__booking__ticket__info__3">
                                  <span>{ticketContent.destination}</span>
                                  <h1>{showStation(ticket.destination)}</h1>
                                </div>
                                <div className="profile__booking__ticket__info__3">
                                  <span>{ticketContent.date}</span>
                                  <h1>
                                    {new Date(ticket.date).getDate() +
                                      new Date(ticket.date)
                                        .toLocaleString("default", {
                                          month: "short",
                                        })
                                        .toUpperCase() +
                                      new Date(ticket.date)
                                        .getFullYear()
                                        .toString()
                                        .slice(2)}
                                  </h1>
                                </div>
                              </div>
                              <div className="profile__booking__ticket__info__second-row">
                                <div className="profile__booking__ticket__info__5">
                                  <span>{ticketContent.trainNo}</span>
                                  <h1>{ticket.train_number}</h1>
                                </div>
                                <div className="profile__booking__ticket__info__5">
                                  <span>{ticketContent.depTime.shortened}</span>
                                  <h1>
                                    {ticket.departureTime
                                      ? (ticket.departureTime.split(":")[0] < 10
                                          ? "0" +
                                            ticket.departureTime.split(":")[0]
                                          : ticket.departureTime.split(
                                              ":"
                                            )[0]) +
                                        ":" +
                                        (ticket.departureTime.split(":")[1] < 10
                                          ? "0" +
                                            ticket.departureTime.split(":")[1]
                                          : ticket.departureTime.split(":")[1])
                                      : ""}
                                  </h1>
                                </div>
                                <div className="profile__booking__ticket__info__5">
                                  <span>{ticketContent.arrTime.shortened}</span>
                                  <h1>
                                    {ticket.arrivalTime
                                      ? (ticket.arrivalTime.split(":")[0] < 10
                                          ? "0" +
                                            ticket.arrivalTime.split(":")[0]
                                          : ticket.arrivalTime.split(":")[0]) +
                                        ":" +
                                        (ticket.arrivalTime.split(":")[1] < 10
                                          ? "0" +
                                            ticket.arrivalTime.split(":")[1]
                                          : ticket.arrivalTime.split(":")[1])
                                      : ""}
                                  </h1>
                                </div>
                                <div className="profile__booking__ticket__info__5">
                                  <span>{ticketContent.class}</span>
                                  <h1>{ticket.reservation_class}</h1>
                                </div>
                                <div className="profile__booking__ticket__info__5">
                                  <span>{ticketContent.passenger}</span>
                                  <h1>{ticket.passenger}</h1>
                                </div>
                              </div>
                            </div>
                            <div className="profile__booking__ticket__ticket-touch">
                              <div className="profile__booking__ticket__ticket-touch__top" />
                              <div className="profile__booking__ticket__ticket-touch__middle" />
                              <div className="profile__booking__ticket__ticket-touch__bottom" />
                            </div>
                            <div className="profile__booking__ticket__logo">
                              <img src={icon} alt="" />
                              <Link to={`${ticket._id}/edit`}>Edit</Link>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div>You haven't reserved any tickets yet</div>
                  )
                ) : (
                  <section>
                    <FaRedo />
                    <span>
                      {lang === "th" ? "ลองใหม่อีกครั้ง" : "Try again"}
                    </span>
                  </section>
                )}
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    </div>
  );
};

export default Profile;
