import axios from "axios";

const search = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/staff/search`;

  const res = await axios.post(url, {
    trainNumber: info.trainNumber,
    date: info.date,
    class: info.class,
  });

  sessionStorage.setItem("staffRes", JSON.stringify(res.data));
  if (res.data && res.data.length === 0) return 200;
  else return 204;
};

export default search;
