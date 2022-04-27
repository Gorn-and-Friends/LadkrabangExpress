import axios from "axios";

const forgot = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/`;

  const res = await axios.post(url, {
    email: info,
  });

  console.log(res.data);
  return res.data;
};

export default forgot;