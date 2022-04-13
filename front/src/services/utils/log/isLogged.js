const isLogged = () => {
  return JSON.parse(localStorage.getItem("data"));
};

export default isLogged;
