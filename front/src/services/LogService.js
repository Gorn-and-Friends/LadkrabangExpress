import axios from "axios";

export const logIn = async (info) => {
  const port = 5000;
  const api = `http://localhost:${port}/api/log`;

  const { data: token } = await axios.post(api, {
    username: info.uname,
    password: info.password,
  });

  console.log(token);
  localStorage.setItem("token", token.access);
};

export const logOut = () => {
  localStorage.removeItem("token");
};

export const isLogged = () => {
  try {
    const token = localStorage.getItem("token");
    return token;
  } catch (err) {
    return null;
  }
};
