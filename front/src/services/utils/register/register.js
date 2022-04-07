import axios from "axios";

const register = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/register`;

  const body = {
    firstName: info.fname,
    lastName: info.lname,
    email: info.email,
    username: info.uname,
    password: info.pword,
    birthdate: info.bdate,
  };
  console.log(body);
  const res = await axios.post(url, body);
  console.log(res);
};

export default register;
