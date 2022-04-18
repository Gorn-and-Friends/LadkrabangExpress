import axios from "axios";

const findSeats = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/booking`;

  const res = await axios.post(url, {
    trainID: info.trainId,
    date: info.date
  });

  sessionStorage.setItem("seats", JSON.stringify(res.body.data));

  /*
  sessionStorage.setItem(
    "seatList",
    JSON.stringify([
      {
        class: 2,
        coach: 1,
        seat: [
          {
            row: 1,
            column: "A",
            isReserved: false,
          },
          {
            row: 1,
            column: "B",
            isReserved: false,
          },
          {
            row: 1,
            column: "C",
            isReserved: false,
          },
          {
            row: 1,
            column: "D",
            isReserved: false,
          },
          {
            row: 2,
            column: "A",
            isReserved: true,
          },
          {
            row: 2,
            column: "B",
            isReserved: true,
          },
        ],
      },
      {
        class: 2,
        coach: 2,
        seat: [
          {
            row: 1,
            column: "A",
            isReserved: false,
          },
          {
            row: 1,
            column: "B",
            isReserved: false,
          },
        ],
      },
    ])
  );*/
};

export default findSeats;
