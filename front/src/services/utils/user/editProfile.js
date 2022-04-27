import axios from "axios";

const editProfile = async (info) => {
  const port = 5000;
  const url = `http://localhost:${port}/api/user/showUserProfile`;

  const res = await axios.post(url, {
    fname: info.fname,
  });

  sessionStorage.setItem("user", JSON.stringify(res.data));
};

export default editProfile;
