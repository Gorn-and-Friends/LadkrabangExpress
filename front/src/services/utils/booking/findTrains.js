import axios from "axios";

const findTrains = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/booking/trains`;

  const res = await axios.post(url, {
    origin: info.from,
    destination: info.to,
    date: info.date,
    time: info.time,
    passenger: info.pax,
    dateReturn: info.dateRound,
    timeReturn: info.timeRound,
  });

  console.log(res.data);
  localStorage.setItem("trains", res.data);
};

export default findTrains;
