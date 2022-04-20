import axios from "axios";

const logIn = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/login`;

  const res = await axios.post(url, {
    username: info.uname,
    password: info.pword,
  });

  localStorage.setItem("userId", res.data._id);
  localStorage.setItem("userName", {
    fname: res.data.firstname,
    lname: res.data.lastname,
  });
  localStorage.setItem("token", res.data.token);
};

export default logIn;
