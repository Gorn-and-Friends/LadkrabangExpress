import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../../services/RegisterService";
import "./Register.sass";

const Register = () => {
  document.title = "Sign up - LKBX";

  const navigate = useNavigate();
  const [register, setRegister] = useState({
    fname: "",
    lname: "",
    email: "",
    uname: "",
    pword: "",
    bdate: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await registerUser(register);
      setLoading(false);
      navigate("/login");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  const handleInputOnChange = ({ currentTarget: input }) => {
    const temp = { ...register };
    temp[input.id] = input.value;
    setRegister(temp);
    console.log(temp);
  };

  return (
    <div className="register">
      <fieldset className="register__container">
        <legend align="center">Create your account</legend>
        <form className="register__form" onSubmit={handleOnSubmit}>
          <div className="register__form__first-row">
            <div className={"register__form__name"}>
              <input
                type="text"
                id="fname"
                name="fname"
                value={register["fname"]}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="fname">
                Firstname <span>*</span>
              </label>
            </div>
            <div className={"register__form__name"}>
              <input
                type="text"
                id="lname"
                name="lname"
                value={register["lname"]}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="lname">
                Lastname <span>*</span>
              </label>
            </div>
          </div>
          <div className={"register__form__others"}>
            <input
              type="email"
              id="email"
              name="email"
              value={register["email"]}
              onChange={handleInputOnChange}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="email">
              E-mail <span>*</span>
            </label>
          </div>
          <div className={"register__form__others"}>
            <input
              type="text"
              id="uname"
              name="uname"
              value={register["uname"]}
              onChange={handleInputOnChange}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="uname">
              Username <span>*</span>
            </label>
          </div>
          <div className={"register__form__others"}>
            <input
              type="password"
              id="pword"
              name="pword"
              value={register["pword"]}
              onChange={handleInputOnChange}
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="pword">
              Password <span>*</span>
            </label>
          </div>
          <div className={"register__form__others"}>
            <input
              type="password"
              id="repwd"
              name="repwd"
              placeholder=" "
              autoComplete="off"
              required
            />
            <label htmlFor="repwd">
              Password <span>*</span>
            </label>
          </div>
          <div className="register__form__last-row">
            <a href="/login" className="register__form__last-row__back">
              Back
            </a>
            <div className={"register__form__date"}>
              <input
                type="text"
                id="bdate"
                name="bdate"
                value={register["bdate"]}
                onFocus={(e) => (e.target.type = "date")}
                onBlur={(e) => (e.target.type = "text")}
                onChange={handleInputOnChange}
                placeholder=" "
                autoComplete="off"
                required
              />
              <label htmlFor="bdate">
                Birthdate <span>*</span>
              </label>
            </div>
            <input
              type="submit"
              className="register__form__last-row__submit"
              value="Submit"
            />
          </div>
        </form>
      </fieldset>
    </div>
  );
};

export default Register;
