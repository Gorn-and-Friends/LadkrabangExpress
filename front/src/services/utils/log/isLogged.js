const isLogged = () => {
  return localStorage.getItem("token");
};

export default isLogged;
