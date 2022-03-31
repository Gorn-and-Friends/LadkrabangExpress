import axios from "axios";

const logIn = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/log`;

  const { data: token } = await axios.post(url, {
    username: info.uname,
    password: info.password,
  });

  console.log(token);
  localStorage.setItem("token", token.access);
};

export default logIn;
