import axios from "axios";

const logIn = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/login`;

  const res = await axios.post(url, {
    username: info.uname,
    password: info.pword,
  });

  localStorage.setItem("userId", JSON.stringify(res.body.data._id));
  localStorage.setItem("userName", [
    JSON.stringify(res.body.data.firstname),
    JSON.stringify(res.body.data.lastname),
  ]);
  localStorage.setItem("token", JSON.stringify(res.body.data.token));
};

export default logIn;
