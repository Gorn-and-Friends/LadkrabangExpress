import axios from "axios";

const submitTicket = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/booking`;

  const res = await axios.post(url, {
    token: info.token,
    user_id: info.user_id,
    train_id: info.train_id,
    date: info.date,
    origin: info.origin,
    destination: info.destination,
    passenger: info.passenger,
    reservation_class: info.reservation_class,
    departureTime: info.departureTime,
    arrivalTime: info.arrivalTime,
    seat_reservation: info.seat_reservation,
  });

  //   sessionStorage.setItem("data", JSON.stringify(res.body.data));
};

export default submitTicket;
