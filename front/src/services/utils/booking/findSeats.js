import axios from "axios";

const findSeats = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/makeSeatLayout`;

  const res = await axios.post(url, {
    trainID: info.trainId,
    date: info.date,
  });

  sessionStorage.setItem("seatList", JSON.stringify(res.data));
};

export default findSeats;
