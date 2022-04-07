import axios from "axios";

const logIn = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/login`;

  const res = await axios.post(url, {
    username: info.uname,
    password: info.pword,
  });
  
  console.log(res);
  localStorage.setItem("token", res.data.token);
};

export default logIn;
