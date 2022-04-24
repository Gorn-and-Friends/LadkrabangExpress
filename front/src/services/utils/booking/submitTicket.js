import axios from "axios";

const submitTicket = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/addTicket`;

  const res = await axios.post(url, {
    token: info.token,
    user_id: info.user_id,
    train_id: info.train_id,
    date: info.dt,
    origin: info.or,
    destination: info.des,
    passenger: info.pax,
    reservation_class: info.r_c,
    departureTime: info.d_t,
    arrivalTime: info.a_t,
    seat_reservation: {
      coach: info.s.coach && info.s.coach != "-" ? Number(info.s.coach) : 0,
      row: info.s.row && info.s.row != "-" ? Number(info.s.row) : 0,
      column:
        info.s.column && info.s.column != "-" ? Number(info.s.column) : "-",
    },
  });

  console.log(res.data);
};

export default submitTicket;
