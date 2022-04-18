import axios from "axios";

const findTrains = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/booking`;

  const res = await axios.post(url, {
    origin: info.from,
    destination: info.to,
    date: info.date,
    time: info.time,
    passenger: info.pax,
    dateReturn: info.returnDate,
    timeReturn: info.returnTime,
  });


  sessionStorage.setItem("trainList", JSON.stringify(res.data));

  // sessionStorage.setItem(
  //   "trainList",
  //   JSON.stringify([
  //     {
  //       train_id: "123123123123123",
  //       trainNumber: "997",
  //       origin: "กรุงเทพ",
  //       destination: "ชลบุรี",
  //       departureTime: "6:45",
  //       arrivalTime: "8:37",
  //       duration: "1:52",
  //       date: "2022-4-10",
  //       day: [6, 0],
  //       passenger: 2,
  //       seatRemain: {
  //         class1: 0,
  //         class2: 148,
  //         class3: 0,
  //       },
  //       ticketPrice: 170,
  //       totalPrice: 340,
  //     },
  //     {
  //       train_id: "sgsrty32466346",
  //       trainNumber: "0",
  //       origin: "กรุงเทพ",
  //       destination: "ชลบุรี",
  //       departureTime: "6:45",
  //       arrivalTime: "8:37",
  //       duration: "1:52",
  //       date: "2022-4-10",
  //       day: [6, 0],
  //       passenger: 2,
  //       seatRemain: {
  //         class1: 0,
  //         class2: 148,
  //         class3: 0,
  //       },
  //       ticketPrice: 170,
  //       totalPrice: 340,
  //     },
  //     {
  //       train_id: "asrtqe56yq351grs",
  //       trainNumber: "123",
  //       origin: "กรุงเทพ",
  //       destination: "ชลบุรี",
  //       departureTime: "6:45",
  //       arrivalTime: "8:37",
  //       duration: "1:52",
  //       date: "2022-4-10",
  //       day: [6, 0],
  //       passenger: 2,
  //       seatRemain: {
  //         class1: 0,
  //         class2: 148,
  //         class3: 0,
  //       },
  //       ticketPrice: 170,
  //       totalPrice: 340,
  //     },
  //     {
  //       train_id: "g1tytuje6uqeathet",
  //       trainNumber: "222",
  //       origin: "กรุงเทพ",
  //       destination: "ชลบุรี",
  //       departureTime: "6:45",
  //       arrivalTime: "8:37",
  //       duration: "1:52",
  //       date: "2022-4-10",
  //       day: [6, 0],
  //       passenger: 2,
  //       seatRemain: {
  //         class1: 0,
  //         class2: 148,
  //         class3: 0,
  //       },
  //       ticketPrice: 170,
  //       totalPrice: 340,
  //     },
  //   ])
  // );
};

export default findTrains;
