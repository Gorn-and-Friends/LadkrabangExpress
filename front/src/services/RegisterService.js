import axios from "axios";

export const registerUser = async (info) => {
  const port = 5000;
  const api = `http://localhost:${port}/api/register`;

  const body = {
    firstname: info.fname,
    lastname: info.lname,
    email: info.email,
    username: info.uname,
    password: info.pword,
    birthdate: info.bdate,
  };
  console.log(body);
  const res = await axios.post(api, body);
  console.log(res);
};
