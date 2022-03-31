const isLogged = () => {
  try {
    const token = localStorage.getItem("token");
    return token;
  } catch (err) {
    return null;
  }
};

export default isLogged;
